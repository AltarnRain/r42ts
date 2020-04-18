/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BirdEnemy from "../Enemies/Bird/BirdEnemy";
import { BirdSpawnLocations } from "../Enemies/Bird/BirdSpawnLoctions";
import { PlayerFormation } from "../Modules";
import getShipSpawnLocation from "../Providers/PlayerSpawnLocationProvider";

/**
 * Module:          Level 01
 * Responsibility:  Define the first level.
 */

export class Level01 {

    public start(): void {

        const enemies = BirdSpawnLocations.map((l) => new BirdEnemy(l, 3));

        PlayerFormation.formFast(getShipSpawnLocation(), () => {
            
        });
    }
}