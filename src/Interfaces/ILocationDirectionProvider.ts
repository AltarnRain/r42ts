/**
 * @preserve Copyright 2010-2020s Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import ILocationProvider from "./ILocationProvider";

/**
 * Module:          ILocationDirectionProvider
 * Responsibility:  A location provider that implements a GetDirection method.
 */

export default interface ILocationDirectionProvider extends ILocationProvider {
    getDirection(): "left" | "right" | "up" | "down" | undefined;

    isAttacking(): boolean;
}
