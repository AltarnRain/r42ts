/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { BaseEnemy } from "../Base/BaseEnemy";
import BaseLevel from "../Base/BaseLevel";
import BulletRunner from "../BulletProviders/BulletRunner";
import CGAColors from "../Constants/CGAColors";
import orbSpawnLocations from "../Enemies/Orb/OrbEnemiesSpawnLocations";
import OrbEnemy from "../Enemies/Orb/OrbEnemy";
import orbEnemyAngleProvider from "../FireAngleProviders/OrbEnemyAngleProvider";
import { isEnemyBullet } from "../Guard";
import MoveDownAppearUp from "../LocationProviders/MoveDownAppearUp";
import BulletParticle from "../Particles/BulletParticle";
import CircleFrameProvider from "../Providers/CircleFrameProvider";
import getTwoPixelBullet from "../SharedFrames/twoPXBullet";
import { appState } from "../State/Store";

/**
 * Module:          Level03
 * Responsibility:  Define level 03
 */

export class Level03 extends BaseLevel {

    public start(): void {
        super.start();
        const enemies = orbSpawnLocations.map((startLocation) => {
            const frameProvider = new CircleFrameProvider(0);
            const locationProvider = new MoveDownAppearUp(80, 0.3, 90);
            return new OrbEnemy(startLocation.left, startLocation.top, 300, locationProvider, frameProvider, orbEnemyAngleProvider);
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
function orbFireCheck(enemy: BaseEnemy): boolean {
    const {
        enemyLevelState
    } = appState();

    let canFire = false;

    // Save cast. The typeguard ensures only BulletParticles are returned but TypeScript isn't
    // clever enough (yet) to understand this.
    const enemyBullets = enemyLevelState.particles.filter((p) => isEnemyBullet(p)) as BulletParticle[];

    if (enemyBullets.length === 0) {
        // No bullets, can always fire.
        return true;
    } else if (enemyBullets.length < 5) {
        if (enemyLevelState.enemies.length >= 5) {
            // if there's 5 enemies or more, an enemy is limited to a single bullet.
            canFire = enemyBullets.filter((p) => p.isOwner(enemy)).length === 0;
        } else if (enemyLevelState.enemies.length < 5) {
            // if there's 5 enemies or more, an enemy is limited to a single bullet.
            canFire = enemyBullets.filter((p) => p.isOwner(enemy)).length < Math.ceil(5 / enemyLevelState.enemies.length);
        } else {
            canFire = false;
        }
    } else {
        // Enemy shouldn't fire, so, we can return it.
        return false;
    }

    return canFire;
}
