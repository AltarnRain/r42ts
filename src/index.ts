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
import { drawGameScreen } from "./GameScreen/DrawGameScreen";
import { registerListeners } from "./Handlers/KeyboardStateHandler/KeyboardStateHandler";
import { GameLoop, Level, Lives, Phasers, Runner, ScoreBoard } from "./Modules";
import Player from "./Player/Player";
import { PlayerFrame } from "./Player/PlayerFrames";
import DimensionProvider from "./Providers/DimensionProvider";
import { getFrameDimensions } from "./Utility/Frame";

window.onload = () => {

    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (canvas) {
        // Initialize the dimentions of the canvas.
        canvas.width = DimensionProvider().fullWidth;
        canvas.height = DimensionProvider().fullHeight;

        switch (window.location.search.replace("?", "")) {
            case "playground": {

                const {
                    gameFieldHeight,
                    averagePixelSize,
                    fullWidth
                } = DimensionProvider();

                registerListeners();

                GameLoop.register(drawGameScreen);
                GameLoop.register(Runner.run);

                // const p = [
                //     new PlayerFormationParticle({ top: 10, left: 1500 }, mouseCursorLocation, PlayerFormationFrames.F0, 5),
                //     new PlayerFormationParticle({ top: 50, left: 500 }, mouseCursorLocation, PlayerFormationFrames.F0, 5),
                //     new PlayerFormationParticle({ top: 100, left: 0 }, mouseCursorLocation, PlayerFormationFrames.F0, 5),
                //     new PlayerFormationParticle({ top: 150, left: 50 }, mouseCursorLocation, PlayerFormationFrames.F0, 5),
                //     new PlayerFormationParticle({ top: 500, left: 5 }, mouseCursorLocation, PlayerFormationFrames.F0, 5),
                // ];

                // window.addEventListener("mousemove", (e: MouseEvent) => {
                //     p.forEach((x) => x.setUpdatedTargetLocation({ left: e.offsetX, top: e.offsetY }));
                // });

                // p.forEach((x) => Runner.register(x));

                const shipDimensions = getFrameDimensions(PlayerFrame, averagePixelSize);

                const shipSpawnLocation = {
                    top: gameFieldHeight * 0.8,
                    left: (fullWidth / 2) - shipDimensions.width,
                };

                Runner.register(new Player(shipSpawnLocation));

                for (let i = 0; i < 20; i++) {
                    const bird = new BirdEnemy();
                    Runner.register(bird);
                }

                // Register the onPLayerDeath callback in the runner.
                // Runner.registerOnPlayerDeath(PlayerManager.onPlayerDeath);

                // PlayerManager.begin();

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
                GameLoop.Start();

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