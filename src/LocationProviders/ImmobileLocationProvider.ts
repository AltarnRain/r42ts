/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import ILocationProvider from "../Base/ILocationProvider";
import { GameLocation } from "../Models/GameLocation";

/**
 * Module:          Immobile
 * Responsibility:  A location provides that simply returns the location it was given.
 */

export default class ImmobileLocationProvider implements ILocationProvider {

    /**
     * Constructs the immobile location provider.
     */
    constructor(private left: number, private top: number) {
    }
    public updateState(tick: number): void {
        // does nothing.
    }

    public increaseSpeed(factor: number): void {
        // Does nothing.
    }

    /**
     * Returns the given location.
     */
    public getCurrentLocation(): GameLocation {
        return { left: this.left, top: this.top };
    }
}