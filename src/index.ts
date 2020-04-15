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
import { GameLoop, Level, Lives, Phasers, PlayerFormation, PlayerLocationHandler, Runner, ScoreBoard } from "./Modules";
import Player from "./Player/Player";
import DimensionProvider from "./Providers/DimensionProvider";
import PlayerFormationPart from "./Player/PlayerFormationPart";
import { PlayerFormationFrames } from "./Player/PlayerFrames";
import renderFrame from "./Render/RenderFrame";

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

                for (let i = 0; i < 1; i++) {
                    const bird = new BirdEnemy();
                    Runner.register(bird);
                    bird.setSpeed(0);
                }

                Lives.setLives(2);
                Phasers.setPhasers(10);

                PlayerFormation.formSlow(PlayerLocationHandler.getShipSpawnLocation(), () => {
                    Runner.register(new Player(PlayerLocationHandler.getPlayerLocation()));
                });

                GameLoop.register(PlayerFormation.updateState);
                GameLoop.register(PlayerFormation.draw);

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

/**
 * Uses the player formation part to draw a block on the screen
 * 4 other blocks should converge on this block and stop moving when they overlap.
 */
function testAngleCalculation(): void {
    const target = { top: 500, left: 700 };
    const p1 = new PlayerFormationPart({ top: 500, left: 100 }, target, PlayerFormationFrames.F0, 1);
    const p2 = new PlayerFormationPart({ top: 500, left: 1300 }, target, PlayerFormationFrames.F0, 1);
    const p3 = new PlayerFormationPart({ top: 100, left: 700 }, target, PlayerFormationFrames.F0, 1);
    const p4 = new PlayerFormationPart({ top: 800, left: 700 }, target, PlayerFormationFrames.F0, 1);
    GameLoop.register(p1.updateState);
    GameLoop.register(p1.draw);
    GameLoop.register(p2.updateState);
    GameLoop.register(p2.draw);
    GameLoop.register(p3.updateState);
    GameLoop.register(p3.draw);
    GameLoop.register(p4.updateState);
    GameLoop.register(p4.draw);
    GameLoop.register((tick) => renderFrame(target, PlayerFormationFrames.F0));
}
