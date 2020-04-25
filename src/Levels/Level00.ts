/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { diagonalAtPlayerAngleProvider } from "../AngleProviders/DiagonalAtPlayerAngleProvider";
import { twoPXBullet } from "../Assets/twoPXBullet";
import { BaseEnemy } from "../Base/BaseEnemy";
import BaseLevel from "../Base/BaseLevel";
import BaseParticle from "../Base/BaseParticle";
import BulletProvider from "../BulletProviders/BulletProvider";
import CGAColors from "../Constants/CGAColors";
import orbSpawnLocations from "../Enemies/Orb/OrbEnemiesSpawnLocations";
import OrbEnemy from "../Enemies/Orb/OrbEnemy";
import { drawBackground } from "../GameScreen/StaticRenders";
import MoveDownAppearUp from "../LocationProviders/MoveDownAppearUp";
import GameLoop from "../Main/GameLoop";
import BulletParticle from "../Particles/BulletParticle";
import PlayerShip from "../Player/PlayerShip";
import dimensionProvider from "../Providers/DimensionProvider";
import { appState, dispatch } from "../State/Store";
import { calculateAngle, calculateAngleDifference } from "../Utility/Geometry";
import { angles } from "../Constants/Angles";

/**
 * Module:          Level 00
 * Responsibility:  Define the playground level.
 */

const {
    averagePixelSize,
} = dimensionProvider();

/**
 * Sets up level 00. Play ground level.
 */
export default class Level00 extends BaseLevel {
    constructor(stateManager: any, levelWon: () => boolean) {
        super(stateManager, levelWon);
    }

    public start(): void {
        // Register the background draw function so it runs in the game loop.
        this.registerSubscription(GameLoop.registerBackgroundDrawing(drawBackground));

        dispatch<PlayerShip>("setPlayer", new PlayerShip());
        // dispatch<GameLocation>("setPlayerLocation", { left: 0, top: 0 });

        this.enemies = orbSpawnLocations.map((startLocation) => {
            const bulletProvider = new BulletProvider(100, twoPXBullet, CGAColors.magenta, 10, -1, 2, orbFireCheck, diagonalAtPlayerAngleProvider);
            const locationProvider = new MoveDownAppearUp(80, 0, 90);
            return new OrbEnemy(startLocation, 300, locationProvider, bulletProvider);
        });

        // Add the enemies to the global state. The registered stateManager will take it from here.
        dispatch<BaseEnemy[]>("setEnemies", this.enemies);
        // Register the stateManager so it can act on state changes in the level.
        this.registerSubscription(GameLoop.registerUpdateState(this.stateManager));
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
        enemyLevelState,
        playerState,
    } = appState();

    const playerShip = playerState.ship;

    if (playerShip === undefined) {
        return false;
    }

    let canFire = false;

    // Save cast. The typeguard ensures only BulletParticles are returned but TypeScript isn't
    // clever enough (yet) to understand this.
    const enemyBullets = enemyLevelState.particles.filter((p) => isEnemyPullet(p)) as BulletParticle[];

    if (enemyBullets.length === 0) {
        // No bullets, can always fire.
        canFire = true;
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

    if (canFire) {
        const enemiesWithBestAngle = enemyLevelState.enemies.map((e) => {
            const enemyAngleToPlayer = calculateAngle(e.getCenterLocation(), playerState.playerLocation);
            const idealAngle = diagonalAtPlayerAngleProvider(enemy);

            if (enemyAngleToPlayer !== undefined && idealAngle !== undefined) {
                const angleDifference = calculateAngleDifference(enemyAngleToPlayer, idealAngle);
                return { enemy: e, angleDifference };
            }
        });

    }

    return false;
}

function isEnemyPullet(particle: BaseParticle): particle is BulletParticle {
    return particle && particle.getObjectType() === "enemybullet";
}