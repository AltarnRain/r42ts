"use strict";
/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Module:          Game
 * Responsibility:  Starts the game
 */
exports.StartGame = function (canvas) {
    var ctx = canvas.getContext("2d");
    if (ctx) {
        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.fillRect(10, 10, 50, 50);
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.fillRect(150, 150, 150, 150);
        ctx.closePath();
    }
};
