/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { DEBUGGING_drawGrid, DEBUGGING_renderHitboxes } from "./Debugging/Debugging";
import GameLoop from "./GameLoop";
import { drawStatusBar } from "./GameScreen/StatusBar";
import subscribeToStoreChanges from "./Levels/SubscribeToStore";
import playerSpawnManager from "./Player/PlayerSpawnManager";
import ctxProvider from "./Providers/CtxProvider";
import dimensionProvider from "./Providers/DimensionProvider";
import genericRunner from "./Runners/GenericRunner";
import playerRunner from "./Runners/PlayerRunner";
import { playerMortality } from "./State/Debugging/DebuggingActions";
import { addPhaser, increaseScore, nextLevel, setLevel, setLives, setPhasers, setWarpGamteComplexity } from "./State/Game/GameActions";
import { WarpLevelComplexity } from "./State/Game/WarpLevelTypes";
import { dispatch } from "./State/Store";
import { registerListeners } from "./Utility/KeyboardEvents";
import { getURLQueryKVPs } from "./Utility/Lib";

/**
 * Module:          Index
 * Responsibility:  Entry point for the game
 */

window.onload = () => {

    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (canvas) {
        // Initialize the dimentions of the canvas.
        canvas.width = dimensionProvider().fullGameWidth;
        canvas.height = dimensionProvider().fullGameHeight;

        const queryKeyValuePairs = getURLQueryKVPs(window.location.search);

        const showPlayGround = queryKeyValuePairs.some((kvp) => kvp.key === "playground");
        const showCanvas = queryKeyValuePairs.some((kvp) => kvp.key === "canvas");
        let level = queryKeyValuePairs.find((kvp) => kvp.key === "level")?.value;
        const drawGrid = queryKeyValuePairs.find((kvp) => kvp.key === "grid");
        const showhitboxes = queryKeyValuePairs.find((kvp) => kvp.key === "hitboxes");
        const immortal = queryKeyValuePairs.find((kvp) => kvp.key === "god");

        if (showPlayGround) {

            if (!level) {
                level = "0";
            }

            subscribeToStoreChanges();
            registerListeners();

            GameLoop.registerBackgroundDrawing(drawStatusBar);
            GameLoop.registerUpdateState(playerRunner);
            GameLoop.registerUpdateState(playerSpawnManager);
            GameLoop.registerUpdateState(genericRunner);

            if (immortal) {
                dispatch(playerMortality("immortal"));
            } else {
                dispatch(playerMortality("mortal"));
            }

            dispatch(setLives(20));
            dispatch(setPhasers(100));

            if (level) {
                dispatch(setLevel(parseInt(level, 10)));
            }

            if (drawGrid) {
                let gridDetail = 1;
                if (drawGrid.value) {
                    gridDetail = parseInt(drawGrid.value, 10);
                }

                GameLoop.registerBackgroundDrawing(() => DEBUGGING_drawGrid(gridDetail));
            }

            if (showhitboxes) {
                GameLoop.registerBackgroundDrawing(() => DEBUGGING_renderHitboxes());
            }

            GameLoop.Start();

            (window as any).r42 = {
                setLevel: (n: number) => dispatch(setLevel(n)),
                nextLevel: () => dispatch(nextLevel()),
                godMode: () => dispatch(playerMortality("immortal")),
                normalMode: () => dispatch(playerMortality("mortal")),
                setPhasers: (n: number) => dispatch(setPhasers(n)),
                setLives: (n: number) => dispatch(setLives(n)),
                increaseScore: (n: number) => dispatch(increaseScore(n)),
                addPhaser: () => dispatch(addPhaser()),
                setWarpLevelComplexity: (n: WarpLevelComplexity) => dispatch(setWarpGamteComplexity(n)),
            };

        } else if (showCanvas) {
            // canvas testing
            const ctx = ctxProvider();

            // Green.
            ctx.fillStyle = "#00AA00";

            (window as any).r42 = ctx;
        } else {
            startGame();
        }
    }
};

function startGame(): void {
    // subscribeToStoreChanges();
    // registerListeners();

    // dispatch(setPhasers(1));
    // dispatch(setLives(2));

    // GameLoop.registerBackgroundDrawing(drawStatusBar);
    // GameLoop.registerUpdateState(playerRunner);
    // GameLoop.registerUpdateState(playerSpawnManager);
    // dispatch(playerMortality("mortal"));

    // dispatch(setLevel(1));
    // GameLoop.Start();
}