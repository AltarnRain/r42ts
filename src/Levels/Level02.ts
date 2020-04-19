/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { BaseEnemyObject } from "../Base/BaseEnemyObject";
import BaseLevel from "../Base/BaseLevel";
import BirdEnemy from "../Enemies/Bird/BirdEnemy";
import { BirdSpawnLocations } from "../Enemies/Bird/BirdSpawnLoctions";
import { drawLevelBanner } from "../GameScreen/LevelBanner";
import GameLocation from "../Models/GameLocation";
import { GameLoop, Runner } from "../Modules";
import getShipSpawnLocation from "../Providers/PlayerSpawnLocationProvider";
import { dispatch } from "../State/Store";

/**
 * Module:          Level 01
 * Responsibility:  Define the first level.
 */

/**
 * Sets up level 01.
 */
class Level02 extends BaseLevel {
    public start(): void {
        super.start();
        this.enemies = BirdSpawnLocations.map((l) => new BirdEnemy(l, 3));
        this.registerSubscription(GameLoop.registerUpdateState(Runner.run));
        this.begin();
    }
}

export default Level02;