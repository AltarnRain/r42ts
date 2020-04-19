/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseLevel from "../Base/BaseLevel";
import BirdEnemy from "../Enemies/Bird/BirdEnemy";
import { BirdSpawnLocations } from "../Enemies/Bird/BirdSpawnLoctions";
import GameLoop from "../Main/GameLoop";

/**
 * Module:          Level 02
 * Responsibility:  Define the second level.
 */

/**
 * Sets up level 01.
 */
class Level02 extends BaseLevel {
    public start(): void {
        super.start();
        this.enemies = BirdSpawnLocations.map((l) => new BirdEnemy(l, 3, 80));
        this.begin();
    }
}

export default Level02;