/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { BaseEnemyObject } from "../Base/BaseEnemyObject";
import BirdEnemy from "../Enemies/Bird/BirdEnemy";
import { BirdSpawnLocations } from "../Enemies/Bird/BirdSpawnLoctions";
import { drawLevelBanner } from "../GameScreen/LevelBanner";
import GameLocation from "../Models/GameLocation";
import { GameLoop, PlayerSpawnManager, Runner } from "../Modules";
import { PlayerFrame } from "../Player/PlayerFrames";
import PlayerShip from "../Player/PlayerShip";
import getShipSpawnLocation from "../Providers/PlayerSpawnLocationProvider";
import renderFrame from "../Render/RenderFrame";
import { dispatch } from "../State/Store";
import { convertFrameColor } from "../Utility/Frame";
import { cloneObject } from "../Utility/Lib";
import { drawGameFieldBorder, clearGameFieldBackground } from "../GameScreen/StaticRenders";

/**
 * Module:          Level 01
 * Responsibility:  Define the first level.
 */

const frame = cloneObject(PlayerFrame);
convertFrameColor(frame);

export class Level01 {

    public start(): void {

        GameLoop.registerStatic(clearGameFieldBackground);
        GameLoop.registerStatic(drawGameFieldBorder);

        const enemies = BirdSpawnLocations.map((l) => new BirdEnemy(l, 3));

        dispatch<GameLocation>("setPlayerLocation", getShipSpawnLocation());
        dispatch<number>("setLevel", 1);

        const levelSub = GameLoop.registerStatic(() => drawLevelBanner(1));

        window.setTimeout(() => {
            levelSub();
            dispatch<BaseEnemyObject[]>("setEnemies", enemies);
        }, 1000);
    }
}