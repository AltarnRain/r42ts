import GameRectangle from "../Models/GameRectangle";
/**
 * Module:          StateHelper
 * Responsibility:  Providers quality of life functions that pull data from the state of combine's dispatches.
 */

export interface IHitbox {
    /**
     * A function that returns a game rectangle.
     * @returns {GameRectangle}
     * @memberof IHitbox
     */
    getHitbox(): GameRectangle;
}
