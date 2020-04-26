/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Index
 * Responsibility:  Entry point for the game
 */

import { drawStatusBar } from "./GameScreen/StatusBar";
import subscribeToStoreChanges from "./Levels/SubscribeToStore";
import GameLoop from "./Main/GameLoop";
import playerRunner from "./Main/PlayerRunner";
import PlayerFormationPart from "./Player/PlayerFormationPart";
import dimensionProvider from "./Providers/DimensionProvider";
import renderFrame from "./Render/RenderFrame";
import { dispatch } from "./State/Store";
import { registerListeners } from "./Utility/KeyboardEvents";
import playerSpawnManager from "./Player/PlayerSpawnManager";

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
                dispatch<boolean>("playerImmortal", true);

                dispatch<number>("setLives", 2);
                dispatch<number>("setLevel", level);
                GameLoop.Start();

                (window as any).r42 = {
                    setLevel: (n: number) => dispatch<number>("setLevel", n),
                    nextLevel: () => dispatch("nextLevel"),
                    godMode: () => dispatch("playerImmortal"),
                    normalMode: () => dispatch("playerMortal"),
                    setPhasers: (n: number) => dispatch<number>("setPhasers", n),
                    setLives: (n: number) => dispatch<number>("setLives", n),
                    increaseScore: (n: number) => dispatch<number>("increaseScore", n),
                };

                break;
            }
            default:
            // StartGame();
        }
    }
};