/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { PlayerFrames } from "../Frames/PlayerFrames";
import IDraw from "../Interfaces/IDraw";
import Frames from "../Types/Frames";
import { cloneFrames, setColors, setVariableFrameColors, padLeft, getFrameDimensions } from "../Utility/Lib";
import CGAColors from "../Constants/CGAColors";
import { getNumberFrames } from "../Assets/Characters";
import DimensionProvider from "../Providers/DimensionProvider";
import RenderFrame from "../Render/RenderFrame";

/**
 * Module:          Lives
 * Responsibility:  Draws player lives
 */

export default class Lives implements IDraw {

    /**
     * Number of lives for the player.
     */
    private lives: number;

    /**
     * Frame for a player life.
     */
    private lifeFrames: Frames;

    /**
     * Frames used to draw numbers.
     */
    private numberFrames: Frames;

    /**
     * Left position in PX where we start drawing.
     */
    private leftStartPosition: number;

    constructor() {

        // Clone the player frames so we can safely alter them.
        this.lifeFrames = cloneFrames(PlayerFrames);
        this.numberFrames = cloneFrames(getNumberFrames());

        // Lives are completely yellow player ships
        setColors(this.lifeFrames, CGAColors.yellow);
        setVariableFrameColors(this.numberFrames, CGAColors.yellow);

        // Start five game pixels from the right.
        this.leftStartPosition = DimensionProvider().fullWidth - (DimensionProvider().maxPixelSize * 5);
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
     * Draws the player lives.
     */
    public draw(_: number): void {
        // Draw life count.
        const lifeCountString = padLeft(this.lives.toString(), 2, "0");

        const leftNumber = lifeCountString[1];
        const rightNumber = lifeCountString[0];

        const leftLifeNumberFrame = this.numberFrames["N" + leftNumber];
        const rightLifeNumberFrame = this.numberFrames["N" + rightNumber];

        const numberWidth = getFrameDimensions(leftLifeNumberFrame).width;
        const spacing = DimensionProvider().minPixelSize * 2;

        RenderFrame({ left: this.leftStartPosition, top: 0 }, leftLifeNumberFrame);
        RenderFrame({ left: this.leftStartPosition - numberWidth - spacing, top: 0 }, rightLifeNumberFrame);
    }
}