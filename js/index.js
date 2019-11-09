"use strict";
/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Module:          Index
 * Responsibility:  Entry point for the game
 */
var Game_1 = require("./Game");
window.onload = function () {
    var canvas = document.getElementById("canvas");
    if (canvas) {
        canvas.width = window.screen.width;
        canvas.height = window.screen.height;
        Game_1.StartGame(canvas);
    }
};
