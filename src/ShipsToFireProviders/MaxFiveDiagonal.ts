/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          MaxFiveDiagonal
 * Responsibility:  Provides 5 enemies to fire.
 */

import { angles } from "../Constants/Angles";
import Guard from "../Guard";
import ShipToFire from "../ShipsToFire";
import { EnemyState } from "../State/EnemyLevel/EnemyState";
import { appState } from "../State/Store";
import { Angle } from "../Types";
import { calculateAngle, calculateAngleDifference } from "../Utility/Geometry";

const maxBullets = 5;

type Candidates = Array<{ enemy: EnemyState, angleDifference: number, angle: number }>;

/**
 * A function that selects the orbs that should fire.
 * @param {number} tick. Current tick
 */
export default function maxFiveDiagonal(tick: number): ShipToFire[] {

    const {
        enemyLevelState: { bullets }
    } = appState();
    const returnValue: ShipToFire[] = [];

    const bulletsToFire = maxBullets - bullets.length;

    if (bulletsToFire > 0) {
        const candidates = getBestCandiates(tick);

        if (candidates.length > 0) {
            for (let b = 0; b < bulletsToFire; b++) {

                let index = b;

                // If the number of bullets is more than the candidates the best
                // Candidate gets to fire.
                if (candidates.length <= b) {
                    index = 0;
                }

                const candiate = candidates[index];

                const { enemy, angle } = candiate;

                // Each orb can only have a single bullet on screen.
                const hasBulletOnScreen = bullets.some((bullet) => bullet.owner === enemy.enemyId);
                if (!hasBulletOnScreen) {
                    returnValue.push({ enemy, angle });
                }

            }
        }
    }

    return returnValue;
}

/**
 * Returns candicates for firing.
 */
function getBestCandiates(tick: number): Candidates {

    const {
        enemyLevelState: { enemies, fireInterval },
        playerState
    } = appState();

    if (!Guard.isPlayerAlive(playerState)) {
        return [];
    }

    // To determine which enemies have the best change of hitting
    // the player we calculate difference between the angle at which the
    // enemy will fire vs the angle towards the player.
    const candidates: Candidates = [];

    const enemesThatCanFire = enemies.filter((e) => e.lastFireTick + fireInterval < tick);

    let above = 0;
    let below = 0;
    for (const enemy of enemesThatCanFire) {
        const center = enemy.centerLocation;

        if (center) {
            const angleToPlayer = calculateAngle(center.left, center.top, playerState.left, playerState.top);
            const angle = getBestAngle(enemy);

            if (center.top > playerState.hitboxes.middle.bottom) {
                below += 1;
            } else {
                above += 1;
            }

            if (angle !== undefined && angleToPlayer !== undefined) {
                const angleDifference = calculateAngleDifference(angle, angleToPlayer);
                candidates.push({ enemy, angleDifference, angle });
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

    return candidates;
}

/**
 * Retuns the best angle for an enemy.
 * @param {EnemyState} enemy. Single enemy.
 */
function getBestAngle(enemy: EnemyState): Angle {

    const {
        playerState,
        enemyLevelState: { enemies }
    } = appState();

    // do nothin when the player is dead.
    if (!Guard.isPlayerAlive(playerState)) {
        return undefined;
    }

    const { hitboxes } = playerState;

    // Increase the change the orb enemy will fire down as its numbers are reduced.
    const rnd = Math.ceil(Math.random() * enemies.length / 1.5);
    const canFireDown = rnd === 1;

    if (canFireDown) {
        const {
            centerLocation,
        } = enemy;

        if (centerLocation !== undefined) {
            // Check if it makes sense for the orb to fire down. If not, it'll pick one of its diagonal angles.
            if (centerLocation.left >= hitboxes.middle.left && centerLocation.left <= hitboxes.middle.right) {
                return angles.down;
            }
        }
    }

    if (enemy.offsetLeft < hitboxes.middle.left) {
        return angles.rightdown;
    } else {
        return angles.leftdown;
    }
}