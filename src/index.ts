/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Index
 * Responsibility:  Entry point for the game
 */

import BirdEnemy from "./Enemies/Bird/Bird";
import Level from "./GameScreen/Level";
import Lives from "./GameScreen/Lifes";
import ScoreBoard from "./GameScreen/ScoreBoard";
import { registerListeners } from "./Handlers/KeyboardStateHandler/KeyboardStateHandler";
import Player from "./Player/Player";
import DimensionProvider from "./Providers/DimensionProvider";
import Runner from "./Runner";

window.onload = () => {

    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (canvas) {
        // Initialize the dimentions of the canvas.
        canvas.width = DimensionProvider().fullWidth;
        canvas.height = DimensionProvider().fullHeight;

        switch (window.location.search.replace("?", "")) {
            case "playground": {

                registerListeners();
                const player = new Player();

                for (let i = 0; i < 20; i ++){

                    const bird = new BirdEnemy();
                    Runner.get().register(bird);
                }

                const lives = new Lives();
                const scoreboard = new ScoreBoard();
                const levelIndicator = new Level();

                Runner.get().registerPlayer(player);
                Runner.get().registerScore(scoreboard);
                Runner.get().registerLives(lives);
                Runner.get().registerLevelIndicator(levelIndicator);

                // player starts with two lives by default.
                lives.setLives(2);

                (window as any).r42 = {
                    updateScore: (n: number) => scoreboard.updateScore(n),
                    addToScore: (n: number) => scoreboard.addToScore(n),
                    setLives: (n: number) => lives.setLives(n),
                    addLife: () => lives.addLife(),
                    setLevel: (n: number) => levelIndicator.setLevel(n),
                    addLevel: () => levelIndicator.addLevel(),
                    restart: () => Runner.get().start(),
                };

                Runner.get().start();

                break;
            }

            default:
            // StartGame();
        }
    }
};