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
import { playerMortality, hitboxesOn } from "./State/Debugging/Actions";
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
                // dispatch(playerMortality("immortal"));

                // dispatch(hitboxesOn(true));
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
            default:
            // StartGame();
        }
    }
};