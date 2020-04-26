/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseLevel from "../Base/BaseLevel";
import BirdEnemy from "../Enemies/Bird/BirdEnemy";
import getBirdFrames from "../Enemies/Bird/BirdFrames";
import birdSpawnLocations from "../Enemies/Bird/BirdSpawnLoctions";
import SideToSideUpAndDown from "../LocationProviders/SideToSideUpAndDown";
import BackAndForthFrameProvider from "../Providers/BackAndForthFrameProvider";
import getShipSpawnLocation from "../Providers/PlayerSpawnLocationProvider";
import { dispatch } from "../State/Store";
import { getRandomArrayElement } from "../Utility/Array";
import { getRandomFrameKeyIndex } from "../Utility/Frame";

/**
 * Module:          Level 01
 * Responsibility:  Define the first level.
 */

/**
 * Sets up level 01.
 */
export default class Level01 extends BaseLevel {

    /**
     * Start Level 01.
     */
    public start(): void {
        super.start();

        const enemies = birdSpawnLocations.map((location) => {
            const randomAngle = getRandomArrayElement([2, 358, 178, 182]);
            const frameProvider = new BackAndForthFrameProvider(getRandomFrameKeyIndex(getBirdFrames().frames));
            const locationProvider = new SideToSideUpAndDown(3, randomAngle);
            return new BirdEnemy(location.left, location.top, 100,  locationProvider, frameProvider);
        });

        this.begin(enemies);
    }
}
