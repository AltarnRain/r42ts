/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Game
 * Responsibility:  Starts the game
 */

export const StartGame = (canvas: HTMLCanvasElement): void => {

    const ctx = canvas.getContext("2d");

    if (ctx) {
        Render(ctx);
    }
};

const Render = (ctx: CanvasRenderingContext2D): void => {
    ctx.beginPath();
    ctx.fillStyle = "green";
    ctx.fillRect(10, 10, 50, 50);
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.fillRect(150, 150, 150, 150);
    ctx.closePath();
};