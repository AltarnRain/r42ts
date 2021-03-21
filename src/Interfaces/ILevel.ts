/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          ILevel
 * Responsibility:  Contract for every level object.
 */

export default interface ILevel {
    /**
     * Every level has a start method that sets up the level.
     */
    begin(): Promise<void>;

    /**
     * Every level has a dispose method where it can remove GameLoop subscriptions.
     */
    dispose(): void;
}
