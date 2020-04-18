/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { BaseEnemyObject } from "../Base/BaseEnemyObject";
import BirdEnemy from "../Enemies/Bird/BirdEnemy";
import { BirdSpawnLocations } from "../Enemies/Bird/BirdSpawnLoctions";
import { drawLevelBannerWithTimeout } from "../GameScreen/LevelBanner";
import GameLocation from "../Models/GameLocation";
import { GameLoop, PlayerFormation, Runner } from "../Modules";
import PlayerShip from "../Player/PlayerShip";
import getShipSpawnLocation from "../Providers/PlayerSpawnLocationProvider";
import { dispatch } from "../State/Store";

/**
 * Module:          Level 01
 * Responsibility:  Define the first level.
 */

export class Level01 {

    public start(): void {

        const enemies = BirdSpawnLocations.map((l) => new BirdEnemy(l, 3));

        dispatch<BaseEnemyObject[]>("setEnemies", enemies);
        dispatch<GameLocation>("setPlayerLocation", getShipSpawnLocation());

        const sub = GameLoop.register(PlayerFormation.run);

        PlayerFormation.formFast(getShipSpawnLocation(), () => {
            sub();
            drawLevelBannerWithTimeout(1, 500, () => {
                dispatch<PlayerShip>("setPlayer", new PlayerShip());
                GameLoop.register(Runner.run);
            });
        });
    }
}