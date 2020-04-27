/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { Frame, Frames } from "../Types/Types";
import hexToCGAConverter from "./HexToCGAConverter";

/**
 * Module:          Functions that mutate frames.
 * Responsibility:  Update frames with colors.
 */

namespace FrameMutators {

    /**
     * Set the colors of a frame that uses changing colors.
     * @param {Frame} frame. A frame.
     * @param {string[]} colors. Colors to set by index.
     */
    export function convertChangingFrameColors(frame: Frame, colors: string[]): void {
        for (let r = 0; r < frame.length; r++) {
            const row = frame[r];
            for (let c = 0; c < row.length; c++) {
                if (row[c] !== "0") {
                    const colorIndex = parseInt(row[c], 10);
                    const color = colors[colorIndex - 1];
                    row[c] = color;
                }
            }
        }
    }

    /**
     * Updates a frame to actual CGA colors.
     * @param {Frames} frames. All frames.
     */
    export function convertFramesColors(frames: Frames): void {
        for (const frame of frames) {
            convertFrameColor(frame);
        }
    }

    /**
     * Set the predefined color for a single frame.
     * @param {Frame} frame. A single frame.
     */
    export function convertFrameColor(frame: Frame) {
        frame.forEach((row, rowIndex) => {
            row.forEach((cellColor, cellIndex) => {
                if (cellColor !== "0") {
                    frame[rowIndex][cellIndex] = hexToCGAConverter(cellColor);
                }
            });
        });
    }

    /**
     * Updates a frame that uses variable (V) colors to a passed color.
     * @param {Frames} frames. All frames.
     */
    export function convertVariableFramesColor(frames: Frames, color: string): void {
        for (const frame of frames) {
            convertVariableFrameColor(frame, color);
        }
    }

    /**
     * Sets a random color on a Variable frame color (V).
     * @param {Frame} frame. A frame.
     * @param {string} color. Color.
     */
    export function convertVariableFrameColor(frame: Frame, color: string) {
        frame.forEach((row, rowIndex) => {
            row.forEach((cellColor, cellIndex) => {
                if (cellColor === "V") {
                    frame[rowIndex][cellIndex] = color;
                }
            });
        });
    }

    /**
     * Sets a cell's color to the passed color. Doesn't matter if they're variable (V).
     * @param {Frames} frames. All frames.
     */
    export function setFramesColor(frames: Frames, color: string): void {
        for (const frame of frames) {
            setFrameColor(frame, color);
        }
    }

    /**
     * Sets a frame colors when the color is not black ("0")
     * @param {Frame} frame. A frame
     * @param {string} color. A color
     */
    export function setFrameColor(frame: Frame, color: string) {
        frame.forEach((row, rowIndex) => {
            row.forEach((cellColor, cellIndex) => {
                if (cellColor !== "0") {
                    frame[rowIndex][cellIndex] = color;
                }
            });
        });
    }
}

export default FrameMutators;