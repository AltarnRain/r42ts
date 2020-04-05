/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import GameLocation from "../Models/GameLocation";
import { Hitbox } from "../Models/Hitbox";
import DimensionProvider from "../Providers/DimensionProvider";
import { Frame, Frames } from "../Types/Types";
import HexToCGAConverter from "./HexToCGAConverter";
import { getRandomArrayElement } from "./Lib";

/**
 * Module:          Frame
 * Responsibility:  Module for dealing with Frames.
 */

/**
 * Update frames whose cells contain "V" to a randonly selected color.
 * @param {Frames} frames. A set of frames.
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
 * @param {Frame} frame. A single frame.
 */
export function convertFrameColor(frame: Frame) {
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
 * @param {Frame} frame. A frame.
 * @param {string} color. Color.
 */
export function setVariableFrameColor(frame: Frame, color: string) {
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

/**
 * Returns the dimensions of a frame in PX.
 * @param {Frame} frame. A frame.
 * @returns {width, height}.
 */
export function getFrameDimensions(frame: Frame, pixelSize: number): { width: number; height: number } {
    return {
        width: frame[0].length * pixelSize,
        height: frame.length * pixelSize,
    };
}

/**
 * Calculates a GameLocation object where the center of a frame resides.
 * @param {number} location.
 * @param {frame} frame.
 */
export function getFrameCenter(location: GameLocation, frame: Frame, pixelSize: number): GameLocation {
    const dimensions = getFrameDimensions(frame, pixelSize);

    return {
        left: location.left + dimensions.width / 2,
        top: location.top + dimensions.height / 2,
    };
}

/**
 * Returns a random frame index.
 * @param {Frames} frames.
 * @returns {number}. Frame index.
 */
export function getRandomFrameKeyIndex(frames: Frames): number {
    const objectKeys = Object.keys(frames).length - 1;

    return Math.round(Math.random() * objectKeys);
}

/**
 * Returns a frame by index. Returns undefined if the frame is not defined.
 * @param {Frames} frames. Frames.
 * @param {number} index. Index of the frame.
 * @returns {Frame | undefined}. Returns the frame if one was found for the passed index, otherwise returns undefined.
 */
export function getFrameByIndex(frames: Frames, index: number): Frame | undefined {
    return frames["F" + index];
}

/**
 * getFrameHitbox
 * @param {GameLocation} location. A Location.
 * @param {Frame} frame. A frame
 * @returns {Hitbox}. The frame's hitbox.
 */
export function getFrameHitbox(location: GameLocation, frame: Frame, pixelSize: number): Hitbox {

    const width = frame[0].length * pixelSize;
    const height = frame.length * pixelSize;

    return {
        top: location.top,
        left: location.left,
        right: location.left + width,
        bottom: location.top + height,
    };
}