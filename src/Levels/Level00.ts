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

        // const enemies = birdSpawnLocations.map((location) => {
        //     // This may deviate from te original game but I do not care. Each birds will
        //     // begin to move in a random direction determined by the function below
        //     const randomMovementAngle = getRandomArrayElement(birdRandomAngles);

        //     // In level 01 if the a bird hits a side it will move in the other direction.
        //     const frameProvider = new BackAndForthFrameProvider(getRandomFrameKeyIndex(getBirdFrames().frames));

        //     const { width, height } = getMaximumFrameDimensions(getBirdFrames().frames, averagePixelSize);
        //     const locationProvider = new SideToSideUpAndDown(location.left, location.top, birdMovementSpeed, randomMovementAngle, width, height);
        //     return new BirdEnemy(birdFrameTime, locationProvider, frameProvider, getExplosion01, getBirdFrames);
        // });

        this.begin([]);
    }

    /**
     * Sets up a robot for every robot frame and player their animation without them moving.
     * They do a Wave :D
     */
    // private robotFrameAnimationTest() {
    //     const robotFrames = getRobotFrames();
    //     const enemies = robotSpawnLocationsAndColor.map((lc, index) => {
    //         if (index < robotFrames.frames.length) {
    //             const frameProvider = new BackAndForthFrameProvider(index);
    //             const LocationProvider = new VanishRightAppearLeft(0, 0);
    //             return new RobotEnemy(lc.left, lc.top, 150, lc.color, LocationProvider, frameProvider, downFireAngleProvider);
    //         }
    //     }).filter((x) => x !== undefined);

    //     dispatch(setEnemies(enemies as BaseEnemy[]));
    // }

    // private orbEnemyAnimationTest() {
    //     const enemies = orbSpawnLocations.map((lc) => {
    //         const frameProvider = new CircleFrameProvider(0);
    //         const locationProvider = new MoveDownAppearUp(40, 0.3, angles.down);
    //         // return new OrbEnemy(lc.left, lc.top, 200, locationProvider, frameProvider, downFireAngleProvider);
    //     }).filter((x) => x !== undefined);
    //     dispatch(setEnemies(enemies));
    // }
}
