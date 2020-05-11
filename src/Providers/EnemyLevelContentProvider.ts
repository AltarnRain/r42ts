/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseEnemy from "../Base/BaseEnemy";
import CGAColors from "../Constants/CGAColors";
import { FrameTimes, Locations, MovementAngles, Speeds } from "../Constants/Constants";
import BalloonEnemy from "../Enemies/Balloon/BalloonEnemy";
import { getBalloonFrames } from "../Enemies/Balloon/BalloonFrames";
import BirdEnemy from "../Enemies/Bird/BirdEnemy";
import getBirdFrames from "../Enemies/Bird/BirdFrames";
import orbSpawnLocations from "../Enemies/Orb/OrbEnemiesSpawnLocations";
import OrbEnemy from "../Enemies/Orb/OrbEnemy";
import getOrbFrames from "../Enemies/Orb/OrbFrames";
import RobotEnemy from "../Enemies/Robot/RobotEnemy";
import getRobotFrames from "../Enemies/Robot/RobotFrames";
import robotSpawnLocationsAndColor from "../Enemies/Robot/RobotSpawnLocationsAndColor";
import SpinnerEnemy from "../Enemies/Spinner/SpinnerEnemy";
import { getSpinnerFrames } from "../Enemies/Spinner/SpinnerFrames";
import BulletRunner from "../Runners/BulletRunner";
import getExplosion01 from "../SharedFrames/Explosion01";
import { getExplosion02 } from "../SharedFrames/Explosion02";
import { Enemies } from "../Types";
import { getRandomArrayElement } from "../Utility/Array";
import { getMaximumFrameDimensions, getRandomFrameKeyIndex } from "../Utility/Frame";
import dimensionProvider from "./DimensionProvider";
import BackAndForthFrameProvider from "./FrameProviders/BackAndForthFrameProvider";
import CircleFrameProvider from "./FrameProviders/CircleFrameProvider";
import ImmobileLocationProvider from "./LocationProviders/ImmobileLocationProvider";
import MoveDownAppearUp from "./LocationProviders/MoveDownAppearUpLocaionProvider";
import SideToSideUpAndDown from "./LocationProviders/SideToSideUpAndDownLocationProvider";
import VanishRightAppearLeftLocationProvider from "./LocationProviders/VanishRightAppearLeftLocationProvider";
import firstEnemyOccasionalDown from "./ShipsToFireProviders/FirstEnemyOccasionalDown";
import maxFiveDiagonal from "./ShipsToFireProviders/MaxFiveDiagonal";
import sevenSixSeverGridProvider from "./SpawnLocations/SevenSixSevenGridProvider";
import { getAngles } from "../Constants/Angles";
import Wobble from "./LocationProviders/Wobble";
import getExplosion03 from "../SharedFrames/Explosion03";

/**
 * Module:          EnemyFactory
 * Responsibility:  Create enemy objects
 */

const {
    pixelSize,
    gameField
} = dimensionProvider();

