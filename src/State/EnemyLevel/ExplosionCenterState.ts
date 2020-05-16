/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { Frame } from "../../Types";

/**
 * Module:          ExplocionCenterState
 * Responsibility:  Define the properties of an explosion center. Explosion Center briefly appear on screen
 *                  when an object is destroyed.
 */

export interface ExplosionCenterState {
    /**
     * Left position on screen in real pixels.
     */
    left: number;

    /**
     * Top position on screen in real pixels.
     */
    top: number;

    /**
     * Tick when the explosion center first appeared.
     */
    startTick: number;

    /**
     * Frame of the explision coloured in.
     */
    coloredFrame: Frame;

    /**
     * Time the explosion remains on the screen.
     */
    explosionCenterDelay: number;
}
