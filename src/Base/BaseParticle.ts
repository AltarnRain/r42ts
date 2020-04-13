/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { GameObjectType } from "../Types/Types";
import BaseGameObject from "./BaseGameObject";

/**
 * Module:          ParticleBase
 * Responsibility:  Base class for all particles
 */

export default abstract class BaseParticle extends BaseGameObject {

    /**
     * Returns true if the particle is still traveling.
     */
    public abstract traveling(): boolean;

    /**
     * Return the object type.
     * @returns {GameObjectType}. Particle.
     */
    public getObjectType(): GameObjectType {
        return "particle";
    }
}