/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import dimensionProvider from "../Providers/DimensionProvider";
import { Frame } from "../Types/Frame";
import ctxProvider from "./CtxProvider";

/**
 * Module:          RenderFrame
 * Responsibility:  Renders a single frame to the canvas
 */
const {
    pixelSize,
} = dimensionProvider();

const ctx = ctxProvider();

/**
 * Renders a single frame to the canvas.
 * @param {left} left. Left coordinate.
 * @param {top} top. Top coordinate.
 * @param {Frame} frame. A 2d string array.
 */
export default function renderFrame(left: number, top: number, frame: Frame): void {

    for (let rowIndex = 0; rowIndex < frame.length; rowIndex++) {
        const columns = frame[rowIndex];

        for (let columnIndex = 0; columnIndex < columns.length; columnIndex++) {
            const color = columns[columnIndex];

            const x = Math.round(left + columnIndex * pixelSize);
            const y = Math.round(top + rowIndex * pixelSize);

            // 0 is black. No point in drawing it since the back ground is black.
            if (color !== "0") {

                // DEBUGGING. Uncomment lines below if a color does not seem right.
                // if (validColors.indexOf(color) === -1) {
                //     // tslint:disable-next-line: no-console
                //     throw new Error("Provided color is not a valid CGA color");
                // }

                ctx.fillStyle = color;
                // But we use the max pixel size to draw a pixel. This ensures the pixels overlap slightly.
                // Otherwise, you'll see bits and pieces of the back ground.
                ctx.fillRect(x, y, pixelSize, pixelSize);
            }
        }
    }
}