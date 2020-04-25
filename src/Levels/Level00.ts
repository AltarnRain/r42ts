/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { BaseEnemy } from "../Base/BaseEnemy";
import BaseLevel from "../Base/BaseLevel";
import orbSpawnLocations from "../Enemies/Orb/OrbEnemiesSpawnLocations";
import OrbEnemy from "../Enemies/Orb/OrbEnemy";
import { drawBackground } from "../GameScreen/StaticRenders";
import MoveDownAppearUp from "../LocationProviders/MoveDownAppearUp";
import GameLoop from "../Main/GameLoop";
import PlayerShip from "../Player/PlayerShip";
import { dispatch } from "../State/Store";

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

        this.enemies  = orbSpawnLocations.map((sl) => new OrbEnemy(sl, 500, new MoveDownAppearUp(80, 0.3, 90), doesNotFire));

        // Add the enemies to the global state. The registered stateManager will take it from here.
        dispatch<BaseEnemy[]>("setEnemies", this.enemies);
        // Register the stateManager so it can act on state changes in the level.
        this.registerSubscription(GameLoop.registerUpdateState(this.stateManager));
    }
}

function doesNotFire(): boolean {
    return false;
}