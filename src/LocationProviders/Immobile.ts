/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseLocationProvider from "../Base/BaseLocationProvider";

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
    public getLocation(left: number, top: number, width: number, height: number): { left: number, top: number } {
        return { left, top };
    }
}