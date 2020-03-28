/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Index
 * Responsibility:  Entry point for the game
 */

import CGAColors from "./Constants/CGAColors";
import Drawer from "./Drawer";
import BirdEnemy from "./Enemies/Bird";
import BirdFrames from "./Frames/BirdFrames";
import Player from "./Player/Player";
import DimensionProvider from "./Providers/DimensionProvider";
import { registerListeners } from "./Handlers/KeyboardStateHandler/KeyboardStateHandler";
import RenderFrame from "./Render/RenderFrame";
import ScoreBoard from "./ScoreBoard/ScoreBoard";
import { setRandomFrameColors } from "./Utility/Lib";

window.onload = () => {

    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (canvas) {
        // Initialize the dimentions of the canvas.
        canvas.width = DimensionProvider().fullWidth;
        canvas.height = DimensionProvider().fullHeight;

        switch (window.location.search.replace("?", "")) {
            case "player": {

                registerListeners();
                const animator = new Drawer();
                const player = new Player();

                animator.register(player);
                animator.start();

                break;
            }
            case "bird": {
                const animator = new Drawer();
                const bird = new BirdEnemy();
                animator.register(bird);

                animator.start();
                break;
            }

            case "renderTest":
                setRandomFrameColors(BirdFrames, [CGAColors.green]);

                RenderFrame({ left: 10, top: 10 }, BirdFrames.F0);
                RenderFrame({ left: 10, top: 50 }, BirdFrames.F1);
                RenderFrame({ left: 10, top: 100 }, BirdFrames.F2);
                RenderFrame({ left: 10, top: 150 }, BirdFrames.F3);

                break;

            case "scoreboard": {
                const animator = new Drawer();
                const scoreboard = new ScoreBoard();

                (window as any).r42 = {
                    updateScore: (score: number) => scoreboard.updateScore(score),
                    addToScore: (score: number) => scoreboard.addToScore(score),
                };

                animator.register(scoreboard);

                animator.start();

                break;
            }

            default:
            // StartGame();
        }
    }
};