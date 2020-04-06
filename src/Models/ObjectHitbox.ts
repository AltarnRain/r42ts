/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          ObjectHitBox
 * Responsibility:  Combines a hitbox with the object it belongs to.
 */

import BaseGameObject from "../Base/BaseGameObject";
import { GameRectangle } from "./GameRectangle";

export interface ObjectHitbox {

    /**
     * The object's hitbox.
     */
    hitbox: GameRectangle;

    /**
     * The game object.
     */
    object: BaseGameObject;
}
