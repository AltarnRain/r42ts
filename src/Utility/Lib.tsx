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
import KeyboardState from "../Store/Definitions/KeyboardState";

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
export function getNewLocation(angle: number, speed: number, right: number, bottom: number, left: number, top: number, objectWidth: number, objectHeight: number): GameLocation {

    let nextLeft = getNextX(angle, speed, left);
    let nextTop = getNextY(angle, speed, top);

    if (nextTop < 0) {
        nextTop = 0;
    }
    if (nextLeft < 0) {
        nextLeft = 0;
    }
    if (nextTop + objectHeight > bottom) {
        nextTop = bottom - objectHeight;
    }
    if (nextLeft + objectWidth > right) {
        nextLeft = right - objectWidth;
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
export function setRandomFrameColors(frames: string[][][], colors: string[]): string[][][] {
    const returnValue: string[][][] = [];
    frames.forEach((frame, frameIndex) => {
        const color = getRandomArrayElement(colors);
        frame.forEach((row, rowIndex) => {
            returnValue[frameIndex][rowIndex] = [];
            row.forEach((cell, cellIndex) => {
                if (cell === "V") {
                    // If the cell value is not V, keep the old cell value.
                    returnValue[frameIndex][rowIndex][cellIndex] = color;
                } else {
                    returnValue[frameIndex][rowIndex][cellIndex] = cell;
                }
            });
        });
    });

    return returnValue;
}

// export const levelProvider = (level: number, right: number, bottom: number): JSX.Element[] => {
//     const levelInfo = Levels["level" + level.toString()];

//     const elements: JSX.Element[] = [];

//     if (levelInfo) {
//         for (let i = 0; i < levelInfo.numberOfEnemies; i++) {
//             elements.push(enemyProvider(levelInfo.enemy, right, bottom, i));
//         }
//     }

//     return elements;
// };

// const enemyProvider = (enemyType: EnemyType, right: number, bottom: number, key: number): JSX.Element => {
//     switch (enemyType) {
//         case "Bird":
//             return <Bird key={key} right={right} bottom={bottom} />;
//         default:
//             return <div key={key}>Enemy {enemyType} could not be found</div>;
//     }
// };