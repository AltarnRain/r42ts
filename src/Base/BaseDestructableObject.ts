/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          BaseDestructableObject
 * Responsibility:  Base class for everything that goes boom!
 */

import Explosion from "../Models/Explosion";
import BaseGameObject from "./BaseGameObject";

export abstract class BaseDestructableObject extends BaseGameObject {

    /**
     * Get the explosion asset for this object. Returns undefined if the game object doesn't have an explosion.
     * For example: bullets and particles.
     */
    public abstract getExplosion(): Explosion;
}