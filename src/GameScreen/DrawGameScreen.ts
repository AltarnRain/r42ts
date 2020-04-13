/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          draw Game Screen
 * Responsibility:  Draws all the stuff the player needs to see aside from enemies.
 */

import { Level, Lives, Phasers, ScoreBoard, StaticRenders } from "../Modules";

export function drawGameScreen(tick: number): void {
    // Draw the static stuff.
    StaticRenders.drawScoreBoardBackGround();
    StaticRenders.drawGameFieldBorder();
    Level.draw();
    Lives.draw();
    ScoreBoard.draw();
    Phasers.draw();
}