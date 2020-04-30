/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          OrbsTofire
 * Responsibility:  Provide a function which orbs are best suited to fire a bullet.
 */

import { BaseEnemy } from "../../Base/BaseEnemy";
import { appState } from "../../State/Store";
import { calculateAngle, calculateAngleDifference } from "../../Utility/Geometry";

/**
 * A function that selects the orbs that should fire.
 * @param {number} tick. Current tick
 */
export default function orbsToFire(orbs: BaseEnemy[]): BaseEnemy[] {
    const {
        playerState,
    } = appState();

    if (playerState.ship === undefined) {
        return [];
    }

    const playerhitbox = playerState.ship.getHitbox();

    // To determine which enemies have the best change of hitting
    // the player we calculate difference between the angle at which the
    // enemy will fire vs the angle towards the player.
    const candidates: Array<{ ship: BaseEnemy, angleDifference: number, angle: number }> = [];

    let above = 0;
    let below = 0;
    for (const orb of orbs) {
        const enemyFireAngle = orb.getFireAngle();
        const center = orb.getCenterLocation();
        const angleToPlayer = calculateAngle(center.left, center.top, playerState.playerLeftLocation, playerState.playerTopLocation);

        if (orb.getCenterLocation().top > playerhitbox.bottom) {
            below += 1;
        } else {
            above += 1;
        }

        if (enemyFireAngle !== undefined && angleToPlayer !== undefined) {
            const angleDifference = calculateAngleDifference(enemyFireAngle, angleToPlayer);
            candidates.push({ ship: orb, angleDifference, angle: enemyFireAngle });
        }
    }

    // If the player is below the orbs, the ones with the lowest angle difference have the best shot
    // If the player is above the orbs, the situation is revesed.
    const sortFunction = above > below ? (a: number, b: number) => a < b : (a: number, b: number) => a > b;

    candidates.sort((e1, e2) => {
        if (sortFunction(e1.angleDifference, e2.angleDifference)) {
            return -1;
        } else {
            return 1;
        }
    });

    return candidates.map((c) => c.ship);
}