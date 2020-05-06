/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          OrbsTofire
 * Responsibility:  Provide a function which orbs are best suited to fire a bullet.
 */

import { EnemyState } from "../../State/EnemyLevel/EnemyState";
import { appState } from "../../State/Store";
import { FireAngleProviderFunction } from "../../Types";
import { calculateAngle, calculateAngleDifference } from "../../Utility/Geometry";

/**
 * A function that selects the orbs that should fire.
 * @param {number} tick. Current tick
 */
export default function orbsToFire(orbs: EnemyState[], fireAngleProvider?: FireAngleProviderFunction): EnemyState[] {

    if (fireAngleProvider === undefined) {
        throw new Error("Fire angle provider is required for OrbsToFire");
    }

    const {
        playerState,
    } = appState();

    if (!playerState.playerOnScreen) {
        return [];
    }

    const playerhitbox = playerState.playerHitbox;
    if (playerhitbox === undefined) {
        return [];
    }

    // To determine which enemies have the best change of hitting
    // the player we calculate difference between the angle at which the
    // enemy will fire vs the angle towards the player.
    const candidates: Array<{ ship: EnemyState, angleDifference: number, angle: number }> = [];

    let above = 0;
    let below = 0;
    for (const orb of orbs) {
        const center = orb.centerLocation;

        if (center) {
            const angle = fireAngleProvider(orb, orb.offsetLeft, orb.offsetTop);
            const angleToPlayer = calculateAngle(center.left, center.top, playerState.playerLeftLocation, playerState.playerTopLocation);

            if (center.top > playerhitbox.bottom) {
                below += 1;
            } else {
                above += 1;
            }

            if (angle !== undefined && angleToPlayer !== undefined) {
                const angleDifference = calculateAngleDifference(angle, angleToPlayer);
                candidates.push({ ship: orb, angleDifference, angle });
            }
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