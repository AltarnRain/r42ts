/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseEnemy from "../Base/BaseEnemy";
import { angles, extraAngles, getAngles } from "../Constants/Angles";
import CGAColors from "../Constants/CGAColors";
import { ColorSchemes, FrameTimes, Locations, MovementAngles, Points } from "../Constants/Constants";
import Enemies from "../Enemies";
import { AsteroidEnemy } from "../Enemies/Asteroid/AsteroidEnemy";
import { getAsteroidOffsetFrames } from "../Enemies/Asteroid/GetAsteroidOffsetFrames";
import getBalloonOffsetFrames from "../Enemies/Balloon/GetBalloonOffsetFrames";
import getBatExplosiom from "../Enemies/Bats/GetBatExplosion";
import getBatOffsetFrames from "../Enemies/Bats/GetBatOffsetFrames";
import BirdEnemy from "../Enemies/Bird/BirdEnemy";
import getBirdOffsetFrames from "../Enemies/Bird/GetBirdOffsetFrames";
import getBoatOffsetFrames from "../Enemies/Boat/GetBoatOffsetFrames";
import getCloakingOrbOffsetFrames from "../Enemies/CloakingOrb/GetCloakingOrbOffsetFrames";
import getCrapOffsetFrames from "../Enemies/Crab/GetCrabOffsetFrames";
import DefaultEnemy from "../Enemies/DefaultEnemy";
import getDevilExplosion from "../Enemies/Devil/DevilExplosion";
import getDevilOffsetFrames from "../Enemies/Devil/GetDevilOffsetFrames";
import getDiaboloOffsetFrames from "../Enemies/Diabolo/GetDiaboloOffsetFrames";
import DirectionFrameEnemy from "../Enemies/DirectionFrameEnemy";
import { FishEnemy } from "../Enemies/Fish/FishEnemy";
import getFishExplosiom from "../Enemies/Fish/GetFishExplosion";
import getFishOffsetFrames from "../Enemies/Fish/GetFishOffsetFrames";
import getOrbOffsetFrames from "../Enemies/Orb/GetOrbOffsetFrames";
import OrbEnemy from "../Enemies/Orb/OrbEnemy";
import getPistonOffsetFrames from "../Enemies/Piston/GetPistonOffsetFrames";
import getRobotOffsetFrames from "../Enemies/Robot/GetRobotOffsetFrames";
import getSpaceMonsterOffsetFrames from "../Enemies/SpaceMonster/SpaceMonster";
import SpaceMonster from "../Enemies/SpaceMonster/SpaceMonsterEnemy";
import getSpinnerOffsetFrames from "../Enemies/Spinner/GetSpinnerOffsetFrames";
import BackAndForthFrameProvider from "../FrameProviders/BackAndForthFrameProvider";
import CircleFrameProvider from "../FrameProviders/CircleFrameProvider";
import ILocationProvider from "../Interfaces/ILocationProvider";
import AngleBounceLocationProvider from "../LocationProviders/AngleBounceLocationProvider";
import AttackerLocationProvider from "../LocationProviders/AttackerLocationProvider";
import CloakingOrbLocationProvider from "../LocationProviders/CloakingOrbLocationProvider";
import CrabLocationProvider from "../LocationProviders/CrabLocationProvider";
import MoveToUpDownMaxThenReset from "../LocationProviders/MoveToMaxThenReset";
import RandomReapperance from "../LocationProviders/RandomReapperance";
import SideAppearOtherSide from "../LocationProviders/SideAppearOtherSide";
import SideAppearOtherSideVariesSpeed from "../LocationProviders/SideAppearOtherSideVariesSpeed";
import Wobble from "../LocationProviders/Wobble";
import GameLocation from "../Models/GameLocation";
import getExplosion01 from "../SharedFrames/GetExplosion01";
import getExplosion02 from "../SharedFrames/GetExplosion02";
import getExplosion03 from "../SharedFrames/GetExplosion03";
import getExplosion04 from "../SharedFrames/GetExplosion04";
import getExplosion05 from "../SharedFrames/GetExplosion05";
import { appState } from "../State/Store";
import { getRandomArrayElement } from "../Utility/Array";
import { getRandomFrameKeyIndex } from "../Utility/Frame";
import { coinFlip } from "../Utility/Lib";
import dimensionProvider from "./DimensionProvider";

/**
 * Module:          EnemyFactory
 * Responsibility:  Creates an enemy.
 */

const {
    pixelSize,
    gameField
} = dimensionProvider();

