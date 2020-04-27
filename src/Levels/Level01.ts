/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseLevel from "../Base/BaseLevel";
import { BirdFrameTime } from "../Constants/EnemyFrameTime";
import { birdMovementSpeed as birdMovementSpeed } from "../Constants/EnemyMovementSpeeds";
import { birdRandomAngles as birdRandomAngles } from "../Constants/MovementAngles";
import BirdEnemy from "../Enemies/Bird/BirdEnemy";
import getBirdFrames from "../Enemies/Bird/BirdFrames";
import birdSpawnLocations from "../Enemies/Bird/BirdSpawnLoctions";
import SideToSideUpAndDown from "../LocationProviders/SideToSideUpAndDown";
import BackAndForthFrameProvider from "../Providers/BackAndForthFrameProvider";
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

            // This may deviate from te original game but I do not care. Each birds will
            // begin to move in a random direction determined by the function below
            const randomMovementAngle = getRandomArrayElement(birdRandomAngles);

            // In level 01 if the a bird hits a side it will move in the other direction.
            const frameProvider = new BackAndForthFrameProvider(getRandomFrameKeyIndex(getBirdFrames().frames));

            const locationProvider = new SideToSideUpAndDown(birdMovementSpeed, randomMovementAngle);
            return new BirdEnemy(location.left, location.top, BirdFrameTime, locationProvider, frameProvider);
        });

        this.begin(enemies);
    }
}