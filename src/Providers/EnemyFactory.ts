/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseEnemy from "../Base/BaseEnemy";
import { angles } from "../Constants/Angles";
import { FrameTimes, Locations, MovementAngles, Speeds } from "../Constants/Constants";
import { AsteroidEnemy } from "../Enemies/Asteroid/AsteroidEnemy";
import { getAsteroidOffsetFrames } from "../Enemies/Asteroid/GetAsteroidOffsetFrames";
import BalloonEnemy from "../Enemies/Balloon/BalloonEnemy";
import getBalloonOffsetFrames from "../Enemies/Balloon/GetBalloonOffsetFrames";
import BirdEnemy from "../Enemies/Bird/BirdEnemy";
import { default as getBirdOffsetFrames, default as getBirdResource } from "../Enemies/Bird/GetBirdOffsetFrames";
import DevilEnemy from "../Enemies/Devil/DevilEnemy";
import getDevilOffsetFrames from "../Enemies/Devil/GetDevilOffsetFrames";
import getDiaboloOffsetFrames from "../Enemies/Diabolo/GetDiaboloOffsetFrames";
import getOrbResource from "../Enemies/Orb/GetOrbOffsetFrames";
import OrbEnemy from "../Enemies/Orb/OrbEnemy";
import getPistonOffsetFrames from "../Enemies/Piston/GetPistonOffsetFrames";
import PistonEnemy from "../Enemies/Piston/PistonEnemy";
import getRobotResource from "../Enemies/Robot/GetRobotOffsetFrames";
import RobotEnemy from "../Enemies/Robot/RobotEnemy";
import { getSpaceMonsterOffsetFrames } from "../Enemies/SpaceMonster/SpaceMonster";
import { SpaceMonster as SpaceMonsterEnemy } from "../Enemies/SpaceMonster/SpaceMonsterEnemy";
import getSpinnerOffsetFrames from "../Enemies/Spinner/GetSpinnerOffsetFrames";
import SpinnerEnemy from "../Enemies/Spinner/SpinnerEnemy";
import { GameLocation } from "../Models/GameLocation";
import getExplosion01 from "../SharedFrames/Explosion01";
import getExplosion02 from "../SharedFrames/Explosion02";
import getExplosion03 from "../SharedFrames/Explosion03";
import getExplosion04 from "../SharedFrames/Explosion04";
import getExplosion05 from "../SharedFrames/Explosion05";
import { Enemies } from "../Types";
import { getRandomArrayElement } from "../Utility/Array";
import { getRandomFrameKeyIndex } from "../Utility/Frame";
import dimensionProvider from "./DimensionProvider";
import BackAndForthFrameProvider from "./FrameProviders/BackAndForthFrameProvider";
import CircleFrameProvider from "./FrameProviders/CircleFrameProvider";
import AsteroidLocationProvider from "./LocationProviders/AsteroidLocationProvider";
import DevilLocationProvider from "./LocationProviders/DevilLocationProvider";
import MoveDownAppearUpLocationProvider from "./LocationProviders/MoveDownAppearUpLocaionProvider";
import SideAppearOtherSideLocationProvider from "./LocationProviders/SideAppearOtherSideLocationProvider";
import SideAppearOtherSideVariesSpeed from "./LocationProviders/SideAppearOtherSideVariesSpeed";
import SideToSideUpAndDown from "./LocationProviders/SideToSideUpAndDownLocationProvider";
import Wobble from "./LocationProviders/Wobble";

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

            const resource = getBirdOffsetFrames();
            const { maxSizes: { width, height } } = resource;

            const frameProvider = new BackAndForthFrameProvider(getRandomFrameKeyIndex(resource.frames));
            const randomMovementAngle = getRandomArrayElement(MovementAngles.bird);
            const locationProvider = new SideToSideUpAndDown(location.left, location.top, Speeds.Movement.bird, randomMovementAngle, width, height, gameField.top, gameField.bottom);

            return new BirdEnemy(FrameTimes.bird, getBirdResource, getExplosion01, locationProvider, frameProvider);
        }

        case "robot": {

            if (location === undefined) {
                throw new Error("Robot enemy requires a starting position");
            }

            const { maxBottom } = Locations.Enemies.robot;
            const { maxSizes: { width, height } } = getRobotResource();

            const frameProvider = new BackAndForthFrameProvider(0);
            const locationProvider = new SideAppearOtherSideLocationProvider(location.left, location.top, Speeds.Movement.robot, MovementAngles.robot, width, height, gameField.top, maxBottom);
            return new RobotEnemy(FrameTimes.robot, locationProvider, frameProvider, getExplosion02, getRobotResource);
        }

        case "orb": {
            if (location === undefined) {
                throw new Error("Orb enemy requires a starting location");
            }

            const { maxSizes: { width, height } } = getOrbResource();
            const { maxTop, maxBottom } = Locations.Enemies.Orb;

            const frameProvider = new CircleFrameProvider(0);
            const locationProvider = new MoveDownAppearUpLocationProvider(location.left, location.top, Speeds.Movement.orb, MovementAngles.orb, width, height, maxTop, maxBottom);
            return new OrbEnemy(FrameTimes.orb, getOrbResource, getExplosion02, locationProvider, frameProvider);
        }
        case "spinner": {
            if (location === undefined) {
                throw new Error("Spinner enemy requires a starting location");
            }
            const { frames, maxSizes: { width, height } } = getSpinnerOffsetFrames();
            const verticalBounds = pixelSize * 6;

            const maxTop = location.top - verticalBounds;
            const maxBottom = location.top + verticalBounds;

            const frameProvider = new CircleFrameProvider(getRandomFrameKeyIndex(frames));
            const randomAngle = getRandomArrayElement(MovementAngles.spinner);
            const locationProvider = new SideToSideUpAndDown(location.left, location.top, Speeds.Movement.spinner, randomAngle, width, height, maxTop, maxBottom);
            return new SpinnerEnemy(FrameTimes.spinner, getSpinnerOffsetFrames, getExplosion01, locationProvider, frameProvider);
        }

        case "balloon": {
            if (location === undefined) {
                throw new Error("Balloon enemy requires a starting location");
            }

            const { frames, maxSizes: { width, height } } = getBalloonOffsetFrames();
            const frameProvider = new CircleFrameProvider(getRandomFrameKeyIndex(frames));
            const locationProvider = new Wobble(location.left, location.top, Speeds.Movement.balloon, 0, width, height, 200);
            return new BalloonEnemy(FrameTimes.balloon, getBalloonOffsetFrames, getExplosion03, locationProvider, frameProvider);

        }
        case "asteroid-down": {
            const { maxSizes: { width, height } } = getAsteroidOffsetFrames();
            const frameProvider = new CircleFrameProvider(0);
            const locationProvider = new AsteroidLocationProvider(width, height, [angles.down], Speeds.Movement.asteroid);

            // Astroids don't change frames over time, they change frames when they're hit.
            return new AsteroidEnemy(0, getAsteroidOffsetFrames, getExplosion04, locationProvider, frameProvider);
        }

        case "piston": {
            if (location === undefined) {
                throw new Error("Balloon enemy requires a starting location");
            }

            const { maxSizes: { width } } = getPistonOffsetFrames();
            const frameProvider = new BackAndForthFrameProvider(0);

            const locationProvider = new SideAppearOtherSideVariesSpeed(
                location.left,
                location.top,
                MovementAngles.piston,
                width,
                gameField.top,
                gameField.bottom,
                frameProvider,
                Speeds.Movement.Piston.slow,
                Speeds.Movement.Piston.fast,
                [0, 1, 2],
                [3, 4]);

            return new PistonEnemy(FrameTimes.piston, getPistonOffsetFrames, getExplosion02, locationProvider, frameProvider);
        }

        case "diabolo": {
            if (location === undefined) {
                throw new Error("Diabolo enemy requires a starting location");
            }

            const { maxSizes: { width, height }, frames } = getDiaboloOffsetFrames();
            const frameProvider = new CircleFrameProvider(getRandomFrameKeyIndex(frames));

            const randomAngle = getRandomArrayElement(MovementAngles.diabolo);
            const locationProvider = new SideToSideUpAndDown(
                location.left,
                location.top,
                Speeds.Movement.diabolo,
                randomAngle,
                width,
                height,
                gameField.top,
                gameField.bottom
            );

            return new PistonEnemy(FrameTimes.piston, getDiaboloOffsetFrames, getExplosion01, locationProvider, frameProvider);
        }

        case "spacemonster-down": {
            const { maxSizes: { width, height } } = getSpaceMonsterOffsetFrames();
            const frameProvider = new CircleFrameProvider(0);
            const locationProvider = new AsteroidLocationProvider(width, height, [angles.down], Speeds.Movement.asteroid);

            // Space monsters do not change frames over time, they change frame depending on their position on the screen.
            return new SpaceMonsterEnemy(0, getSpaceMonsterOffsetFrames, getExplosion05, locationProvider, frameProvider);
        }

        case "devil": {
            if (location === undefined) {
                throw new Error("Devil enemy requires a starting location");
            }

            const { maxSizes: { width, height }, frames } = getDevilOffsetFrames();
            const frameProvider = new CircleFrameProvider(getRandomFrameKeyIndex(frames));

            const locationProvider = new DevilLocationProvider(
                location.left,
                location.top,
                Speeds.Movement.devil,
                MovementAngles.devil,
                width,
                height,
                gameField.top,
                Locations.Enemies.Devil.maxBottom,
            );

            // Frames have no time, the frame of the devil is determined by where it is headed.
            return new DevilEnemy(0, getDevilOffsetFrames, getExplosion01, locationProvider, frameProvider);
        }

        default:
            throw new Error("Unknown enemy " + enemy);
    }
}