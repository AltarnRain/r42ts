/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Index
 * Responsibility:  Entry point for the game
 */

import { drawBackground } from "./GameScreen/StaticRenders";
import { drawStatusBar } from "./GameScreen/StatusBar";
import subscribeToLevelChange from "./Levels/LevelManager";
import GameLoop from "./Main/GameLoop";
import playerRunner from "./Main/PlayerRunner";
import GameLocation from "./Models/GameLocation";
import PlayerFormationPart from "./Player/PlayerFormationPart";
import { PlayerFormationFrames } from "./Player/PlayerFrames";
import playerSpawnManager from "./Player/PlayerSpawnManager";
import DimensionProvider from "./Providers/DimensionProvider";
import renderFrame from "./Render/RenderFrame";
import { dispatch } from "./State/Store";
import { registerListeners } from "./Utility/KeyboardEvents";
import { getLocation } from "./Utility/Location";

window.onload = () => {

    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (canvas) {
        // Initialize the dimentions of the canvas.
        canvas.width = DimensionProvider().fullWidth;
        canvas.height = DimensionProvider().fullHeight;

        switch (window.location.search.replace("?", "")) {
            case "playground": {
                subscribeToLevelChange();
                registerListeners();

                GameLoop.registerBackgroundDrawing(drawStatusBar);
                GameLoop.registerBackgroundDrawing(drawBackground);
                GameLoop.registerUpdateState(playerSpawnManager);
                GameLoop.registerUpdateState(playerRunner);
                // GameLoop.registerUpdateState(calcFPS);

                dispatch<number>("setLives", 10);
                dispatch<number>("setPhasers", 30);
                dispatch<number>("setLevel", 2);
                GameLoop.Start();
                break;
            }
            default:
            // StartGame();
        }
    }
};

function calcFPS(opts: any) {
    const requestFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame;

    if (!requestFrame) {
        return true
            ;
    }
    // Check if "true" is returned;
    // pick default FPS, show error, etc...
    function checker(): void {
        if (index--) {
            requestFrame(checker);
        } else {
            // var result = 3*Math.round(count*1000/3/(performance.now()-start));
            const result = count * 1000 / (performance.now() - start);
            if (typeof opts.callback === "function") {
                opts.callback(result);
            }

            // tslint:disable-next-line: no-console
            console.log("Calculated: " + result + " frames per second");
        }
    }
    if (!opts) {
        opts = {};
    }

    const count = opts.count || 60;
    let index = count;
    const start = performance.now();
    checker();
}

/**
 * Uses the player formation part to draw a block on the screen
 * 4 other blocks should converge on this block and stop moving when they overlap.
 */
function testAngleCalculation(): void {
    const target = { top: 500, left: 700 };
    const p1 = new PlayerFormationPart({ top: 500, left: 100 }, target, PlayerFormationFrames.F0, 1);
    const p2 = new PlayerFormationPart({ top: 500, left: 1300 }, target, PlayerFormationFrames.F0, 1);
    const p3 = new PlayerFormationPart({ top: 100, left: 700 }, target, PlayerFormationFrames.F0, 1);
    const p4 = new PlayerFormationPart({ top: 800, left: 700 }, target, PlayerFormationFrames.F0, 1);
    GameLoop.registerUpdateState(p1.updateState);
    GameLoop.registerUpdateState(p1.draw);
    GameLoop.registerUpdateState(p2.updateState);
    GameLoop.registerUpdateState(p2.draw);
    GameLoop.registerUpdateState(p3.updateState);
    GameLoop.registerUpdateState(p3.draw);
    GameLoop.registerUpdateState(p4.updateState);
    GameLoop.registerUpdateState(p4.draw);
    GameLoop.registerUpdateState((tick) => renderFrame(target, PlayerFormationFrames.F0));
}
