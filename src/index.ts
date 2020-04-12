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
import { registerListeners } from "./Handlers/KeyboardStateHandler/KeyboardStateHandler";
import { Level, Lives, Phasers, PlayerManager, Runner, ScoreBoard } from "./Modules";
import DimensionProvider from "./Providers/DimensionProvider";

window.onload = () => {

    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (canvas) {
        // Initialize the dimentions of the canvas.
        canvas.width = DimensionProvider().fullWidth;
        canvas.height = DimensionProvider().fullHeight;

        switch (window.location.search.replace("?", "")) {
            case "playground": {

                registerListeners();

                for (let i = 0; i < 0; i++) {
                    const bird = new BirdEnemy();
                    Runner.register(bird);
                }

                // Register the onPLayerDeath callback in the runner.
                Runner.registerOnPlayerDeath(PlayerManager.onPlayerDeath);

                PlayerManager.begin();

                Lives.setLives(2);
                Phasers.setPhasers(10);

                (window as any).r42 = {
                    updateScore: (n: number) => ScoreBoard.updateScore(n),
                    addToScore: (n: number) => ScoreBoard.addToScore(n),
                    setLives: (n: number) => Lives.setLives(n),
                    addLife: () => Lives.addLife(),
                    setLevel: (n: number) => Level.setLevel(n),
                    addLevel: () => Level.addLevel(),
                    addPhaser: () => Phasers.addPhaser(),
                    setPhasers: (n: number) => Phasers.setPhasers(n),
                    removePhaser: () => Phasers.reduceByOneCharge(),
                    setSpeed: (n: number) => Runner.setEnemySpeed(n),
                    toggleHitboxes: () => Runner.toggleHitboxes(),
                    addBirds: (n: number) => {
                        for (let i = 0; i < n; i++) {
                            const bird = new BirdEnemy();
                            Runner.register(bird);
                        }
                    },
                    togglePlayerImmortality: () => Runner.togglePlayerImmortality(),
                    toggleRenderPhaser: () => Runner.toggleRenderPhaser(),
                };

                Runner.start();
                // Runner.toggleHitboxes();
                // Runner.togglePlayerImmortality();
                // Runner.toggleRenderPhaser();
                break;
            }

            default:
            // StartGame();
        }
    }
};