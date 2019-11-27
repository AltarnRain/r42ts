/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Lib
 * Responsibility:  A library containing various helper functions
 */

import GameLocation from "../Models/GameLocation";
import ObjectLocation from "../Models/ObjectDimensions";
import DimensionProvider from "../Providers/DimensionProvider";
import KeyboardState from "../Store/Definitions/KeyboardState";
import Frames from "../Types/Frames";

/**
 * Gets the next X coordinats based on the angle, speed and the current X coordinate.
 * @param {number} angle. The angle.
 * @param {number} speed. The speed.
 * @param {number} current. The current X coordinate.
 * @returns {number}. The next X coordinate.
 */
export function getNextX(angle: number, speed: number, current: number): number {
    return Math.cos(angle * Math.PI / 180) * speed + current;
}

/**
 * Gets the next Y coordinate based on the angle, speed and the current Y coordinate.
 * @param {number} angle. The angle.
 * @param {number} speed. The speed.
 * @param {number} current. The current X coordinate.
 * @returns {number}. The next Y coordinate.
 */
export function getNextY(angle: number, speed: number, current: number): number {
    return Math.sin(angle * (Math.PI / 180)) * speed + current;
}

/**
 * getAngle.
 * @param {KeyboardState} state. Current keyboard dstate
 * @returns {number}. The angle. -1 indicated the ship is not moving.
 */
export function getAngle(state: KeyboardState): number {
    let angle = -1;
    if (state.up && state.left) {
        angle = 225;
    } else if (state.up && state.right) {
        angle = 315;
    } else if (state.down && state.left) {
        angle = 135;
    } else if (state.down && state.right) {
        angle = 45;
    } else if (state.left) {
        angle = 180;
    } else if (state.right) {
        angle = 0;
    } else if (state.up) {
        angle = 270;
    } else if (state.down) {
        angle = 90;
    }

    return angle;
}

/**
 * Calculates a new location.
 * @param {number} angle. The angle of the object.
 * @param {number} speed. The speed the of the object
 * @param {number} right. The right outer bounds where the object can travel
 * @param {number} bottom. The bottom bounds where the object can travel.
 * @param {number} left. The current left coordinate of the object.
 * @param {number} top. The current top coordinate of the object.
 * @param {number} objectWidth. The object's width in pixels.
 * @param {number} objectHeight. The object's height in pixels.
 * @returns {Location}. The new location of the object.
 */
export function getNewLocation(angle: number, speed: number, objectLocation: ObjectLocation): GameLocation {

    let nextLeft = getNextX(angle, speed, objectLocation.left);
    let nextTop = getNextY(angle, speed, objectLocation.top);

    if (nextTop < 0) {
        nextTop = 0;
    }

    if (nextLeft < 0) {
        nextLeft = 0;
    }

    if (nextTop  > objectLocation.bottom) {
        nextTop = objectLocation.bottom;
    }

    if (nextLeft  > objectLocation.right) {
        nextLeft = objectLocation.right;
    }

    return {
        left: nextLeft,
        top: nextTop,
    };
}

/**
 * Get's the dimensions of a 2d array.
 * @param {any[]}. Any array.
 * @returns {rows: number, columns: number}. The dimensions of the 2d array.
 */
export function get2dArrayDimensions(array: any[][]): { rows: number, columns: number } {
    return {
        rows: array.length,
        columns: array[0].length,
    };
}

/**
 * Returns a random element from an array
 * @param {T[]} arr. An array of type T.
 * @returns {T}. Value found in a random position.
 */
export function getRandomArrayElement<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length - 1)];
}

/**
 * Returns a number between 0 and the number of elements in the array.
 * @param {any[]} arr. An array of any type.
 * @returns {number}. A randomly selected index from the array.
 */
export function getRandomArrayIndex(arr: any[]): number {
    return Math.floor(Math.random() * arr.length - 1);
}

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
                if (cell !== "0") {
                    frames[key][rowIndex][cellIndex] = color;
                }
            });
        });
    });
}

/**
 * Calculates the object's left, top, right, bottom coordinates.
 * @param {GameLocation} location. The location.
 * @param {string[][]} frame. A frame of the object.
 */
export function calculateObjectLocation(location: GameLocation, frame: string[][]): ObjectLocation {

    const width = frame[0].length;
    const height = frame.length;

    return {
        left: location.left,
        top: location.top,
        right: location.left + width * DimensionProvider().pixelSize,
        bottom: location.top + height * DimensionProvider().pixelSize,
    };
}

/**
 * Creates a clone for the provides Frames.
 * @param {Frames} frames. Frames to clone.
 * @returns {Frames}. A clone of the provided frames.
 */
export function cloneFrames(frames: Frames): Frames {
    const clonedFrames = {} as Frames;

    Object.keys(frames).forEach((key) => clonedFrames[key] = [...frames[key]]);

    return clonedFrames;
}