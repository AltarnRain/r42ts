/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import CGAColors from "../Constants/CGAColors";
import { PlayerFrames } from "../Frames/PlayerFrames";
import DimensionProvider from "../Providers/DimensionProvider";
import renderFrame from "../Render/RenderFrame";
import Frames from "../Types/Frames";
import { cloneObject, getFrameDimensions, setFramesColor } from "../Utility/Lib";

/**
 * Module:          Lives
 * Responsibility:  Draws player lives
 */

export default class Lives {

    /**
     * Number of lives for the player.
     */
    private lives: number;

    /**
     * Frame for a player life.
     */
    private lifeFrames: Frames;

    /**
     * Top position
     */
    private top: number;

    /**
     * Left position
     */
    private leftStartPostion: number;

    constructor() {

        // Clone the player frames so we can safely alter them.
        this.lifeFrames = cloneObject(PlayerFrames);

        // Lives are completely yellow player ships
        setFramesColor(this.lifeFrames, CGAColors.yellow);

        this.top = DimensionProvider().maxPixelSize;
        this.leftStartPostion = DimensionProvider().fullWidth - DimensionProvider().maxPixelSize * 18;
    }

    /**
     * Sets the number of player lives.
     * @param {number} lives. Player lives.
     */
    public setLives(lives: number): void {
        this.lives = lives;
    }

    /**
     * Adds one life.
     */
    public addLife(): void {
        this.lives++;
    }

    /**
     * Removes one life.
     */
    public removeLife(): void {
        this.lives--;
    }

    /**
     * Draws the player lives.
     */
    public draw(): void {

        let left = this.leftStartPostion;

        // Start five game pixels from the right.
        for (let lives = 1; lives <= 7; lives++) {
            if (lives <= this.lives) {
                left = left - DimensionProvider().maxPixelSize * 2 - getFrameDimensions(this.lifeFrames.F0).width;
                renderFrame({ left, top: this.top }, this.lifeFrames.F0);
            }
        }
    }
}