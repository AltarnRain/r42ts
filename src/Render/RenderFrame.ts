/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          RenderFrame
 * Responsibility:  Renders a single frame to the canvas
 */

import GameLocation from "../Models/GameLocation";
import CtxProvider from "../Providers/CtxProvider";
import DimensionProvider from "../Providers/DimensionProvider";

/**
 * Renders a single frame to the canvas
 * @param {GameLocation} location. The location where to render the frame.
 * @param {string[][]} frame. A 2d string array.
 */
export default function renderFrame(location: GameLocation, frame: string[][]): void {
    const ctx = CtxProvider();

    for (let rowIndex = 0; rowIndex < frame.length; rowIndex++) {

        const columns = frame[rowIndex];

        for (let columnIndex = 0; columnIndex < columns.length; columnIndex++) {
            const color = columns[columnIndex];

            // We use the minimum pixel size to determine the position.
            const x = location.left + columnIndex * DimensionProvider().minPixelSize;
            const y = location.top + rowIndex * DimensionProvider().minPixelSize;

            if (color !== "0") {
                ctx.fillStyle = color;
                // But we use the max pixel size to draw a pixel. This ensures the pixels overlap slightly.
                // Otherwise, you'll see bits and pieces of the back ground.
                ctx.fillRect(x, y, DimensionProvider().maxPixelSize, DimensionProvider().maxPixelSize);
            }
        }
    }
}