/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import GameLocation from "../Models/GameLocation";
import DimensionProvider from "../Providers/DimensionProvider";
import { Frame, Frames } from "../Types/Types";
import HexToCGAConverter from "./HexToCGAConverter";
import { Hitbox } from "../Models/Hitbox";
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
export function getFrameDimensions(frame: Frame): { width: number; height: number } {
    return {
        width: frame[0].length * DimensionProvider().averagePixelSize,
        height: frame.length * DimensionProvider().averagePixelSize,
    };
}

/**
 * Calculates a GameLocation object where the center of a frame resides.
 * @param {number} location.
 * @param {frame} frame.
 */
export function getFrameCenter(location: GameLocation, frame: Frame): GameLocation {
    const dimensions = getFrameDimensions(frame);

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
export function getFrameHitbox(location: GameLocation, frame: Frame): Hitbox {

    const width = frame[0].length * DimensionProvider().minPixelSize;
    const center = getFrameCenter(location, frame);

    return {
        radius: width / 2,
        location: center,
    };
}

/**
 * hit.
 * @param {GameLocation} location1. Location of the first object.
 * @param {number} radius1. Radius of the first object
 * @param {GameLocation} location2. Location of the second object
 * @param {numbr} radius2. Radius of the second object.
 * @returns {boolean}. True if the objects hit/overlap.
 */
export function hit(location1: GameLocation, radius1: number, location2: GameLocation, radius2: number): boolean {

    const xd = location1.left - location2.left;
    const yd = location1.top - location2.top;

    const distance = Math.sqrt(Math.pow(xd, 2) + Math.pow(yd, 2));

    return (distance - radius1 - radius2) <= 0;
}