/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { drawStatusBar } from "./GameScreen/StatusBar";
import subscribeToStoreChanges from "./Levels/SubscribeToStore";
import GameLoop from "./Main/GameLoop";
import playerRunner from "./Main/PlayerRunner";
import playerSpawnManager from "./Player/PlayerSpawnManager";
import dimensionProvider from "./Providers/DimensionProvider";
import { playerImmortal, playerMortal } from "./State/Debugging/Actions";
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
        canvas.width = dimensionProvider().fullWidth;
        canvas.height = dimensionProvider().fullHeight;

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
                dispatch(playerImmortal());

                dispatch(setLives(2));
                dispatch(setLevel(level));
                dispatch(setPhasers(20));
                GameLoop.Start();

                (window as any).r42 = {
                    setLevel: (n: number) => dispatch(setLevel(n)),
                    nextLevel: () => dispatch(nextLevel()),
                    godMode: () => dispatch(playerImmortal()),
                    normalMode: () => dispatch(playerMortal()),
                    setPhasers: (n: number) => dispatch(setPhasers(n)),
                    setLives: (n: number) => dispatch(setLives(n)),
                    increaseScore: (n: number) => dispatch(increaseScore(n)),
                    addPhaser: () => dispatch(addPhaser()),
                };

                break;
            }
            default:
            // StartGame();
        }
    }
};