/**
 * Steps. Defines the number of pixels in X and Y how much a warp level
 * can go left or right.
 */
export interface WarpLevelComplexity {
    /**
     * Steps, in game pixels, a warp level can take to the left or right. These are picked at random
     * To increase the odds of a step occuring, add another step.
     */
    stepsX: WarpLevelSteps[];

    /**
     * Steps, in game pixels, a warp level can take upward. These are picker at random.
     */
    stepsY: WarpLevelSteps[];
}

export type WarpLevelSteps = 0 | 2 | 4 | 6 | 8;

/**
 * Defines valid warp level steps.
 */
export type WarpLevelComplexties = { [k in string]: WarpLevelComplexity };

/**
 * Valid warp levels
 */
export type WarpLevels = 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32 | 36;