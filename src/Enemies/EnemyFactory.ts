/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { BaseEnemy } from "../Base/BaseEnemy";
import { birdFrameTime, orbFrameTime, robotFrameTime } from "../Constants/EnemyFrameTime";
import { orbMovementSpeed, robotMovementSpeed } from "../Constants/EnemyMovementSpeeds";
import downFireAngleProvider from "../FireAngleProviders/DownAngleProvider";
import orbEnemyAngleProvider from "../FireAngleProviders/OrbEnemyAngleProvider";
import MoveDownAppearUp from "../LocationProviders/MoveDownAppearUp";
import SideToSideUpAndDown from "../LocationProviders/SideToSideUpAndDown";
import VanishRightAppearLeft from "../LocationProviders/VanishRightAppearLeft";
import BackAndForthFrameProvider from "../Providers/BackAndForthFrameProvider";
import CircleFrameProvider from "../Providers/CircleFrameProvider";
import dimensionProvider from "../Providers/DimensionProvider";
import getExplosion01 from "../SharedFrames/Explosion01";
import { getExplosion02 } from "../SharedFrames/Explosion02";
import { Enemies } from "../Types";
import { getMaximumFrameDimensions, getRandomFrameKeyIndex } from "../Utility/Frame";
import BirdEnemy from "./Bird/BirdEnemy";
import getBirdFrames from "./Bird/BirdFrames";
import OrbEnemy from "./Orb/OrbEnemy";
import getOrbFrames from "./Orb/OrbFrames";
import RobotEnemy from "./Robot/RobotEnemy";
import getRobotFrames from "./Robot/RobotFrames";

/**
 * Module:          EnemyFactory
 * Responsibility:  Create enemy objects
 */

const {
    averagePixelSize,
} = dimensionProvider();

export function enemyFactory(enemy: Enemies, left: number, top: number, speed: number, angle: number, color?: string): BaseEnemy {
    switch (enemy) {
        case "bird": {
            const frameProvider = new BackAndForthFrameProvider(getRandomFrameKeyIndex(getBirdFrames().frames));
            const { width, height } = getMaximumFrameDimensions(getBirdFrames().frames, averagePixelSize);
            const locationProvider = new SideToSideUpAndDown(left, top, speed, angle, width, height);
            return new BirdEnemy(birdFrameTime, locationProvider, frameProvider, getExplosion01, getBirdFrames);
        }
        case "robot": {
            const frameProvider = new BackAndForthFrameProvider(0);
            const { width, height } = getMaximumFrameDimensions(getRobotFrames().frames, averagePixelSize);
            const locationProvider = new VanishRightAppearLeft(left, top, robotMovementSpeed, angle, width, height);

            if (color === undefined) {
                throw new Error("Robot enemy requires a color");
            }

            return new RobotEnemy(color, robotFrameTime, locationProvider, frameProvider, getExplosion02, getRobotFrames, downFireAngleProvider);

            break;
        }
        case "orb": {
            const frameProvider = new CircleFrameProvider(0);
            const { width, height } = getMaximumFrameDimensions(getOrbFrames().frames, averagePixelSize);
            const locationProvider = new MoveDownAppearUp(80, left, top, orbMovementSpeed, angle, width, height);
            return new OrbEnemy(orbFrameTime, locationProvider, frameProvider, getExplosion02, getOrbFrames, orbEnemyAngleProvider);
        }

        default:
            throw new Error(`Unknown enemy ${enemy}`);
    }
}
