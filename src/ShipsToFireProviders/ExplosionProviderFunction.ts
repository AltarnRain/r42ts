/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import Explosion from "../Models/Explosion";

/**
 * Module:          ExplosionProviderFunction
 * Responsibility:  Provide an explosion
 */

/**
 * Always provides a fresh explosion object.
 */
type ExplosionProviderFunction = () => Explosion;

export default ExplosionProviderFunction;