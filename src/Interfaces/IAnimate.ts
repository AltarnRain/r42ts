/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          IExecute
 * Responsibility:  Can be executed
 */

export default interface IAnimate {
    animate(tick: number): void;
}
