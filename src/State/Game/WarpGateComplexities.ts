/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { WarpLevelComplexity, WarpLevelComplexitySteps, WarpLevelSteps } from "./WarpLevelTypes";

/**
 * Module:          WarpGateComplexities
 * Responsibility:  Defines the complexity levels for warp gates.
 */

/**
 * Typed constants that defined the warp gate complexities.
 */
const warpLevelComplexities: WarpLevelComplexitySteps = {
    0: {
        stepsX: [0, 2, 2, 4],
        stepsY: [4, 4, 6, 8]
    },
    1: {
        stepsX: [0, 2, 2, 4],
        stepsY: [4, 4, 6, 6],
    },
    2: {
        stepsX: [0, 2, 2, 4],
        stepsY: [4, 4, 4, 6],
    },
    3: {
        stepsX: [2, 2, 4, 4],
        stepsY: [2, 4, 4, 6],
    },
    4: {
        stepsX: [2, 2, 2, 4],
        stepsY: [2, 2, 4],
    },
    5: {
        stepsX: [2, 2, 2, 4],
        stepsY: [2, 2, 4],
    },
    6: {
        stepsX: [2, 2, 4, 4],
        stepsY: [2, 4],
    },
    7: {
        stepsX: [2, 2, 4, 4],
        stepsY: [2],
    },
    8: {
        stepsX: [2, 2, 4, 4],
        stepsY: [2],
    }
};

export default function getWarpGateComplexity(complexity: WarpLevelComplexity): WarpLevelSteps {
    return warpLevelComplexities[complexity];
}