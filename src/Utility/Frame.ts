/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { Frames } from "../Types/Types";
import HexToCGAConverter from "./HexToCGAConverter";
import { getRandomArrayElement } from "./Lib";

/**
 * Module:          Frame
 * Responsibility:  Module for dealing with Frames.
 */

/**
 * Update frames whose cells contain "V" to a randonly selected color.
 * @param {string[][][]} frames. A set of frames.
 * @param {string[]} colors. Array containing colors.
 */
export function setRandomFrameColors(frames: Frames, colors: string[]): void {
    Object.keys(frames).forEach((key) => {
        const color = getRandomArrayElement(colors);
        frames[key].forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                if (cell === "V") {
                    frames[key][rowIndex][cellIndex] = color;
                }
            });
        });
    });
}

/**
 * Updates a frame to actual CGA colors.
 * @param {Frames} frames. All frames.
 */
export function convertFramesColors(frames: Frames): void {
    Object.keys(frames).forEach((key) => {
        const frame = frames[key];
        convertFrameColor(frame);
    });
}

/**
 * Set the predefined color for a single frame.
 * @param {string[][]} frame. A single frame.
 */
export function convertFrameColor(frame: string[][]) {
    frame.forEach((row, rowIndex) => {
        row.forEach((cellColor, cellIndex) => {
            if (cellColor !== "0") {
                frame[rowIndex][cellIndex] = HexToCGAConverter(cellColor);
            }
        });
    });
}

/**
 * Updates a frame that uses variable (V) colors to a passed color.
 * @param {Frames} frames. All frames.
 */
export function setVariableFramesColor(frames: Frames, color: string): void {
    Object.keys(frames).forEach((key) => {
        const frame = frames[key];
        setVariableFrameColor(frame, color);
    });
}

/**
 * Sets a random color on a Variable frame color (V).
 * @param {string[][]} frame. A frame.
 * @param {string} color. Color.
 */
export function setVariableFrameColor(frame: string[][], color: string) {
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
    Object.keys(frames).forEach((key) => {
        const frame = frames[key];
        setFrameColor(frame, color);
    });
}

export function setFrameColor(frame: string[][], color: string) {
    frame.forEach((row, rowIndex) => {
        row.forEach((cellColor, cellIndex) => {
            if (cellColor !== "0") {
                frame[rowIndex][cellIndex] = color;
            }
        });
    });
}