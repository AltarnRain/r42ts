/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          StartGame
 * Responsibility:  Begin the game.
 */

import GameLoop from "./GameLoop";
import GameResultModel from "./Models/GameResultModel";
import setCanvasDimensions from "./Render/SetCanvasDimensions";

/**
 * startGame. Initializes the canvas dimensions, then starts the game.
 * @param {number} fps. Max fps provided by the browser.
 * @param {boolean} fullscreen. When true, the canvas's style properties will be set to utilize fullscreen dimensions.
 * @param {(result: GameResultModel) => void} gameOverCallback. Callback used by the GameLoop module to trigger a game over event in the UI,
 */
export function startGame(fps: number, sound: boolean, gameOverCallback: (result: GameResultModel) => void): void {

    setCanvasDimensions();

    // Ok, screen's setup let start the game!
    GameLoop.init(fps, gameOverCallback, sound);
}