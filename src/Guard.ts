/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BulletParticle from "./Particles/BulletParticle";
import Particle from "./Particles/Particle";
import { allGameKeys, GameKeys } from "./Utility/KeyboardEvents";

/**
 * Module:          Guard
 * Responsibility:  TypeGuards
 */

export function isEnemyBullet(particle: Particle): particle is BulletParticle {
    return particle && particle.getObjectType() === "enemybullet";
}

export function isValidGameKey(value: string): value is GameKeys {
    return allGameKeys.indexOf(value as GameKeys) !== -1;
}