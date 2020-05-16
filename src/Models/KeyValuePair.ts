/**
 * @preserve Copyright 2010-2020s Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          KeyValuePair
 * Responsibility:  A Key and a Value. Paired. Didn't see that one coming? No, neither did I.
 */

export default interface KeyValuePair {
    /**
     * The key
     */
    key: string;

    /**
     * The value.
     */
    value: string;
}