export default function enemyFactory(enemy: Enemies, location?: GameLocation, index?: number): BaseEnemy {
    switch (enemy) {
        case "bird":
        case "bird-fire": {

            if (location === undefined) {
                throw new Error("Bird enemy requires a location");
            }

            const resource = getBirdOffsetFrames();
            const { maxSizes: { width, height } } = resource;

            const frameProvider = new BackAndForthFrameProvider(getRandomFrameKeyIndex(resource.frames));
            const randomMovementAngle = getRandomArrayElement(MovementAngles.bird);
            const locationProvider = new AngleBounceLocationProvider(
                location.left,
                location.top,
                () => appState().speedState.movement.bird,
                randomMovementAngle,
                width,
                height,
                gameField.top,
                gameField.bottom);

            return new BirdEnemy(FrameTimes.bird, getBirdOffsetFrames, getExplosion01, locationProvider, frameProvider);
        }

        case "robot":
        case "robots-random": {

            if (location === undefined) {
                throw new Error("Robot enemy requires a starting position");
            }

            const { maxSizes: { width, height }, frames } = getRobotOffsetFrames();

            let locationProvider: ILocationProvider;

            const frameProvider = new BackAndForthFrameProvider(enemy === "robot" ? 0 : getRandomFrameKeyIndex(frames));
            locationProvider = new SideAppearOtherSide(
                location.left,
                location.top,
                () => appState().speedState.movement.robot,
                enemy === "robot" ? MovementAngles.robot : angles.right,
                width,
                height,
                gameField.top,
                Locations.robot.maxBottom);

            const robotColor = getRandomArrayElement(ColorSchemes.Enemies.robot);

            return new DefaultEnemy(
                Points.robot,
                FrameTimes.robot,
                getRobotOffsetFrames,
                getExplosion02,
                locationProvider,
                frameProvider,
                { explosionColor: robotColor, explosionParticleColor: robotColor, varyingEnemyColor: robotColor }
            );
        }

        case "orb":
        case "orb-up-down": {
            if (location === undefined) {
                throw new Error("Orb enemy requires a starting location");
            }

            if (index === undefined && enemy === "orb-up-down") {
                throw new Error("Orb-up-down requires an index");
            }

            const { maxSizes: { width, height } } = getOrbOffsetFrames();

            const frameProvider = new CircleFrameProvider(0);

            let angle = angles.down;
            let target = Locations.Orb.maxBottom;
            let reset = Locations.Orb.maxTop;

            if (enemy === "orb-up-down" && index !== undefined) {
                const even = index % 2 === 0;
                angle = even ? angles.down : angles.up;
                target = even ? gameField.bottom : gameField.top;
                reset = even ? gameField.top : gameField.bottom;
            }

            const locationProvider = new MoveToUpDownMaxThenReset(
                location.left,
                location.top,
                () => appState().speedState.movement.orb,
                angle,
                width,
                height,
                target,
                reset);

            return new OrbEnemy(FrameTimes.orb, getOrbOffsetFrames, getExplosion02, locationProvider, frameProvider);
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
            const locationProvider = new AngleBounceLocationProvider(
                location.left,
                location.top,
                () => appState().speedState.movement.spinner,
                randomAngle,
                width,
                height,
                maxTop,
                maxBottom);

            return new DefaultEnemy(
                Points.spinner,
                FrameTimes.spinner,
                getSpinnerOffsetFrames,
                getExplosion01,
                locationProvider,
                frameProvider,
                { explosionColor: CGAColors.white, explosionParticleColor: CGAColors.white });
        }

        case "balloon": {
            if (location === undefined) {
                throw new Error("Balloon enemy requires a starting location");
            }

            const { frames, maxSizes: { width, height } } = getBalloonOffsetFrames();
            const frameProvider = new CircleFrameProvider(getRandomFrameKeyIndex(frames));
            const locationProvider = new Wobble(location.left, location.top, () => appState().speedState.movement.balloon, 0, width, height, 200);

            return new DefaultEnemy(
                Points.balloon,
                FrameTimes.balloon,
                getBalloonOffsetFrames,
                getExplosion03,
                locationProvider,
                frameProvider);
        }
        case "asteroid-down":
        case "asteroid-diagonal": {
            const { maxSizes: { width, height } } = getAsteroidOffsetFrames();
            const frameProvider = new CircleFrameProvider(0);

            let anglesToUse: number[];
            let speedsToUse: () => number[];
            if (enemy === "asteroid-down") {
                anglesToUse = [angles.down];
                speedsToUse = () => appState().speedState.movement.Asteroid.down;
            } else {
                anglesToUse = [extraAngles.leftleftdown, angles.leftdown, angles.down, angles.rightdown, extraAngles.rightrightdown];
                speedsToUse = () => appState().speedState.movement.Asteroid.diagonal;
            }

            const locationProvider = new RandomReapperance(width, height, anglesToUse, speedsToUse);

            // Astroids don't change frames over time, they change frames when they're hit.
            return new AsteroidEnemy(0, getAsteroidOffsetFrames, getExplosion04, locationProvider, frameProvider);
        }

        case "piston": {
            if (location === undefined) {
                throw new Error("Balloon enemy requires a starting location");
            }

            const { maxSizes: { width, height } } = getPistonOffsetFrames();
            const frameProvider = new BackAndForthFrameProvider(0);

            const locationProvider = new SideAppearOtherSideVariesSpeed(
                location.left,
                location.top,
                MovementAngles.piston,
                height,
                width,
                gameField.top,
                gameField.bottom,
                frameProvider,
                () => appState().speedState.movement.Piston.slow,
                () => appState().speedState.movement.Piston.fast,
                [0, 1, 2],
                [3, 4]);

            return new DefaultEnemy(
                Points.piston,
                FrameTimes.piston,
                getPistonOffsetFrames,
                getExplosion02,
                locationProvider,
                frameProvider,
                { explosionColor: CGAColors.magenta, explosionParticleColor: CGAColors.magenta });
        }

        case "diabolo":
        case "diabolo-hard": {
            if (location === undefined) {
                throw new Error("Diabolo enemy requires a starting location");
            }

            const { maxSizes: { width, height }, frames } = getDiaboloOffsetFrames();
            const frameProvider = new CircleFrameProvider(getRandomFrameKeyIndex(frames));

            let locationProvider: ILocationProvider;

            if (enemy === "diabolo") {
                const randomAngle = getRandomArrayElement(MovementAngles.diabolo);
                locationProvider = new AngleBounceLocationProvider(
                    location.left,
                    location.top,
                    () => appState().speedState.movement.diabolo,
                    randomAngle,
                    width,
                    height,
                    gameField.top,
                    gameField.bottom
                );
            } else {
                const heads = coinFlip();
                if (heads) {
                    // Left or right
                    const randomAngle = getRandomArrayElement(MovementAngles.diaboloHardLeftRight);

                    locationProvider = new AngleBounceLocationProvider(
                        location.left,
                        location.top,
                        () => appState().speedState.movement.diabolo,
                        randomAngle,
                        width,
                        height,
                        gameField.top,
                        gameField.bottom);
                } else {
                    // Up and down.
                    const randomAngle = getRandomArrayElement(MovementAngles.diaboloHardUpDown);

                    locationProvider = new AngleBounceLocationProvider(
                        location.left,
                        location.top,
                        () => appState().speedState.movement.diabolo,
                        randomAngle,
                        width,
                        height,
                        gameField.top,
                        gameField.bottom);
                }
            }

            return new DefaultEnemy(
                Points.diabolo,
                FrameTimes.diabolo,
                getDiaboloOffsetFrames,
                getExplosion01,
                locationProvider,
                frameProvider,
                { explosionColor: CGAColors.white, explosionParticleColor: CGAColors.white });
        }

        case "spacemonster-down":
        case "spacemonster-diagonal": {
            let anglesToUse: number[];
            let speedsToUse: () => number[];
            if (enemy === "spacemonster-down") {
                anglesToUse = [angles.down];
                speedsToUse = () => appState().speedState.movement.SpaceMonster.down;
            } else {
                anglesToUse = [extraAngles.leftleftdown, angles.leftdown, angles.down, angles.rightdown, extraAngles.rightrightdown];
                speedsToUse = () => appState().speedState.movement.SpaceMonster.diagonal;
            }

            const { maxSizes: { width, height } } = getSpaceMonsterOffsetFrames();
            const frameProvider = new CircleFrameProvider(0);
            const locationProvider = new RandomReapperance(width, height, anglesToUse, speedsToUse);

            // Space monsters do not change frames over time, they change frame depending on their position on the screen.
            return new SpaceMonster(0, getSpaceMonsterOffsetFrames, getExplosion05, locationProvider, frameProvider);
        }

        case "devil": {
            if (location === undefined) {
                throw new Error("Devil enemy requires a starting location");
            }

            const { maxSizes: { width, height }, frames } = getDevilOffsetFrames();
            const frameProvider = new CircleFrameProvider(getRandomFrameKeyIndex(frames));

            const locationProvider = new AttackerLocationProvider(
                location.left,
                location.top,
                () => appState().speedState.movement.devil,
                MovementAngles.devil,
                width,
                height,
                gameField.top,
                Locations.Devil.maxBottom,
            );

            // Frames have no time, the frame of the devil is determined by where it is headed.
            return new DirectionFrameEnemy(Points.devil, getDevilOffsetFrames, getDevilExplosion, locationProvider, frameProvider);
        }

        case "crab": {
            if (location === undefined) {
                throw new Error("Crap enemy requires a starting location");
            }

            const { maxSizes: { height } } = getCrapOffsetFrames();
            const frameProvider = new BackAndForthFrameProvider(0);

            const locationProvider = new CrabLocationProvider(
                location.left,
                location.top,
                () => appState().speedState.movement.crab,
                height,
                frameProvider);

            return new DefaultEnemy(
                Points.crab,
                FrameTimes.crab,
                getCrapOffsetFrames,
                getExplosion02,
                locationProvider,
                frameProvider,
                { explosionColor: CGAColors.magenta, explosionParticleColor: CGAColors.magenta });
        }

        case "bat": {
            if (location === undefined) {
                throw new Error("Bats enemy requires a starting location");
            }

            const { maxSizes: { width, height } } = getBatOffsetFrames();
            const frameProvider = new BackAndForthFrameProvider(0);

            const randomAngle = getRandomArrayElement(getAngles());
            const locationProvider = new Wobble(
                location.left,
                location.top,
                () => appState().speedState.movement.bat,
                randomAngle,
                width,
                height,
                200);

            const color = coinFlip() ? CGAColors.lightGreen : CGAColors.lightBlue;

            return new DefaultEnemy(
                Points.bat,
                FrameTimes.bat,
                getBatOffsetFrames,
                getBatExplosiom,
                locationProvider,
                frameProvider,
                { explosionColor: CGAColors.lightGray, explosionParticleColor: CGAColors.lightGray, varyingEnemyColor: color });
        }

        case "boat": {
            if (location === undefined) {
                throw new Error("Boat enemy requires a starting location");
            }

            const { maxSizes: { width, height } } = getBoatOffsetFrames();
            const frameProvider = new CircleFrameProvider(0);

            const locationProvider = new SideAppearOtherSideVariesSpeed(
                location.left,
                location.top,
                extraAngles.rightrightdown,
                height,
                width,
                gameField.top,
                gameField.bottom,
                frameProvider,
                () => appState().speedState.movement.Boat.slow,
                () => appState().speedState.movement.Boat.fast,
                [0, 1, 5],
                [2, 3, 4]);

            return new DefaultEnemy(
                Points.boat,
                FrameTimes.boat,
                getBoatOffsetFrames,
                getExplosion02,
                locationProvider,
                frameProvider,
                { explosionColor: CGAColors.magenta, explosionParticleColor: CGAColors.magenta });
        }

        case "cloaking-orb": {
            if (location === undefined) {
                throw new Error("Cloaking Orb enemy requires a starting location");
            }

            const { frames } = getCloakingOrbOffsetFrames();
            const frameProvider = new BackAndForthFrameProvider(getRandomFrameKeyIndex(frames));

            // 2nd to last frame is completely invisible. That's when the orb can switch location
            // It will appear 'invisible' on its new location and reappear.
            // It can still be hit while it is 'invisible' (because hitboxes are generated and, meh, its fine).
            const locationProvider = new CloakingOrbLocationProvider(location.left, location.top, frames.length - 2, frameProvider);

            const color = getRandomArrayElement(ColorSchemes.Enemies.cloakingOrb);

            return new DefaultEnemy(
                Points.cloakingOrb,
                FrameTimes.cloakingOrb,
                getCloakingOrbOffsetFrames,
                getExplosion02,
                locationProvider,
                frameProvider,
                { explosionColor: color, explosionParticleColor: color, varyingEnemyColor: color });
        }

        case "fish": {
            if (location === undefined) {
                throw new Error("Fishb enemy requires a starting location");
            }

            const { maxSizes: { width, height }, frames } = getFishOffsetFrames();
            const frameProvider = new CircleFrameProvider(getRandomFrameKeyIndex(frames));

            const locationProvider = new AttackerLocationProvider(
                location.left,
                location.top,
                () => appState().speedState.movement.devil,
                MovementAngles.devil,
                width,
                height,
                gameField.top,
                Locations.Devil.maxBottom);

            // fish enemy doesn't have frame times, it picks its frame based on where it is heading.
            return new FishEnemy(
                Points.fish,
                getFishOffsetFrames,
                getFishExplosiom,
                locationProvider,
                frameProvider);
        }

        default:
            throw new Error("Unknown enemy " + enemy);
    }
}