export function enemyLevelContentFactory(enemy: Enemies): { bulletRunner?: BulletRunner, enemies: BaseEnemy[] } {
    switch (enemy) {
        case "bird": {
            const birdFrames = getBirdFrames().frames;
            const { width, height } = getMaximumFrameDimensions(birdFrames, pixelSize);

            const enemies = sevenSixSeverGridProvider().map((location) => {
                const frameProvider = new BackAndForthFrameProvider(getRandomFrameKeyIndex(birdFrames));

                const randomMovementAngle = getRandomArrayElement(MovementAngles.bird);
                const locationProvider = new SideToSideUpAndDown(location.left, location.top, Speeds.Movement.bird, randomMovementAngle, width, height, gameField.top, gameField.bottom);

                // This may deviate from te original game but I do not care. Each birds will
                // begin to move in a random direction determined by the function below

                return new BirdEnemy(FrameTimes.bird, locationProvider, frameProvider, getExplosion01, getBirdFrames);
            });

            return {
                enemies,
            };
        }
        case "robot": {
            const { width, height } = getMaximumFrameDimensions(getRobotFrames().frames, pixelSize);
            const { maxBottom } = Locations.Enemies.robot;

            const enemies = robotSpawnLocationsAndColor.map((lc) => {
                const frameProvider = new BackAndForthFrameProvider(0);
                const locationProvider = new VanishRightAppearLeftLocationProvider(lc.left, lc.top, Speeds.Movement.robot, MovementAngles.robot, width, height, gameField.top, maxBottom);
                return new RobotEnemy(lc.color, FrameTimes.robot, locationProvider, frameProvider, getExplosion02, getRobotFrames);
            });

            const bulletRunner = new BulletRunner(CGAColors.lightRed, Speeds.Bullets.robot, firstEnemyOccasionalDown);

            return {
                enemies,
                bulletRunner,
            };
        }
        case "orb": {
            const { width, height } = getMaximumFrameDimensions(getOrbFrames().frames, pixelSize);
            const { maxTop, maxBottom } = Locations.Enemies.Orb;

            const enemies = orbSpawnLocations.map((location) => {
                const frameProvider = new CircleFrameProvider(0);
                const locationProvider = new MoveDownAppearUp(location.left, location.top, Speeds.Movement.orb, MovementAngles.orb, width, height, maxTop, maxBottom);
                return new OrbEnemy(FrameTimes.orb, locationProvider, frameProvider, getExplosion02, getOrbFrames);
            });

            const bulletRunner = new BulletRunner(CGAColors.magenta, Speeds.Bullets.orb, maxFiveDiagonal);

            return {
                enemies,
                bulletRunner
            };
        }

        case "spinner": {
            const frames = getSpinnerFrames().frames;
            const { width, height } = getMaximumFrameDimensions(frames, pixelSize);

            const verticalBounds = pixelSize * 6;

            const enemies = sevenSixSeverGridProvider().map((location) => {
                const maxTop = location.top - verticalBounds;
                const maxBottom = location.top + verticalBounds;

                const frameProvider = new CircleFrameProvider(getRandomFrameKeyIndex(frames));
                const randomAngle = getRandomArrayElement(MovementAngles.spinner);
                const locationProvider = new SideToSideUpAndDown(location.left, location.top, Speeds.Movement.spinner, randomAngle, width, height, maxTop, maxBottom);
                return new SpinnerEnemy(FrameTimes.spinner, locationProvider, frameProvider, getExplosion01, getSpinnerFrames);
            });

            const bulletRunner = new BulletRunner(CGAColors.white, Speeds.Bullets.spinner, maxFiveDiagonal);

            return {
                enemies,
                bulletRunner,
            };
        }

        case "balloon": {
            const frames = getBalloonFrames().frames;
            const { width, height } = getMaximumFrameDimensions(frames, pixelSize);

            // const locationProvider = new SideToSideUpAndDown(left, top, Speeds.Movement.spinner, angle, width, height, maxTop, maxBottom);
            const enemies = sevenSixSeverGridProvider().map((location) => {
                const frameProvider = new CircleFrameProvider(getRandomFrameKeyIndex(frames));
                const randomAngle = getRandomArrayElement(getAngles());

                // const locationProvider = new Wobble(location.left, location.top, Speeds.Movement.balloon, randomAngle, width, height, 200);
                const locationProvider = new ImmobileLocationProvider(location.left, location.top);
                return new BalloonEnemy(FrameTimes.spinner, locationProvider, frameProvider, getExplosion03, getBalloonFrames);
            });

            const bulletRunner = new BulletRunner(CGAColors.blue, Speeds.Bullets.balloon, maxFiveDiagonal);

            return {
                enemies,
                bulletRunner
            };
        }

        default:
            throw new Error(`Unknown enemy ${enemy}`);
    }
}
