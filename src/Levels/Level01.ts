/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BirdEnemy from "../Enemies/Bird/BirdEnemy";
import { BirdSpawnLocations } from "../Enemies/Bird/BirdSpawnLoctions";
import { drawLevelBanner } from "../GameScreen/LevelBanner";
import GameLocation from "../Models/GameLocation";
import { GameLoop, PlayerFormation, Runner } from "../Modules";
import { PlayerFrame } from "../Player/PlayerFrames";
import getShipSpawnLocation from "../Providers/PlayerSpawnLocationProvider";
import renderFrame from "../Render/RenderFrame";
import { appState, dispatch } from "../State/Store";
import { cloneObject } from "../Utility/Lib";
import { convertFrameColor } from "../Utility/Frame";
import PlayerShip from "../Player/PlayerShip";
import { BaseEnemyObject } from "../Base/BaseEnemyObject";

/**
 * Module:          Level 01
 * Responsibility:  Define the first level.
 */

const frame = cloneObject(PlayerFrame);
convertFrameColor(frame);

export class Level01 {

    public start(): void {

        const { playerState } = appState();
        const enemies = BirdSpawnLocations.map((l) => new BirdEnemy(l, 3));

        dispatch<GameLocation>("setPlayerLocation", getShipSpawnLocation());

        const formationSub = GameLoop.register(PlayerFormation.run);
        const levelSub = GameLoop.register(() => drawLevelBanner(1));

        PlayerFormation.formFast(getShipSpawnLocation(), () => {
            formationSub();
            const drawPlayer = GameLoop.register(() => {
                renderFrame(getShipSpawnLocation(), frame);
            });

            window.setTimeout(() => {
                drawPlayer();
                levelSub();
                dispatch<PlayerShip>("setPlayer", new PlayerShip());
                dispatch<BaseEnemyObject[]>("setEnemies", enemies);
                GameLoop.register(Runner.run);
            }, 1000);
        });
    }
}