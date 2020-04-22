/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseLevel from "../Base/BaseLevel";
import RobotEnemy from "../Enemies/Robot/RobotEnemy";
import robotSpawnLocationsAndColor from "../Enemies/Robot/RobotSpawnLocationsAndColor";
import VanishRightAppearLeft from "../LocationProviders/VanishRightAppearLeft";
import GameLocation from "../Models/GameLocation";
import PlayerShip from "../Player/PlayerShip";
import getShipSpawnLocation from "../Providers/PlayerSpawnLocationProvider";
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
        super.start();
        dispatch<PlayerShip>("setPlayer", new PlayerShip());
        this.enemies = [];
        this.enemies = robotSpawnLocationsAndColor.map((lc) =>
            new RobotEnemy(lc.location,
                150,
                lc.color,
                new VanishRightAppearLeft(0, 0),
                robotCanFire));
        dispatch<GameLocation>("setPlayerLocation", getShipSpawnLocation());
        this.begin();
    }
}

function robotCanFire(): boolean {
    return false;
}