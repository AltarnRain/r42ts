/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          TickHandler
 * Responsibility:  Handles a game tick.
 */

export default class TickHandler {

    private lastTick = 0;

    /**
     * Creates the TickHandler class.
     * @param {number} time. The time that should pass between ticks.
     * @param {() => void} onTickPassed. The function to call when the specified time has passed between ticks.
     */
    constructor(
        private time: number,
        private onTimePassed: () => void) {
    }

    /**
     * Tick
     * @param {number} tick. The current tick.
     */
    public tick(tick: number): void {
        if (tick - this.lastTick >= this.time) {
            this.onTimePassed();

            this.lastTick = tick;
        }
    }
}