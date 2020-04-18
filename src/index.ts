/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Index
 * Responsibility:  Entry point for the game
 */

import { Level01 } from "./Levels/Level01";
import { GameLoop, StatusBar } from "./Modules";
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

                StatusBar.subscribeToChanges();

                dispatch<number>("setLives", 10);
                dispatch<number>("setPhasers", 30);
                dispatch<number>("setLevel", 2);
                dispatch<number>("increaseScore", 2000);

                registerListeners();

                // GameLoop.register(Runner.run);

                // drawGameFieldBorder();
                // drawLevelBanner(9);

                // const birds = BirdSpawnLocations.map((bs) =>  new BirdEnemy(bs, 3));
                // dispatch<BaseEnemyObject[]>("setEnemies", birds);

                // dispatch<number>("setLives", 2);
                // dispatch<number>("setPhasers", 30);
                // dispatch<number>("setLevel", 2);

                // const s1 = GameLoop.register(PlayerFormation.updateState);
                // const s2 = GameLoop.register(PlayerFormation.draw);
                // PlayerFormation.formSlow(getShipSpawnLocation(), () => {
                //     dispatch("setPlayer", new PlayerShip());
                //     s1();
                //     s2();
                // });

                (window as any).r42 = {
                    increaseScore: (n: number) => dispatch<number>("increaseScore", 200),
                    // setLives: (n: number) => Lives.setLives(n),
                    // addLife: () => Lives.addLife(),
                    // setLevel: (n: number) => Level.setLevel(n),
                    // addLevel: () => Level.addLevel(),
                    // addPhaser: () => Phasers.addPhaser(),
                    // setPhasers: (n: number) => Phasers.setPhasers(n),
                    // removePhaser: () => Phasers.reduceByOneCharge(),
                    // setSpeed: (n: number) => dispatch<number>("set"),
                    // toggleHitboxes: () => dispatchEvent,
                    // addBirds: (n: number) => {
                    //     for (let i = 0; i < n; i++) {
                    //         const bird = new BirdEnemy();
                    //         // Runner.register(bird);
                    //     }
                    // },
                    // togglePlayerImmortality: () => Runner.togglePlayerImmortality(),
                    // toggleRenderPhaser: () => Runner.toggleRenderPhaser(),
                };

                // testAngleCalculation();

                // Runner.start();
                GameLoop.Start();

                const l = new Level01();
                l.start();

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
