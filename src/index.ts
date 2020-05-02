/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import GameLoop from "./GameLoop";
import { drawStatusBar } from "./GameScreen/StatusBar";
import subscribeToStoreChanges from "./Levels/SubscribeToStore";
import playerSpawnManager from "./Player/PlayerSpawnManager";
import ctxProvider from "./Providers/CtxProvider";
import dimensionProvider from "./Providers/DimensionProvider";
import playerRunner from "./Runners/PlayerRunner";
import { hitboxesOn, playerMortality } from "./State/Debugging/Actions";
import { addPhaser, increaseScore, nextLevel, setLevel, setLives, setPhasers } from "./State/Game/Actions";
import { dispatch } from "./State/Store";
import { registerListeners } from "./Utility/KeyboardEvents";

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

        switch (window.location.search.replace("?", "")) {
            case "playground": {

                let level = 0;
                if (window.location.hash && window.location.hash.indexOf("level") > -1) {
                    level = parseInt(window.location.hash.split("=")[1], 10);
                }

                subscribeToStoreChanges();
                registerListeners();

                GameLoop.registerBackgroundDrawing(drawStatusBar);
                GameLoop.registerUpdateState(playerRunner);
                GameLoop.registerUpdateState(playerSpawnManager);
                dispatch(playerMortality("immortal"));

                dispatch(hitboxesOn(true));
                dispatch(setLives(2));
                dispatch(setLevel(level));
                dispatch(setPhasers(1));
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
                    showHitboxes: (b: boolean) => dispatch(hitboxesOn(b)),
                };

                break;
            }
            case "canvas":
                // canvas testing
                const ctx = ctxProvider();

                // Green.
                ctx.fillStyle = "#00AA00";

                (window as any).r42 = ctx;

                break;
            default:
                startGame();
        }
    }
};

function startGame(): void {
    subscribeToStoreChanges();
    registerListeners();

    dispatch(setPhasers(1));
    dispatch(setLives(2));

    GameLoop.registerBackgroundDrawing(drawStatusBar);
    GameLoop.registerUpdateState(playerRunner);
    GameLoop.registerUpdateState(playerSpawnManager);
    dispatch(playerMortality("mortal"));

    dispatch(setLevel(1));
    GameLoop.Start();
}