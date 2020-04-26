/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import Explosion from "../Models/Explosion";
import { GameRectangle } from "../Models/GameRectangle";
import { GameSize } from "../Models/GameSize";
import { Frame, Frames } from "../Types/Types";
import { getRandomArrayElement } from "./Array";
import hexToCGAConverter from "./HexToCGAConverter";

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
    for (const frame of frames) {
        const color = getRandomArrayElement(colors);
        frame.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                if (cell === "V") {
                    frame[rowIndex][cellIndex] = color;
                }
            });
        });
    }
}

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

/**
 * Returns the dimensions of a frame in PX.
 * @param {Frame} frame. A frame.
 * @returns {width, height}.
 */
export function getFrameDimensions(frame: Frame, pixelSize: number): GameSize {
    return {
        width: frame[0].length * pixelSize,
        height: frame.length * pixelSize,
    };
}

export function getMaximumFrameDimensions(frames: Frames, pixelSize: number): GameSize {
    const allFrameDimensions = frames.map((f) => getFrameDimensions(f, pixelSize));

    const allWidths = allFrameDimensions.map((af) => af.width);
    const allHeights = allFrameDimensions.map((af) => af.width);

    return {
        width: Math.max(...allWidths),
        height: Math.max(...allHeights),
    };
}

/**
 * Calculates a location object where the center of a frame resides.
 * @param {number} left. Left coordinate.
 * @param {number} top. Top coordinate.
 * @param {frame} frame.
 */
export function getFrameCenter(left: number, top: number, frame: Frame, pixelSize: number): { left: number, top: number } {
    const dimensions = getFrameDimensions(frame, pixelSize);

    return {
        left: left + dimensions.width / 2,
        top: top + dimensions.height / 2,
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
export function getFrameByIndex(frames: Frames, index: number): Frame {
    const frame = frames[index];

    if (!frame) {
        throw new Error("No frame found");
    }

    return frame;
}

/**
 * getFrameHitbox
 * @param {number} Left. Left coordinate.
 * @param {number} top. Top coordinate.
 * @param {Frame} frame. A frame
 * @param {number} pixelSize.
 * @param {number} topOffset.
 * @param {number} bottomOffset.
 * @returns {GameRectangle}. The frame's hitbox.
 */
export function getFrameHitbox(left: number, top: number, width: number, height: number, topOffset: number, bottomOffset: number): GameRectangle {
    return {
        top: top + topOffset,
        left,
        right: left + width,
        bottom: top + height + bottomOffset,
    };
}

/**
 * Uses spreads to create a new Frame.
 * @param {Frame} frame. The frame.
 * @returns {Frame}. A copy of the original frame.
 */
export function copyFrame(frame: Frame): Frame {
    const newFrame: Frame = [];

    for (const row of frame) {
        const newRow = [...row];
        newFrame.push(newRow);
    }

    return newFrame;
}

/**
 * Uses spreads to create new Frames.
 * @param {Frames} frames. Frames to copy.
 * @return {Frames}. Fresh copy of the Frames.
 */
export function copyFrames(frames: Frames): Frames {
    const newFrames: Frames = [];

    for (const frame of frames) {
        const newFrame = copyFrame(frame);
        newFrames.push(newFrame);
    }

    return newFrames;
}

export function getFrameReturner(frame: Frame): () => Frame {
    const frameCopy = copyFrame(frame);

    return () => frameCopy;
}

export function copyExplosion(explosion: Explosion): Explosion {
    const newExplosion = {...explosion};
    newExplosion.particleFrames = copyFrames(explosion.particleFrames);
    newExplosion.explosionCenterFrame = copyFrame(explosion.explosionCenterFrame);

    return explosion;
}

export function getExplosionReturner(explosion: Explosion): () => Explosion {
    const newExplosion = copyExplosion(explosion);

    return () => newExplosion;
}