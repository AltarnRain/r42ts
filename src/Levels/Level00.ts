/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseLevel from "../Base/BaseLevel";
import { drawBackground } from "../GameScreen/StaticRenders";
import GameLoop from "../Main/GameLoop";
import PlayerShip from "../Player/PlayerShip";
import { dispatch } from "../State/Store";
import getRobotFrames from "../Enemies/Robot/RobotFrames";
import RobotEnemy from "../Enemies/Robot/RobotEnemy";
import CGAColors from "../Constants/CGAColors";
import Immobile from "../LocationProviders/Immobile";
import VanishRightAppearLeft from "../LocationProviders/VanishRightAppearLeft";
import BackAndForthFrameProvider from "../Providers/BackAndForthFrameProvider";
import { enemyLevelReducer } from "../State/Reducers/EnemyLevelReducer";
import enemyLevelRunner from "../Main/EnemyLevelRunner";
import robotSpawnLocationsAndColor from "../Enemies/Robot/RobotSpawnLocationsAndColor";
import downFireAngleProvider from "../FireAngleProviders/DownAngleProvider";
import { ImmoboleFrameProvider } from "../Providers/Immobile";
import getOrbFrames from "../Enemies/Orb/OrbFrames";
import OrbEnemy from "../Enemies/Orb/OrbEnemy";
import CircleFrameProvider from "../Providers/CircleFrameProvider";
import orbSpawnLocations from "../Enemies/Orb/OrbEnemiesSpawnLocations";

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

        this.orbEnemyAnimationTest();
        const player = new PlayerShip();
        dispatch("setPlayer", player);

        GameLoop.registerUpdateState(enemyLevelRunner);

        // this.begin([], 0);
    }

    /**
     * Sets up a robot for every robot frame and player their animation without them moving.
     * They do a Wave :D
     */
    private robotFrameAnimationTest() {
        const robotFrames = getRobotFrames();
        const enemies = robotSpawnLocationsAndColor.map((lc, index) => {
            if (index < robotFrames.frames.length) {
                // const frameProvider = new ImmoboleFrameProvider(index);
                const frameProvider  = new BackAndForthFrameProvider(index);
                const LocationProvider = new VanishRightAppearLeft(0, 0);
                return new RobotEnemy(lc.left, lc.top, 150, lc.color, LocationProvider, frameProvider, downFireAngleProvider);
            }
        }).filter((x) => x !== undefined);
        dispatch("setEnemies", enemies);
    }

    private orbEnemyAnimationTest() {
        // const orbFrames = getOrbFrames();
        const enemies = orbSpawnLocations.map((lc) => {
            // if (index < 1) {
                // const frameProvider = new ImmoboleFrameProvider(index);
                const frameProvider  = new CircleFrameProvider(0);
                const LocationProvider = new VanishRightAppearLeft(0, 0);
                return new OrbEnemy(lc.left, lc.top, 200, LocationProvider, frameProvider, downFireAngleProvider);
            // }
        }).filter((x) => x !== undefined);
        dispatch("setEnemies", enemies);
    }
}
