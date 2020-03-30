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
import BirdEnemy from "./Enemies/Bird";
import BirdFrames from "./Frames/BirdFrames";
import { LevelIndicator } from "./GameScreen/LevelIndicator";
import Lives from "./GameScreen/Lifes";
import ScoreBoard from "./GameScreen/ScoreBoard";
import { registerListeners } from "./Handlers/KeyboardStateHandler/KeyboardStateHandler";
import Player from "./Player/Player";
import DimensionProvider from "./Providers/DimensionProvider";
import renderFrame from "./Render/RenderFrame";
import Runner from "./Runner";
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
                const player = new Player();
                const bird = new BirdEnemy();

                const lives = new Lives();
                const scoreboard = new ScoreBoard();
                const levelIndicator = new LevelIndicator();

                Runner.registerPlayer(player);
                Runner.register(bird);
                Runner.registerDrawable(scoreboard);
                Runner.registerDrawable(lives);
                Runner.registerDrawable(scoreboard);

                // player starts with two lives by default.
                lives.setLives(2);

                (window as any).r42 = {
                    updateScore: (n: number) => scoreboard.updateScore(n),
                    addToScore: (n: number) => scoreboard.addToScore(n),
                    setLives: (n: number) => lives.setLives(n),
                    addLife: () => lives.addLife(),
                    setLevel: (n: number) => levelIndicator.setLevel(n),
                    addLevel: () => levelIndicator.addLevel(),
                };

                Runner.get().start();

                break;
            }

            case "renderTest":
                setRandomFrameColors(BirdFrames, [CGAColors.green]);

                renderFrame({ left: 10, top: 10 }, BirdFrames.F0);
                renderFrame({ left: 10, top: 50 }, BirdFrames.F1);
                renderFrame({ left: 10, top: 100 }, BirdFrames.F2);
                renderFrame({ left: 10, top: 150 }, BirdFrames.F3);

                break;

            default:
            // StartGame();
        }
    }
};