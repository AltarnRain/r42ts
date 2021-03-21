/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import ILocationProvider from "../Interfaces/ILocationProvider";
import GameLocation from "../Models/GameLocation";

/**
 * Module:          Immobile
 * Responsibility:  A location provides that simply returns the location it was given. Used to debug.
 */

export default class ImmobileLocationProvider implements ILocationProvider {

    /**
     * Constructs the immobile location provider.
     */
    constructor(private left: number, private top: number) {
    }

    /**
     * Returns the given location.
     */
    public getCurrentLocation(): GameLocation {
        return {
            left: this.left,
            top: this.top
        };
    }

//#region Not implemented

    /**
     * Always returns 0
     */
    public getCurrentIndex(): number {
        return 0;
    }

    /**
     * Not implemented.
     */
    public updateState(tick: number): void {
        // does nothing.
    }

    /**
     * Not implemented
     */
    public increaseSpeed(factor: number): void {
        // Does nothing.
    }

//#endregion
}