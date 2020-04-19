/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseLevel from "../Base/BaseLevel";
import BirdEnemy from "../Enemies/Bird/BirdEnemy";
import { BirdSpawnLocations } from "../Enemies/Bird/BirdSpawnLoctions";
import GameLocation from "../Models/GameLocation";
import getShipSpawnLocation from "../Providers/PlayerSpawnLocationProvider";
import { dispatch } from "../State/Store";

/**
 * Module:          Level 01
 * Responsibility:  Define the first level.
 */

/**
 * Sets up level 01.
 */
class Level01 extends BaseLevel {

    public start(): void {
        super.start();

        this.enemies = BirdSpawnLocations.map((l) => new BirdEnemy(l, 3));
        dispatch<GameLocation>("setPlayerLocation", getShipSpawnLocation());
        this.begin();
    }
}

export default Level01;