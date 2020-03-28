/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Index
 * Responsibility:  Entry point for the game
 */

import Animator from "./Animator";
import CGAColors from "./Constants/CGAColors";
import BirdEnemy from "./Enemies/Bird";
import BirdFrames from "./Frames/BirdFrames";
import DimensionProvider from "./Providers/DimensionProvider";
import RenderFrame from "./Render/RenderFrame";
import { setRandomFrameColors } from "./Utility/Lib";

window.onload = () => {

    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (canvas) {
        // Initialize the dimentions of the canvas.
        canvas.width = DimensionProvider().fullWidth;
        canvas.height = DimensionProvider().fullHeight;

        switch (window.location.search.replace("?", "")) {
            case "player":
            case "bird":

                const animator = new Animator();
                const bird = new BirdEnemy();
                animator.register(bird);

                animator.start();

                break;

            case "renderTest":
                setRandomFrameColors(BirdFrames, [CGAColors.green] );

                RenderFrame({ left: 10, top: 10 }, BirdFrames.F0);
                RenderFrame({ left: 10, top: 50 }, BirdFrames.F1);
                RenderFrame({ left: 10, top: 100 }, BirdFrames.F2);
                RenderFrame({ left: 10, top: 150 }, BirdFrames.F3);

                break;

            default:
            // StartGame();
        }
    }
};