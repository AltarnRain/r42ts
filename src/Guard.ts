/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseEnemy from "./Base/BaseEnemy";
import PlayerState, { AlivePlayer } from "./State/Player/PlayerState";
import { allGameKeys, GameKeys } from "./Utility/KeyboardEvents";

/**
 * Module:          Guard
 * Responsibility:  TypeGuards
 */

namespace Guard {
    export function isValidGameKey(value: string): value is GameKeys {
        return allGameKeys.indexOf(value as GameKeys) !== -1;
    }

    /**
     * TypeGuard for enemies
     */
    export function isEnemy(value: any): value is BaseEnemy {
        return value && value.getObjectType() === "enemy";
    }

    /**
     * Checks if the player is alive (and if the hitboxes and nozzleLocation are defined)
     * @param {PlayerState} value.
     * @returns {AlivePlayer}. An interface that extends PlayerState but changes 'type' | undefined o just the type.
     */
    export function isPlayerAlive(value: PlayerState): value is AlivePlayer {
        return value.alive && value.hitboxes !== undefined && value.nozzleLocation !== undefined;
    }
}

export default Guard;
