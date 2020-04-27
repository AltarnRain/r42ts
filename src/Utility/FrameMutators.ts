/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { Frame as FrameType, Frames as FramesType} from "../Types/Types";
import hexToCGAConverter from "./HexToCGAConverter";

/**
 * Module:          Functions that mutate frames.
 * Responsibility:  Update frames with colors.
 */

namespace Mutators {

    export namespace Frames {

        /**
         * Sets a cell's color to the passed color. Doesn't matter if they're variable (V).
         * @param {Frames} frames. All frames.
         */
        export function setColor(frames: FramesType, color: string): void {
            for (const frame of frames) {
                Frame.setColor(frame, color);
            }
        }

        /**
         * Updates a frame to actual CGA colors.
         * @param {Frames} frames. All frames.
         */
        export function convertHexToCGA(frames: FramesType): void {
            for (const frame of frames) {
                Frame.convertHexToCGA(frame);
            }
        }
    }

    export namespace Frame {
        /**
         * Set the predefined color for a single frame.
         * @param {Frame} frame. A single frame.
         */
        export function convertHexToCGA(frame: FrameType) {
            frame.forEach((row, rowIndex) => {
                row.forEach((cellColor, cellIndex) => {
                    if (cellColor !== "0") {
                        frame[rowIndex][cellIndex] = hexToCGAConverter(cellColor);
                    }
                });
            });
        }

        /**
         * Sets a frame colors when the color is not black ("0")
         * @param {Frame} frame. A frame
         * @param {string} color. A color
         */
        export function setColor(frame: FrameType, color: string) {
            frame.forEach((row, rowIndex) => {
                row.forEach((cellColor, cellIndex) => {
                    if (cellColor !== "0") {
                        frame[rowIndex][cellIndex] = color;
                    }
                });
            });
        }
    }
}

export default Mutators;