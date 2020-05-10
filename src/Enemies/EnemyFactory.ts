/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseEnemy from "../Base/BaseEnemy";
import { FrameTimes, Locations, Speeds } from "../Constants/Constants";
import dimensionProvider from "../Providers/DimensionProvider";
import BackAndForthFrameProvider from "../Providers/FrameProviders/BackAndForthFrameProvider";
import CircleFrameProvider from "../Providers/FrameProviders/CircleFrameProvider";
import MoveDownAppearUp from "../Providers/LocationProviders/MoveDownAppearUpLocaionProvider";
import SideToSideUpAndDown from "../Providers/LocationProviders/SideToSideUpAndDownLocationProvider";
import VanishRightAppearLeftLocationProvider from "../Providers/LocationProviders/VanishRightAppearLeftLocationProvider";
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
import SpinnerEnemy from "./Spinner/SpinnerEnemy";
import { getSpinnerFrames } from "./Spinner/SpinnerFrames";

/**
 * Module:          EnemyFactory
 * Responsibility:  Create enemy objects
 */

const {
    pixelSize,
    gameField
} = dimensionProvider();

export function enemyFactory(enemy: Enemies, left: number, top: number, angle: number, color?: string): BaseEnemy {
    switch (enemy) {
        case "bird": {
            const birdFrames = getBirdFrames().frames;
            const frameProvider = new BackAndForthFrameProvider(getRandomFrameKeyIndex(birdFrames));
            const { width, height } = getMaximumFrameDimensions(birdFrames, pixelSize);
            const locationProvider = new SideToSideUpAndDown(left, top, Speeds.Movement.bird, angle, width, height, gameField.top, gameField.bottom);
            return new BirdEnemy(FrameTimes.bird, locationProvider, frameProvider, getExplosion01, getBirdFrames);
        }
        case "robot": {
            const frameProvider = new BackAndForthFrameProvider(0);
            const { width, height } = getMaximumFrameDimensions(getRobotFrames().frames, pixelSize);
            const { maxBottom } = Locations.Enemies.robot;
            const locationProvider = new VanishRightAppearLeftLocationProvider(left, top, Speeds.Movement.robot, angle, width, height, gameField.top, maxBottom);

            if (color === undefined) {
                throw new Error("Robot enemy requires a color");
            }

            return new RobotEnemy(color, FrameTimes.robot, locationProvider, frameProvider, getExplosion02, getRobotFrames);
        }
        case "orb": {
            const frameProvider = new CircleFrameProvider(0);
            const { width, height } = getMaximumFrameDimensions(getOrbFrames().frames, pixelSize);
            const { maxTop, maxBottom} = Locations.Enemies.Orb;

            const locationProvider = new MoveDownAppearUp(left, top, Speeds.Movement.orb, angle, width, height, maxTop, maxBottom);
            return new OrbEnemy(FrameTimes.orb, locationProvider, frameProvider, getExplosion02, getOrbFrames);
        }

        case "spinner": {
            const frames = getSpinnerFrames().frames;
            const { width, height } = getMaximumFrameDimensions(frames, pixelSize);

            const verticalBounds = pixelSize * 6;
            const maxTop = top - verticalBounds;
            const maxBottom = top + verticalBounds;

            const locationProvider = new SideToSideUpAndDown(left, top, Speeds.Movement.spinner, angle, width, height, maxTop, maxBottom);
            const frameProvider = new CircleFrameProvider(getRandomFrameKeyIndex(frames));

            return new SpinnerEnemy(FrameTimes.spinner, locationProvider, frameProvider, getExplosion01, getSpinnerFrames);
        }

        default:
            throw new Error(`Unknown enemy ${enemy}`);
    }
}
