/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          RenderFrame
 * Responsibility:  Renders a single frame to the canvas
 */

import { validColors } from "../Constants/CGAColors";
import ctxProvider from "../Providers/CtxProvider";
import dimensionProvider from "../Providers/DimensionProvider";
import { Frame } from "../Types/Types";

const {
    maxPixelSize,
    averagePixelSize,
} = dimensionProvider();

/**
 * Renders a single frame to the canvas.
 * @param {left} left. Left coordinate.
 * @param {top} top. Top coordinate.
 * @param {Frame} frame. A 2d string array.
 */
export default function renderFrame(left: number, top: number, frame: Frame): void {
    const ctx = ctxProvider();

    for (let rowIndex = 0; rowIndex < frame.length; rowIndex++) {

        const columns = frame[rowIndex];

        for (let columnIndex = 0; columnIndex < columns.length; columnIndex++) {
            const color = columns[columnIndex];

            // We use the minimum pixel size to determine the position.
            const x = left + columnIndex * averagePixelSize;
            const y = top + rowIndex * averagePixelSize;

            if (color !== "0") {

                // DEBUGGING.
                if (validColors.indexOf(color) === -1) {
                    // tslint:disable-next-line: no-console
                    throw new Error("Provided color is not a valid CGA color");
                }

                ctx.fillStyle = color;
                // But we use the max pixel size to draw a pixel. This ensures the pixels overlap slightly.
                // Otherwise, you'll see bits and pieces of the back ground.
                ctx.fillRect(x, y, maxPixelSize, maxPixelSize);
            }
        }
    }
}