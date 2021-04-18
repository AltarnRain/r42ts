/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import dimensionProvider from "../Providers/DimensionProvider";

/**
 * Module:          SetCanvasDimensions
 * Responsibility:  A function that sets the canvas dimensions
 */

const {
    fullGameHeight,
    fullGameWidth,
} = dimensionProvider();


export namespace Canvas {

    /**
     * setCanvasDimensions. Set the canvas width and height to the optimal size for the game.
     * If the game is running fullscreen the canvas's style properties will be used to stretch the image
     * to take up as much space as possible while maintaining aspect ratio,
     */
    export function setCanvasDimensions(): void {
        // Set canvas dimensions.
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;

        if (!canvas) {
            throw new Error("Could not find canvas element.");
        }

        const body = document.getElementById("body") as HTMLBodyElement;

        if (!body) {
            throw new Error("Could not find body element");
        }

        const rect = body.getBoundingClientRect();

        canvas.width = fullGameWidth;
        canvas.height = fullGameHeight;

        const resizeFactor = rect.width < rect.height ? rect.width / fullGameWidth : rect.height / fullGameHeight;

        const displayWidth = fullGameWidth * resizeFactor;
        const displayHeight = fullGameHeight * resizeFactor;

        const displayLeft = (rect.width - displayWidth) / 2;
        const displayTop = (rect.height - displayHeight) / 2;

        canvas.style.left = `${Math.round(displayLeft)}px`;
        canvas.style.top = `${Math.round(displayTop)}px`;
        canvas.style.width = `${Math.round(displayWidth)}px`;
        canvas.style.height = `${Math.round(displayHeight)}px`;
    }

    export function minimizeCanvas(): void {
        // Set canvas dimensions.
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;

        if (!canvas) {
            throw new Error("Could not find canvas element.");
        }

        canvas.style.width = "0px";
        canvas.style.height = "0px";
    }
}