/**
 * Steps. Defines the number of pixels in X and Y how much a warp level
 * can go left or right.
 */
export interface WarpLevelComplexity {
    stepsX: number[];
    stepsY: number[];
}

/**
 * Defines valid warp level steps.
 */
export type WarpLevelComplexties = { [k in string]: WarpLevelComplexity };
