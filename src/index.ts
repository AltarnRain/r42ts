/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Index
 * Responsibility:  Entry point for the game
 */

import { drawStatusBar } from "./GameScreen/StatusBar";
import "./Levels/LevelManager";
import GameLoop from "./Main/GameLoop";
import playerRunner from "./Main/PlayerRunner";
import PlayerFormationPart from "./Player/PlayerFormationPart";
import { PlayerFormationFrames } from "./Player/PlayerFrames";
import { PlayerSpawnManager as playerSpawnManager } from "./Player/PlayerSpawnManager";
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

                GameLoop.registerStatic(drawStatusBar);

                dispatch<number>("setLives", 10);
                dispatch<number>("setPhasers", 30);
                dispatch<number>("setLevel", 1);
                dispatch<number>("increaseScore", 2000);

                registerListeners();

                GameLoop.registerUpdateState(playerSpawnManager);
                GameLoop.registerUpdateState(playerRunner);

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

                // (window as any).r42 = {
                //     d: (type: GameActions, action: ActionPayload<any>) => dispatch(type, action),
                // };

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
    GameLoop.registerUpdateState(p1.updateState);
    GameLoop.registerUpdateState(p1.draw);
    GameLoop.registerUpdateState(p2.updateState);
    GameLoop.registerUpdateState(p2.draw);
    GameLoop.registerUpdateState(p3.updateState);
    GameLoop.registerUpdateState(p3.draw);
    GameLoop.registerUpdateState(p4.updateState);
    GameLoop.registerUpdateState(p4.draw);
    GameLoop.registerUpdateState((tick) => renderFrame(target, PlayerFormationFrames.F0));
}
