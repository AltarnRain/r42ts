/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { BaseEnemyObject } from "../Base/BaseEnemyObject";
import BirdEnemy from "../Enemies/Bird/BirdEnemy";
import { BirdSpawnLocations } from "../Enemies/Bird/BirdSpawnLoctions";
import { drawLevelBanner } from "../GameScreen/LevelBanner";
import { clearGameFieldBackground, drawGameFieldBorder } from "../GameScreen/StaticRenders";
import GameLocation from "../Models/GameLocation";
import { GameLoop } from "../Modules";
import { PlayerFrame } from "../Player/PlayerFrames";
import getShipSpawnLocation from "../Providers/PlayerSpawnLocationProvider";
import { dispatch } from "../State/Store";
import { convertFrameColor } from "../Utility/Frame";
import { cloneObject } from "../Utility/Lib";

/**
 * Module:          Level 01
 * Responsibility:  Define the first level.
 */

const frame = cloneObject(PlayerFrame);
convertFrameColor(frame);

export function Level01(): void {

    GameLoop.registerStatic(clearGameFieldBackground);
    GameLoop.registerStatic(drawGameFieldBorder);

    const enemies = BirdSpawnLocations.map((l) => new BirdEnemy(l, 3));

    dispatch<GameLocation>("setPlayerLocation", getShipSpawnLocation());
    dispatch<number>("setLevel", 1);

    dispatch<boolean>("showingLevelBanner", true);
    const levelSub = GameLoop.registerStatic(() => drawLevelBanner(1));

    window.setTimeout(() => {
        levelSub();
        dispatch<boolean>("showingLevelBanner", false);
        dispatch<BaseEnemyObject[]>("setEnemies", enemies);
    }, 1000);
}