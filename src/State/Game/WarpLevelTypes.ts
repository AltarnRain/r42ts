/**
 * Steps. Defines the number of pixels in X and Y how much a warp level
 * can go left or right.
 */
export interface WarpLevelSteps {
    /**
     * Steps, in game pixels, a warp level can take to the left or right. These are picked at random
     * To increase the odds of a step occuring, add another step.
     */
    stepsX: WarpLevelStepSizes[];

    /**
     * Steps, in game pixels, a warp level can take upward. These are picker at random.
     */
    stepsY: WarpLevelStepSizes[];
}

/**
 * Permitted steps in game pixels of the x and y directions.
 */
export type WarpLevelStepSizes = 0 | 2 | 4 | 6 | 8;

/**
 * Defines complexities for warp levels.
 */
export type WarpLevelComplexity = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

/**
 * Defines valid warp level steps.
 */
export type WarpLevelComplexitySteps = { [k in WarpLevelComplexity]: WarpLevelSteps };