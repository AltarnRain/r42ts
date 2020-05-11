/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseEnemy from "../Base/BaseEnemy";
import { angles } from "../Constants/Angles";
import { FrameTimes, Locations, MovementAngles, Speeds } from "../Constants/Constants";
import { AsteroidEnemy } from "../Enemies/Asteroid/AsteroidEnemy";
import { getAsteroidFrames } from "../Enemies/Asteroid/AsteroidFrames";
import BalloonEnemy from "../Enemies/Balloon/BalloonEnemy";
import { getBalloonFrames } from "../Enemies/Balloon/BalloonFrames";
import BirdEnemy from "../Enemies/Bird/BirdEnemy";
import getBirdFrames from "../Enemies/Bird/BirdFrames";
import OrbEnemy from "../Enemies/Orb/OrbEnemy";
import getOrbFrames from "../Enemies/Orb/OrbFrames";
import RobotEnemy from "../Enemies/Robot/RobotEnemy";
import getRobotFrames from "../Enemies/Robot/RobotFrames";
import SpinnerEnemy from "../Enemies/Spinner/SpinnerEnemy";
import { getSpinnerFrames } from "../Enemies/Spinner/SpinnerFrames";
import { GameLocation } from "../Models/GameLocation";
import getExplosion01 from "../SharedFrames/Explosion01";
import { getExplosion02 } from "../SharedFrames/Explosion02";
import getExplosion03 from "../SharedFrames/Explosion03";
import getExplosion04 from "../SharedFrames/Explosion04";
import { Enemies } from "../Types";
import { getRandomArrayElement } from "../Utility/Array";
import { getMaximumFrameDimensions, getRandomFrameKeyIndex } from "../Utility/Frame";
import dimensionProvider from "./DimensionProvider";
import BackAndForthFrameProvider from "./FrameProviders/BackAndForthFrameProvider";
import CircleFrameProvider from "./FrameProviders/CircleFrameProvider";
import { AsteroidLocationProvider } from "./LocationProviders/AsteroidLocationProvider";
import ImmobileLocationProvider from "./LocationProviders/ImmobileLocationProvider";
import MoveDownAppearUpLocationProvider from "./LocationProviders/MoveDownAppearUpLocaionProvider";
import SideToSideUpAndDown from "./LocationProviders/SideToSideUpAndDownLocationProvider";
import VanishRightAppearLeftLocationProvider from "./LocationProviders/VanishRightAppearLeftLocationProvider";

/**
 * Module:          EnemyFactory
 * Responsibility:  Creates an enemy.
 */

const {
    pixelSize,
    gameField
} = dimensionProvider();

export default function enemyFactory(enemy: Enemies, location?: GameLocation): BaseEnemy {
    switch (enemy) {
        case "bird": {

            if (location === undefined) {
                throw new Error("Bird enemy requires a location");
            }

            const birdFrames = getBirdFrames().frames;
            const { width, height } = getMaximumFrameDimensions(birdFrames, pixelSize);

            const frameProvider = new BackAndForthFrameProvider(getRandomFrameKeyIndex(birdFrames));

            const randomMovementAngle = getRandomArrayElement(MovementAngles.bird);
            const locationProvider = new SideToSideUpAndDown(location.left, location.top, Speeds.Movement.bird, randomMovementAngle, width, height, gameField.top, gameField.bottom);

            // This may deviate from te original game but I do not care. Each birds will
            // begin to move in a random direction determined by the function below

            return new BirdEnemy(FrameTimes.bird, locationProvider, frameProvider, getExplosion01, getBirdFrames);
        }

        case "robot": {

            if (location === undefined) {
                throw new Error("Robot enemy requires a starting position");
            }

            const { width, height } = getMaximumFrameDimensions(getRobotFrames().frames, pixelSize);
            const { maxBottom } = Locations.Enemies.robot;

            const frameProvider = new BackAndForthFrameProvider(0);
            const locationProvider = new VanishRightAppearLeftLocationProvider(location.left, location.top, Speeds.Movement.robot, MovementAngles.robot, width, height, gameField.top, maxBottom);
            return new RobotEnemy(FrameTimes.robot, locationProvider, frameProvider, getExplosion02, getRobotFrames);
        }

        case "orb": {
            if (location === undefined) {
                throw new Error("Orb enemy requires a starting location");
            }

            const { width, height } = getMaximumFrameDimensions(getOrbFrames().frames, pixelSize);
            const { maxTop, maxBottom } = Locations.Enemies.Orb;

            const frameProvider = new CircleFrameProvider(0);
            const locationProvider = new MoveDownAppearUpLocationProvider(location.left, location.top, Speeds.Movement.orb, MovementAngles.orb, width, height, maxTop, maxBottom);
            return new OrbEnemy(FrameTimes.orb, locationProvider, frameProvider, getExplosion02, getOrbFrames);
        }
        case "spinner": {
            if (location === undefined) {
                throw new Error("Spinner enemy requires a starting location");
            }
            const frames = getSpinnerFrames().frames;
            const { width, height } = getMaximumFrameDimensions(frames, pixelSize);

            const verticalBounds = pixelSize * 6;

            const maxTop = location.top - verticalBounds;
            const maxBottom = location.top + verticalBounds;

            const frameProvider = new CircleFrameProvider(getRandomFrameKeyIndex(frames));
            const randomAngle = getRandomArrayElement(MovementAngles.spinner);
            const locationProvider = new SideToSideUpAndDown(location.left, location.top, Speeds.Movement.spinner, randomAngle, width, height, maxTop, maxBottom);
            return new SpinnerEnemy(FrameTimes.spinner, locationProvider, frameProvider, getExplosion01, getSpinnerFrames);
        }

        case "balloon": {
            if (location === undefined) {
                throw new Error("Balloon enemy requires a starting location");
            }

            const frames = getBalloonFrames().frames;
            const frameProvider = new CircleFrameProvider(getRandomFrameKeyIndex(frames));
            const locationProvider = new ImmobileLocationProvider(location.left, location.top);
            return new BalloonEnemy(FrameTimes.balloon, getBalloonFrames, getExplosion03, locationProvider, frameProvider);

        }
        case "asteroid-down": {
            const { width, height } = getMaximumFrameDimensions(getAsteroidFrames().frames);
            const frameProvider = new CircleFrameProvider(0);
            const locationProvider = new AsteroidLocationProvider(width, height, [angles.down], Speeds.Movement.asteroid);
            return new AsteroidEnemy(0, getAsteroidFrames, getExplosion04, locationProvider, frameProvider);
        }
        default:
            throw new Error("Unknown enemy " + enemy);
    }
}