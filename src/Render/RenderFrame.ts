/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
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
import HexToCGAConverter from "../Utility/HexToCGAConverter";

/**
 * Renders a single frame to the canvas
 * @param {GameLocation} location. The location where to render the frame.
 * @param {string[][]} frame. A 2d string array.
 */
export default function renderFrame(location: GameLocation, frame: string[][]): void {
    const ctx = CtxProvider();

    frame.forEach((row, rowIndex) => row.forEach((column, columnIndex) => {
        const x = location.left + columnIndex * DimensionProvider().pixelSize;
        const y = location.top + rowIndex * DimensionProvider().pixelSize;

        ctx.beginPath();
        ctx.fillStyle = HexToCGAConverter(column);
        ctx.fillRect(x, y, DimensionProvider().pixelSize, DimensionProvider().pixelSize);
        ctx.closePath();
    }));
}