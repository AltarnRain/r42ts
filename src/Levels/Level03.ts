/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { diagonalAtPlayerAngleProvider } from "../AngleProviders/DiagonalAtPlayerAngleProvider";
import getTwoPixelBullet from "../Assets/twoPXBullet";
import { BaseEnemy } from "../Base/BaseEnemy";
import BaseLevel from "../Base/BaseLevel";
import BulletRunner from "../BulletProviders/BulletRunner";
import CGAColors from "../Constants/CGAColors";
import orbSpawnLocations from "../Enemies/Orb/OrbEnemiesSpawnLocations";
import OrbEnemy from "../Enemies/Orb/OrbEnemy";
import { isEnemyBullet } from "../Guard";
import MoveDownAppearUp from "../LocationProviders/MoveDownAppearUp";
import BulletParticle from "../Particles/BulletParticle";
import CircleFrameProvider from "../Providers/CircleFrameProvider";
import EnemyLevelState from "../State/Definition/EnemyLevelState";

/**
 * Module:          Level03
 * Responsibility:  Define level 03
 */

export class Level03 extends BaseLevel {

    public start(): void {
        super.start();
        const enemies = orbSpawnLocations.map((startLocation) => {
            const frameProvider = new CircleFrameProvider(0);
            const locationProvider = new MoveDownAppearUp(80, 0, 90);
            return new OrbEnemy(startLocation.left, startLocation.top, 300, locationProvider, frameProvider, diagonalAtPlayerAngleProvider);
        });

        const bulletRunner = new BulletRunner(getTwoPixelBullet, CGAColors.magenta, 10, orbFireCheck);
        this.begin(enemies, 200, bulletRunner);
    }
}

/**
 * Defines the orb fire behaviour.
 * Orbs fire a salvo of 5 bullets, aimed at the player. They never fire until all their
 * bullets are offscreen.
 * @param {BaseEnemy} enemy.
 */
function orbFireCheck(enemy: BaseEnemy, levelState: EnemyLevelState): boolean {

    let canFire = false;

    // Save cast. The typeguard ensures only BulletParticles are returned but TypeScript isn't
    // clever enough (yet) to understand this.
    const enemyBullets = levelState.particles.filter((p) => isEnemyBullet(p)) as BulletParticle[];

    if (enemyBullets.length === 0) {
        // No bullets, can always fire.
        return true;
    } else if (enemyBullets.length < 5) {
        if (levelState.enemies.length >= 5) {
            // if there's 5 enemies or more, an enemy is limited to a single bullet.
            canFire = enemyBullets.filter((p) => p.isOwner(enemy)).length === 0;
        } else if (levelState.enemies.length < 5) {
            // if there's 5 enemies or more, an enemy is limited to a single bullet.
            canFire = enemyBullets.filter((p) => p.isOwner(enemy)).length < Math.ceil(5 / levelState.enemies.length);
        } else {
            canFire = false;
        }
    } else {
        // Enemy shouldn't fire, so, we can return it.
        return false;
    }

    return canFire;
}
