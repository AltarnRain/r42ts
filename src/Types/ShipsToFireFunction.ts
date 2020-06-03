/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import ShipToFire from "../ShipsToFire";

/**
 * Module:          ShipsToFireFunction
 * Responsibility:  Refine a typing for a functions that returns ShipToFire models.
 */

/**
 * A function that pulls in state to determine which ships should fire.
 */
type ShipsToFireFunction = (tick: number) => ShipToFire[];

export default ShipsToFireFunction;