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
import BulletRunner from "../BulletProviders/BulletRunner";
import CGAColors from "../Constants/CGAColors";
import orbSpawnLocations from "../Enemies/Orb/OrbEnemiesSpawnLocations";
import OrbEnemy from "../Enemies/Orb/OrbEnemy";
import { drawBackground } from "../GameScreen/StaticRenders";
import MoveDownAppearUp from "../LocationProviders/MoveDownAppearUp";
import GameLoop from "../Main/GameLoop";
import BulletParticle from "../Particles/BulletParticle";
import PlayerShip from "../Player/PlayerShip";
import EnemyLevelState from "../State/Definition/EnemyLevelState";
import { appState, dispatch } from "../State/Store";
import CircleFrameProvider from "../Providers/CircleFrameProvider";

/**
 * Module:          Level 00
 * Responsibility:  Define the playground level.
 */

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

        const enemies = orbSpawnLocations.map((startLocation, index) => {
            if (index === 0) {
                const frameProvider = new CircleFrameProvider(0);
                const locationProvider = new MoveDownAppearUp(80, 0, 90);
                return new OrbEnemy(startLocation, 300, locationProvider, frameProvider,  diagonalAtPlayerAngleProvider);
            }
        }).filter((e) => e !== undefined);

        // Add the enemies to the global state. The registered stateManager will take it from here.
        dispatch<number>("setFireInterval", 200);
        dispatch<BaseEnemy[]>("setEnemies", enemies as BaseEnemy[]);

        const bulletRunner = new BulletRunner(twoPXBullet, CGAColors.magenta, 10, orbFireCheck);

        // Register the stateManager so it can act on state changes in the level.
        this.registerSubscription(GameLoop.registerUpdateState(this.stateManager));
        this.registerSubscription(GameLoop.registerUpdateState((tick) => bulletRunner.getBullets(tick)));
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

function isEnemyBullet(particle: BaseParticle): particle is BulletParticle {
    return particle && particle.getObjectType() === "enemybullet";
}