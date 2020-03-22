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
export default function RenderFrame(location: GameLocation, frame: string[][]): void {
    const ctx = CtxProvider();

    for (let rowIndex = 0; rowIndex < frame.length; rowIndex++) {

        const columns = frame[rowIndex];

        for (let columnIndex = 0; columnIndex < columns.length; columnIndex++) {
            const color = columns[columnIndex];

            const x = location.left + columnIndex * DimensionProvider().pixelSize;
            const y = location.top + rowIndex * DimensionProvider().pixelSize;

            if (color !== "0") {
                ctx.fillStyle = color;
                ctx.fillRect(x, y, DimensionProvider().pixelSize, DimensionProvider().pixelSize);
            }
        }
    }
}