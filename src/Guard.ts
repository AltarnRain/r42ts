/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseParticle from "./Base/BaseParticle";
import BulletParticle from "./Particles/BulletParticle";

/**
 * Module:          Guard
 * Responsibility:  TypeGuards
 */

export function isEnemyBullet(particle: BaseParticle): particle is BulletParticle {
    return particle && particle.getObjectType() === "enemybullet";
}