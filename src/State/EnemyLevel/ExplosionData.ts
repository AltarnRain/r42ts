/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          ExplosionData
 * Responsibility:  Response for holding information about explosions that are reusable for every explosion
 */

export interface ExplosionData {
    /**
     * With of the explosion.
     * @type {number}
     * @memberof ExplosionData
     */
    explosionWidth: number;

    /**
     * The hight of the explosion
     * @type {number}
     * @memberof ExplosionData
     */
    explosionHeight: number;

    /**
     * Time the explosion remains on the screen.
     * @type {number}
     * @memberof ExplosionData
     */
    explosionCenterDelay: number;
}