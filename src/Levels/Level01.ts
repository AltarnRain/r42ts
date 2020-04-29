/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseLevel from "../Base/BaseLevel";
import { BirdFrameTime as birdFrameTime } from "../Constants/EnemyFrameTime";
import { birdMovementSpeed as birdMovementSpeed } from "../Constants/EnemyMovementSpeeds";
import { birdRandomAngles as birdRandomAngles } from "../Constants/MovementAngles";
import BirdEnemy from "../Enemies/Bird/BirdEnemy";
import getBirdFrames from "../Enemies/Bird/BirdFrames";
import birdSpawnLocations from "../Enemies/Bird/BirdSpawnLoctions";
import SideToSideUpAndDown from "../LocationProviders/SideToSideUpAndDown";
import BackAndForthFrameProvider from "../Providers/BackAndForthFrameProvider";
import dimensionProvider from "../Providers/DimensionProvider";
import getExplosion01 from "../SharedFrames/Explosion01";
import { getRandomArrayElement } from "../Utility/Array";
import { getMaximumFrameDimensions, getRandomFrameKeyIndex } from "../Utility/Frame";

/**
 * Module:          Level 01
 * Responsibility:  Define the first level.
 */

const {
    averagePixelSize
} = dimensionProvider();

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

            const { width, height } = getMaximumFrameDimensions(getBirdFrames().frames, averagePixelSize);
            const locationProvider = new SideToSideUpAndDown(location.left, location.top, birdMovementSpeed, randomMovementAngle, width, height);
            return new BirdEnemy(birdFrameTime, locationProvider, frameProvider, getExplosion01, getBirdFrames);
        });

        this.begin(enemies);
    }
}