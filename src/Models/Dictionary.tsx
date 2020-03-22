/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Dictionary
 * Responsibility:  Defines a dictionary.
 */

export default interface Dictionary<T> {
    [key: string]: T;
}
