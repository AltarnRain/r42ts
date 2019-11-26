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
    const body = document.getElementById("body") as HTMLCanvasElement;

    if (canvas && body) {

        // Set the dimensions of the canvas equal to the body element so
        // it fills the entire screen.
        const rect = body.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;

        StartGame(canvas);
    }
};