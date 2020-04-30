/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseLevel from "../Base/BaseLevel";
import { birdMovementSpeed } from "../Constants/EnemyMovementSpeeds";
import { birdRandomAngles } from "../Constants/MovementAngles";
import BirdEnemy from "../Enemies/Bird/BirdEnemy";
import getBirdFrames from "../Enemies/Bird/BirdFrames";
import birdSpawnLocations from "../Enemies/Bird/BirdSpawnLoctions";
import SideToSideUpAndDown from "../LocationProviders/SideToSideUpAndDown";
import BackAndForthFrameProvider from "../Providers/BackAndForthFrameProvider";
import dimensionProvider from "../Providers/DimensionProvider";
import getExplosion01 from "../SharedFrames/Explosion01";
import { getRandomArrayElement } from "../Utility/Array";
import { getMaximumFrameDimensions, getRandomFrameKeyIndex } from "../Utility/Frame";
import { birdFrameTime } from "../Constants/EnemyFrameTime";

/**
 * Module:          Level 00
 * Responsibility:  Define the playground level.
 */

const {
    averagePixelSize,
} = dimensionProvider();

/**
 * Sets up level 00. Play ground level.
 */
export default class Level00 extends BaseLevel {

    constructor(stateManager: any, levelWon: () => boolean) {
        super(stateManager, levelWon);
    }

    public start(): void {
        super.start();

        const b1 = this.getBird(500, 500, 0, 0);
        const b2 = this.getBird(500, 500, 0, 0);

        this.begin([b1, b2]);
    }

    private getBird(left: number, top: number, angle: number, speed: number): BirdEnemy {
        // In level 01 if the a bird hits a side it will move in the other direction.
        const frameProvider = new BackAndForthFrameProvider(getRandomFrameKeyIndex(getBirdFrames().frames));
        const { width, height } = getMaximumFrameDimensions(getBirdFrames().frames, averagePixelSize);
        const locationProvider = new SideToSideUpAndDown(left, top, speed, angle, width, height);
        return new BirdEnemy(birdFrameTime, locationProvider, frameProvider, getExplosion01, getBirdFrames);
    }
}
