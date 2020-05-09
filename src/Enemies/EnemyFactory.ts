/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseEnemy from "../Base/BaseEnemy";
import { FrameTimes, Speeds } from "../Constants/Constants";
import MoveDownAppearUp from "../LocationProviders/MoveDownAppearUpLocaionProvider";
import SideToSideUpAndDown from "../LocationProviders/SideToSideUpAndDownLocationProvider";
import VanishRightAppearLeftLocationProvider from "../LocationProviders/VanishRightAppearLeftLocationProvider";
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
    pixelSize,
} = dimensionProvider();

export function enemyFactory(enemy: Enemies, left: number, top: number, angle: number, color?: string): BaseEnemy {
    switch (enemy) {
        case "bird": {
            const frameProvider = new BackAndForthFrameProvider(getRandomFrameKeyIndex(getBirdFrames().frames));
            const { width, height } = getMaximumFrameDimensions(getBirdFrames().frames, pixelSize);
            const locationProvider = new SideToSideUpAndDown(left, top, Speeds.Movement.bird, angle, width, height);
            return new BirdEnemy(FrameTimes.bird, locationProvider, frameProvider, getExplosion01, getBirdFrames);
        }
        case "robot": {
            const frameProvider = new BackAndForthFrameProvider(0);
            const { width, height } = getMaximumFrameDimensions(getRobotFrames().frames, pixelSize);
            const locationProvider = new VanishRightAppearLeftLocationProvider(left, top, Speeds.Movement.robot, angle, width, height);

            if (color === undefined) {
                throw new Error("Robot enemy requires a color");
            }

            return new RobotEnemy(color, FrameTimes.robot, locationProvider, frameProvider, getExplosion02, getRobotFrames);
        }
        case "orb": {
            const frameProvider = new CircleFrameProvider(0);
            const { width, height } = getMaximumFrameDimensions(getOrbFrames().frames, pixelSize);
            const locationProvider = new MoveDownAppearUp(80, left, top, Speeds.Movement.orb, angle, width, height);
            return  new OrbEnemy(FrameTimes.orb, locationProvider, frameProvider, getExplosion02, getOrbFrames);
        }

        default:
            throw new Error(`Unknown enemy ${enemy}`);
    }
}
