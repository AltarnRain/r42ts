/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import Characters from "../Assets/Characters";
import CGAColors from "../Constants/CGAColors";
import IAnimate from "../Interfaces/IAnimate";
import DimensionProvider from "../Providers/DimensionProvider";
import RenderFrame from "../Render/RenderFrame";
import Frames from "../Types/Frames";
import { cloneFrames, padLeft, setVariableFrameColors, getFrameDimensions } from "../Utility/Lib";

/**
 * Module:          ScoreBoard
 * Responsibility:  Draw the ScoreBoard
 */

export class ScoreBoard implements IAnimate {

    private score: number;
    private left: number;
    private spacing: number;

    private frames: Frames;

    constructor() {
        this.left = 4 * DimensionProvider().maxPixelSize;
        this.spacing = 2 * DimensionProvider().maxPixelSize;

        // Create a clone of the number character frames so we can set their color without ruining the asset.
        this.frames = cloneFrames({
            N0: Characters.N0,
            N1: Characters.N1,
            N2: Characters.N2,
            N3: Characters.N3,
            N4: Characters.N4,
            N5: Characters.N5,
            N6: Characters.N6,
            N7: Characters.N7,
            N8: Characters.N8,
            N9: Characters.N9
        });

        setVariableFrameColors(this.frames, CGAColors.yellow);

        this.score = 0;
    }

    public updateScore(score: number): void {
        this.score = score;
    }

    public animate(_: number): void {
        const scoreString = padLeft(this.score.toString(), 6, "0");

        let cnt = 0;
        for (const n of scoreString) {
            const frame = this.frames["N" + n];

            const spacing = cnt === 0 ? 0 : this.spacing;
            let left = cnt * (getFrameDimensions(frame).width + spacing);
            left = this.left + left;
            RenderFrame({ left, top: 0 }, frame);
            cnt++;
        }
    }
}