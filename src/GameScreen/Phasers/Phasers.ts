/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import DimensionProvider from "../../Providers/DimensionProvider";
import renderFrame from "../../Render/RenderFrame";
import { appState } from "../../State/Store";
import { cloneObject } from "../../Utility/Lib";
import Phaser from "./PhaserFrame";

/**
 * Module:          Level indicator
 * Responsibility:  Show the level the player is playing
 */

// Calculate positions. These never change.
const startPosition = DimensionProvider().maxPixelSize * 46;
const spacing = DimensionProvider().maxPixelSize * 2;
const maxDraw = 10;
const frames = cloneObject(Phaser);

/**
 * Draw the phaser indicator.
 */
export function draw(): void {
    const { gameState } = appState();
    for (let i = 0; i < gameState.phasers; i++) {
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
