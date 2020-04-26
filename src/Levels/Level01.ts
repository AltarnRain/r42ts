/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import getTwoPixelBullet from "../Assets/twoPXBullet";
import { BaseEnemy } from "../Base/BaseEnemy";
import BaseLevel from "../Base/BaseLevel";
import BulletRunner from "../BulletProviders/BulletRunner";
import CGAColors from "../Constants/CGAColors";
import BirdEnemy from "../Enemies/Bird/BirdEnemy";
import getBirdFrames from "../Enemies/Bird/BirdFrames";
import birdSpawnLocations from "../Enemies/Bird/BirdSpawnLoctions";
import { isEnemyBullet } from "../Guard";
import VanishRightAppearLeft from "../LocationProviders/VanishRightAppearLeft";
import BulletParticle from "../Particles/BulletParticle";
import BackAndForthFrameProvider from "../Providers/BackAndForthFrameProvider";
import { appState } from "../State/Store";
import { getRandomArrayElement } from "../Utility/Array";
import { getRandomFrameKeyIndex } from "../Utility/Frame";
import SideToSideUpAndDown from "../LocationProviders/SideToSideUpAndDown";

/**
 * Module:          Level 01
 * Responsibility:  Define the first level.
 */

/**
 * Sets up level 01.
 */
export default class Level01 extends BaseLevel {

    /**
     * Start Level 01.
     */
    public start(): void {
        super.start();

        const enemies = birdSpawnLocations.map((location) => {
            const randomAngle = getRandomArrayElement([2, 358, 178, 182]);
            const frameProvider = new BackAndForthFrameProvider(getRandomFrameKeyIndex(getBirdFrames().frames));
            const locationProvider = new SideToSideUpAndDown(3, randomAngle);
            return new BirdEnemy(location.left, location.top, 100, locationProvider, frameProvider);
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
