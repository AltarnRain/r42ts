/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          AppState
 * Responsibility:  Defines the application state
 */

import DimensionState from "./Definitions/DimensionState";

export default interface AppState {
    /**
     * Dimension state
     */
    dimensionState: DimensionState;
}
