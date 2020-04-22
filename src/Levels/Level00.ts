/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseLevel from "../Base/BaseLevel";
import CGAColors from "../Constants/CGAColors";
import orbFrames from "../Enemies/Orb/OrbFrames";
import GameLoop from "../Main/GameLoop";
import PlayerShip from "../Player/PlayerShip";
import renderFrame from "../Render/RenderFrame";
import { dispatch } from "../State/Store";
import { Frames } from "../Types/Types";
import { convertChangingFrameColors } from "../Utility/Frame";
import { cloneObject } from "../Utility/Lib";

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

        const frames: Frames = [];

        const colors: string[][] = [
            [CGAColors.lightGreen, CGAColors.lightBlue],
            [CGAColors.brown, CGAColors.lightGreen],
            [CGAColors.lightBlue, CGAColors.white],
            [CGAColors.white, CGAColors.brown],
        ];

        for (let index = 0; index < colors.length; index++) {
            const element = orbFrames.frames[0];
            const cf = cloneObject(element);
            convertChangingFrameColors(cf, colors[index]);
            frames.push(cf);
        }

        // this.enemies = robotSpawnLocationsAndColor.map((lc) =>
        //     new RobotEnemy(lc.location,
        //         150,
        //         lc.color,
        //         new VanishRightAppearLeft(1.5, 0),
        //         robotCanFire));
        // dispatch<GameLocation>("setPlayerLocation", getShipSpawnLocation());

        GameLoop.registerBackgroundDrawing(() => {
            let left = 500;

            frames.forEach((f) => {
                renderFrame({left, top: 500}, f);
                left += 50;
            });
        });

        this.begin();
    }
}