import { WarpLevelComplexity, WarpLevelComplexties, WarpLevels } from "./WarpLevelTypes";

/**
 * Typed constants that defined the warp gate complexities.
 */
const warpLevelComplexities: WarpLevelComplexties = {
    4: {
        stepsX: [0, 2, 2, 4],
        stepsY: [4, 4, 6, 8]
    },
    8: {
        stepsX: [0, 2, 2, 4],
        stepsY: [4, 4, 6, 6],
    },
    12: {
        stepsX: [0, 2, 2, 4],
        stepsY: [4, 4, 4, 6],
    },
    16: {
        stepsX: [2, 2, 4, 4],
        stepsY: [2, 4, 4, 6],
    },
    20: {
        stepsX: [2, 2, 2, 4],
        stepsY: [2, 2, 4],
    },
    24: {
        stepsX: [2, 2, 2, 4],
        stepsY: [2, 2, 4],
    },
    28: {
        stepsX: [2, 2, 4, 4],
        stepsY: [2, 4],
    },
    32: {
        stepsX: [2, 2, 4, 4],
        stepsY: [2],
    },
    36: {
        stepsX: [2, 2, 4, 4],
        stepsY: [2],
    }
};

export default function getWarpGateComplexity(warpLevel: number): WarpLevelComplexity | undefined{
    return warpLevelComplexities[warpLevel];
}