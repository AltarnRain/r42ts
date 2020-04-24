/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseLocationProvider from "../Base/BaseLocationProvider";
import GameLocation from "../Models/GameLocation";

/**
 * Module:          Immobile
 * Responsibility:  A location provides that simply returns the location it was given.
 */

export default class Immobile extends BaseLocationProvider {

    /**
     * Constructs the immobile location provider.
     */
    constructor() {
        super(0, 0);
    }

    /**
     * Returns the given location.
     */
    public getLocation(location: GameLocation, width: number, height: number): GameLocation {
        return {...location};
    }
}