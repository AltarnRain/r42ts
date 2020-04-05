/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Base class for enemies.
 * Responsibility:  Base class for enemies.
 */

import { BaseDestructableObject } from "./BaseDestructableObject";

export abstract class BaseEnemyObject extends BaseDestructableObject {

    /**
     * Returns the point worth.
     */
    public abstract getPoints(): number;
}