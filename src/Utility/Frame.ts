/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import Explosion from "../Models/Explosion";
import { GameLocation } from "../Models/GameLocation";
import { GameRectangle } from "../Models/GameRectangle";
import { GameSize } from "../Models/GameSize";
import dimensionProvider from "../Providers/DimensionProvider";
import { Frame } from "../Types";

/**
 * Module:          Frame
 * Responsibility:  Module for dealing with Frames.
 */

/**
 * Returns the dimensions of a frame in PX.
 * @param {Frame} frame. A frame.
 * @returns {width, height}.
 */
export function getFrameDimensions(frame: Frame): GameSize {

    const pixelSize = dimensionProvider().pixelSize;

    return {
        width: frame[0].length * pixelSize,
        height: frame.length * pixelSize,
    };
}

/**
 * Returns the maximum width and height for an array of frames.
 * @param {Frame[]} frames. Fram array.
 * @param {number?} pixelSize. Optional.
 */
export function getMaximumFrameDimensions(frames: Frame[]): GameSize {
    const allFrameDimensions = frames.map((f) => getFrameDimensions(f));

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
export function getFrameCenter(left: number, top: number, frame: Frame): GameLocation {
    const dimensions = getFrameDimensions(frame);

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
export function getRandomFrameKeyIndex(frames: Frame[]): number {
    const objectKeys = Object.keys(frames).length - 1;

    return Math.round(Math.random() * objectKeys);
}

/**
 * Returns a frame by index. Returns undefined if the frame is not defined.
 * @param {Frames} frames. Frames.
 * @param {number} index. Index of the frame.
 * @returns {Frame | undefined}. Returns the frame if one was found for the passed index, otherwise returns undefined.
 */
export function getFrameByIndex(frames: Frame[], index: number): Frame {
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
export function getFrameHitbox(left: number, top: number, frame: Frame, topOffset: number = 0, bottomOffset: number = 0): GameRectangle {
    const { width, height } = getFrameDimensions(frame);

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
export function copyFrames(frames: Frame[]): Frame[] {
    const newFrames: Frame[] = [];

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
    const newExplosion = { ...explosion };
    newExplosion.particleFrames = copyFrames(explosion.particleFrames);
    newExplosion.explosionCenterFrame = copyFrame(explosion.explosionCenterFrame);

    return explosion;
}

export function getExplosionReturner(explosion: Explosion): () => Explosion {
    const newExplosion = copyExplosion(explosion);

    return () => newExplosion;
}