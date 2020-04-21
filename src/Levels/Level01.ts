/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseLevel from "../Base/BaseLevel";
import BirdEnemy from "../Enemies/Bird/BirdEnemy";
import birdSpawnLocations from "../Enemies/Bird/BirdSpawnLoctions";
import SideToSideUpAndDown from "../LocationProviders/SideToSideUpAndDown";
import GameLocation from "../Models/GameLocation";
import getShipSpawnLocation from "../Providers/PlayerSpawnLocationProvider";
import { dispatch } from "../State/Store";
import { getRandomArrayElement } from "../Utility/Array";

/**
 * Module:          Level 01
 * Responsibility:  Define the first level.
 */

/**
 * Sets up level 01.
 */
export default class Level01 extends BaseLevel {

    public start(): void {
        super.start();

        this.enemies = birdSpawnLocations.map((l) => {
            const randomAngle = getRandomArrayElement([2, 358, 178, 182]);
            const locationProvider = new SideToSideUpAndDown(3, randomAngle);
            return new BirdEnemy(l, 100, locationProvider);
        });

        dispatch<GameLocation>("setPlayerLocation", getShipSpawnLocation());
        this.begin();
    }
}