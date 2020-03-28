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
import Lives from "./GameScreen/Lifes";
import ScoreBoard from "./GameScreen/ScoreBoard";
import { registerListeners } from "./Handlers/KeyboardStateHandler/KeyboardStateHandler";
import Player from "./Player/Player";
import DimensionProvider from "./Providers/DimensionProvider";
import RenderFrame from "./Render/RenderFrame";
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
                const drawer = new Drawer();
                const player = new Player();
                const scoreboard = new ScoreBoard();
                const lives = new Lives();

                drawer.register(player);
                drawer.register(scoreboard);
                drawer.register(lives);

                // player starts with two lives by default.
                lives.setLives(2);

                (window as any).r42 = {
                    updateScore: (n: number) => scoreboard.updateScore(n),
                    addToScore: (n: number) => scoreboard.addToScore(n),
                    setLives: (n: number) => lives.setLives(n),
                    addLife: () => lives.addLife(),
                };

                drawer.start();

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

            default:
            // StartGame();
        }
    }
};