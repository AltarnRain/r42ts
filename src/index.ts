/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Index
 * Responsibility:  Entry point for the game
 */

import Animator from "./Animator";
import BirdEnemy from "./Enemies/Bird";
import { StartGame } from "./Game";
import DimensionProvider from "./Providers/DimensionProvider";

window.onload = () => {

    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (canvas) {

        // Initialize the dimentions of the canvas.
        canvas.width = DimensionProvider().fullWidth;
        canvas.height = DimensionProvider().fullHeight;

        switch (window.location.search.replace("?", "")) {
            case "player":

            case "bird":
                const bird = new BirdEnemy();
                const animator = new Animator(bird);
                animator.start();

                // proef

            default:
                StartGame();
        }
    }
};