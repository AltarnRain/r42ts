/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Index
 * Responsibility:  Entry point for the game
 */

import { StartGame } from "./Game";

window.onload = () => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (canvas) {
        canvas.width = window.screen.width;
        canvas.height = window.screen.height;
        StartGame(canvas);
    }
};