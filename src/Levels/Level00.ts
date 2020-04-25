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
import OrbEnemy from "../Enemies/Orb/OrbEnemy";
import { drawBackground } from "../GameScreen/StaticRenders";
import MoveDownAppearUp from "../LocationProviders/MoveDownAppearUp";
import GameLoop from "../Main/GameLoop";
import GameLocation from "../Models/GameLocation";
import BulletParticle from "../Particles/BulletParticle";
import PlayerShip from "../Player/PlayerShip";
import { appState, dispatch } from "../State/Store";

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
        dispatch<GameLocation>("setPlayerLocation", { left: 0, top: 0 });

        const bp = new BulletProvider(-1, twoPXBullet, CGAColors.magenta, 10, -1, 2, orbFireBehaviour, diagonalAtPlayerAngleProvider);

        // this.enemies = orbSpawnLocations.map((sl) => {
        //     return new OrbEnemy(sl, 5000000000000000000000000000000, new MoveDownAppearUp(80, 0, 90), bp);
        // });

        let leftStart = 600;

        this.enemies = [
            new OrbEnemy({ left: leftStart += 50, top: 400 }, 5000000000000000000000000000000, new MoveDownAppearUp(80, 0, 90), bp),
            new OrbEnemy({ left: leftStart += 50, top: 400 }, 5000000000000000000000000000000, new MoveDownAppearUp(80, 0, 90), bp),
            new OrbEnemy({ left: leftStart += 50, top: 400 }, 5000000000000000000000000000000, new MoveDownAppearUp(80, 0, 90), bp),
            new OrbEnemy({ left: leftStart += 50, top: 400 }, 5000000000000000000000000000000, new MoveDownAppearUp(80, 0, 90), bp),
            new OrbEnemy({ left: leftStart += 50, top: 400 }, 5000000000000000000000000000000, new MoveDownAppearUp(80, 0, 90), bp),
            new OrbEnemy({ left: leftStart += 50, top: 400 }, 5000000000000000000000000000000, new MoveDownAppearUp(80, 0, 90), bp),
        ];

        // Add the enemies to the global state. The registered stateManager will take it from here.
        dispatch<BaseEnemy[]>("setEnemies", this.enemies);
        // Register the stateManager so it can act on state changes in the level.
        this.registerSubscription(GameLoop.registerUpdateState(this.stateManager));
    }
}

function doesNotFire(): boolean {
    return false;
}

function orbFireBehaviour(self: BaseEnemy): boolean {
    const {
        enemyLevelState,
        playerState,
    } = appState();

    const playerShip = playerState.ship;

    if (playerShip === undefined) {
        return false;
    }

    const orb = self as OrbEnemy;

    console.log(orb.mycount);

    // Orbs fire a salvo of 5 bullets, aimed at the player. They never fire until all their
    // bullets are offscreen.
    // Check the state if there's any bullets, if there are, we don't do anything.
    const enemyBullets = enemyLevelState.particles.filter((p) => isEnemyPullet(p)).map((p) => p as BulletParticle);

    // if (enemyBullets.length < 5) {
    if (enemyBullets.length === 0) {
        return true;
    } else {
        return enemyBullets.some((p) => p.isOwner(self)) === false;
    }
}

function isEnemyPullet(particle: BaseParticle): particle is BulletParticle {
    return particle && particle.getObjectType() === "enemybullet";
}