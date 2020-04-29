/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { BaseEnemy } from "../Base/BaseEnemy";
import BaseLevel from "../Base/BaseLevel";
import { angles } from "../Constants/Angles";
import orbSpawnLocations from "../Enemies/Orb/OrbEnemiesSpawnLocations";
import OrbEnemy from "../Enemies/Orb/OrbEnemy";
import RobotEnemy from "../Enemies/Robot/RobotEnemy";
import getRobotFrames from "../Enemies/Robot/RobotFrames";
import robotSpawnLocationsAndColor from "../Enemies/Robot/RobotSpawnLocationsAndColor";
import downFireAngleProvider from "../FireAngleProviders/DownAngleProvider";
import { drawBackground } from "../GameScreen/StaticRenders";
import MoveDownAppearUp from "../LocationProviders/MoveDownAppearUp";
import VanishRightAppearLeft from "../LocationProviders/VanishRightAppearLeft";
import enemyLevelRunner from "../Main/EnemyLevelRunner";
import GameLoop from "../Main/GameLoop";
import PlayerShip from "../Player/PlayerShip";
import BackAndForthFrameProvider from "../Providers/BackAndForthFrameProvider";
import CircleFrameProvider from "../Providers/CircleFrameProvider";
import { setEnemies } from "../State/EnemyLevel/Actions";
import { setPlayer } from "../State/Player/Actions";
import { dispatch } from "../State/Store";

/**
 * Module:          Level 00
 * Responsibility:  Define the playground level.
 */

/**
 * Sets up level 00. Play ground level.
 */
export default class Level00 extends BaseLevel {

    constructor(stateManager: any, levelWon: () => boolean) {
        super(stateManager, levelWon);
    }

    public start(): void {
        // super.start();

        // Register the background draw function so it runs in the game loop.
        this.registerSubscription(GameLoop.registerBackgroundDrawing(drawBackground));

        // this.robotFrameAnimationTest();

        // this.orbEnemyAnimationTest();
        dispatch(setPlayer(new PlayerShip()));

        GameLoop.registerUpdateState(enemyLevelRunner);

        // this.begin([], 0);
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
