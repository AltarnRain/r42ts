/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { BaseEnemy } from "./Base/BaseEnemy";
import BulletParticle from "./Particles/BulletParticle";
import Particle from "./Particles/Particle";
import PlayerBullet from "./Player/PlayerBullet";
import PlayerShip from "./Player/PlayerShip";
import { allGameKeys, GameKeys } from "./Utility/KeyboardEvents";

/**
 * Module:          Guard
 * Responsibility:  TypeGuards
 */

namespace Guard {
    export function isEnemyBullet(particle: Particle): particle is BulletParticle {
        return particle && particle.getObjectType() === "enemybullet";
    }

    export function isValidGameKey(value: string): value is GameKeys {
        return allGameKeys.indexOf(value as GameKeys) !== -1;
    }

    /**
     * TypeGuard that checks if the player is alive.
     * @param {PlayerShip | undefined}. A player object.
     * @returns {boolean}. Returns true if the player is alove.
     */
    export function isPlayerAlive(value: PlayerShip | undefined): value is PlayerShip {
        return value !== undefined;
    }

    /**
     * TypeGuard for enemies
     */
    export function isEnemy(value: any): value is BaseEnemy {
        return value && value.getObjectType() === "enemy";
    }

    export function isPlayerBulletActive(value: any): value is PlayerBullet {
        return value;
    }
}

export default Guard;
