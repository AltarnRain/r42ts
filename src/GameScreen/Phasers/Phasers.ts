/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import DimensionProvider from "../../Providers/DimensionProvider";
import renderFrame from "../../Render/RenderFrame";
import { cloneObject } from "../../Utility/Lib";
import Phaser from "./PhaserFrame";

/**
 * Module:          Level indicator
 * Responsibility:  Show the level the player is playing
 */

/**
 * Current phaser.
 */
let phaserCount: number = 1;

// Calculate positions. These never change.
const startPosition = DimensionProvider().maxPixelSize * 46;
const spacing = DimensionProvider().maxPixelSize * 2;
const maxDraw = 10;
const frames = cloneObject(Phaser);

/**
 * Set the phaser.
 * @param {number} value. Value to set the phaser to.
 */
export function setPhasers(value: number): void {
    phaserCount = value;
}

/**
 * Adds one phaser.
 */
export function addPhaser(): void {
    phaserCount++;
}

/**
 * Removes one phaser
 */
export function removePhaser(): void {
    phaserCount--;
}

/**
 * Gets the number of phasers available to the player.
 * @returns {number}. The number of phasers.
 */
export function getPhaserCount(): number {
    return phaserCount;
}

/**
 * Draw the phaser indicator.
 */
export function draw(): void {

    for (let i = 0; i < phaserCount; i++) {
        const actualSpacing = i === 0 ? 0 : spacing;
        const left = startPosition + i * DimensionProvider().maxPixelSize + i * actualSpacing;
        if (i <= maxDraw) {
            renderFrame({
                left,
                top: 0
            }, frames);
        }
    }
}
