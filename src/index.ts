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
import { GameLoop, Level, Lives, Phasers, Runner, ScoreBoard } from "./Modules";
import PlayerFormationPart from "./Player/PlayerFormationPart";
import { PlayerFormationFrames } from "./Player/PlayerFrames";
import DimensionProvider from "./Providers/DimensionProvider";
import renderFrame from "./Render/RenderFrame";
import { dispatch } from "./State/Store";
import { registerListeners } from "./Utility/KeyboardEvents";

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
                    dispatch<BirdEnemy>("addEnemy", bird);
                    bird.setSpeed(0);
                }

                dispatch<number>("setLives", 2);
                dispatch<number>("setPhasers", 1);

                // const s1 = GameLoop.register(PlayerFormation.updateState);
                // const s2 = GameLoop.register(PlayerFormation.draw);
                // PlayerFormation.formSlow(getShipSpawnLocation(), () => {
                //     dispatch("setPlayer", new PlayerShip());
                //     s1();
                //     s2();
                // });

                (window as any).r42 = {
                    updateScore: (n: number) => ScoreBoard.updateScore(n),
                    addToScore: (n: number) => ScoreBoard.addToScore(n),
                    // setLives: (n: number) => Lives.setLives(n),
                    // addLife: () => Lives.addLife(),
                    // setLevel: (n: number) => Level.setLevel(n),
                    // addLevel: () => Level.addLevel(),
                    // addPhaser: () => Phasers.addPhaser(),
                    // setPhasers: (n: number) => Phasers.setPhasers(n),
                    // removePhaser: () => Phasers.reduceByOneCharge(),
                    // setSpeed: (n: number) => dispatch<number>("set"),
                    // toggleHitboxes: () => dispatchEvent,
                    addBirds: (n: number) => {
                        for (let i = 0; i < n; i++) {
                            const bird = new BirdEnemy();
                            // Runner.register(bird);
                        }
                    },
                    // togglePlayerImmortality: () => Runner.togglePlayerImmortality(),
                    // toggleRenderPhaser: () => Runner.toggleRenderPhaser(),
                };

                // testAngleCalculation();

                // Runner.start();
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
