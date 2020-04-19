/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseLevel from "../Base/BaseLevel";
import RobotEnemy from "../Enemies/Robot/RobotEnemy";
import robotSpawnLocationsAndColor from "../Enemies/Robot/RobotSpawnLocationsAndColor";

/**
 * Module:          Level 02
 * Responsibility:  Define the second level.
 */

/**
 * Sets up level 01.
 */
class Level02 extends BaseLevel {
    public start(): void {
        super.start();
        this.enemies = robotSpawnLocationsAndColor.map((lc) => new RobotEnemy(lc.location, 2, 200, lc.color));
        this.begin();
    }
}

export default Level02;