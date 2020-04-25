/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { twoPXBullet } from "../Assets/twoPXBullet";
import { BaseEnemy } from "../Base/BaseEnemy";
import BaseLevel from "../Base/BaseLevel";
import BulletProvider from "../BulletProviders/BulletProvider";
import { angles } from "../Constants/Angles";
import CGAColors from "../Constants/CGAColors";
import orbSpawnLocations from "../Enemies/Orb/OrbEnemiesSpawnLocations";
import OrbEnemy from "../Enemies/Orb/OrbEnemy";
import { drawBackground } from "../GameScreen/StaticRenders";
import MoveDownAppearUp from "../LocationProviders/MoveDownAppearUp";
import GameLoop from "../Main/GameLoop";
import PlayerShip from "../Player/PlayerShip";
import { appState, dispatch } from "../State/Store";
import Particle from "../Particles/Particle";
import BulletParticle from "../Particles/BulletParticle";
import BaseParticle from "../Base/BaseParticle";

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

        const bp = new BulletProvider(-1, twoPXBullet, CGAColors.magenta, angles.rightdown, 10, 0, 4, orbFireBehaviour);

        this.enemies = orbSpawnLocations.map((sl) => new OrbEnemy(sl, 5000000000000000000000000000000, new MoveDownAppearUp(80, 0, 90), bp));

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
        throw new Error("This method should never be called when the player is dead. Enemies do not fire unless the player ship is on screen");
    }

    let fire = false;

    // Orbs fire a salvo of 5 bullets, aimed at the player. They never fire until all their
    // bullets are offscreen.
    // Check the state if there's any bullets, if there are, we don't do anything.
    const enemyBullets = enemyLevelState.particles.filter((p) => p.getObjectType() === "enemybullet");

    if (enemyBullets.length < 5) {
        if (enemyBullets.length === 0) {
            fire = true;
        } else {
            fire = enemyLevelState.particles.some((p) => {
                if (isEnemyPullet(p)) {
                    // This enemy has fired, don't let it fire again so the
                    // next enemy can take a shot.
                    return !p.isOwner(self);
                } else {
                    return false;
                }
            });
        }
    }

    if (fire) {
        const enemyCenter = self.getCenterLocation();
        const playerHitbox = playerShip.getHitbox();
    }

    return fire;
}

function isEnemyPullet(particle: BaseParticle): particle is BulletParticle {
    return particle && particle.getObjectType() === "enemybullet";
}