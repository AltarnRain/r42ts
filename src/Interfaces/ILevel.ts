/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          ILevel
 * Responsibility:  Contract for every level object.
 */

export default interface ILevel {
    start(): void;
    dispose(): void;
}
