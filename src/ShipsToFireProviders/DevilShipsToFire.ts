/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { angles } from "../Constants/Angles";
import Guard from "../Guard";
import dimensionProvider from "../Providers/DimensionProvider";
import ShipToFire from "../ShipsToFire";
import { EnemyState } from "../State/EnemyLevel/EnemyState";
import { appState } from "../State/Store";
import { GetShipsReadyToFire } from "./GetShipsReadyToFire";

/**
 * Module:          Devil
 * Responsibility:  Ships to fire function for the devil enemy.
 */

const maxBullets = 3;

const {
    pixelSize2x
} = dimensionProvider();

/**
 * A function that selects the orbs that should fire.
 * @param {number} tick. Current tick
 */
export default function devilShipsToFire(tick: number): ShipToFire[] {

    const {
        enemyLevelState: { bullets, enemies },
    } = appState();
    const returnValue: ShipToFire[] = [];

    const remainingBullets = maxBullets - bullets.length;

    if (remainingBullets === 0) {
        return returnValue;
    }

    const candidates = getCandidates(tick);

    if (candidates.length === 0) {
        return returnValue;
    }

    const enemyToFire = candidates[0];

    if (enemyToFire !== undefined) {
        const queuedTofire = returnValue.find((e) => e.enemy.enemyId === enemyToFire.enemyId) !== undefined;
        const mayFire = enemies.length < maxBullets || !bullets.some((bullet) => bullet.owner === enemyToFire.enemyId);
        if (!queuedTofire && mayFire) {
            returnValue.push({ enemy: enemyToFire, angle: angles.down });
        }
    }

    return returnValue;
}

function getCandidates(tick: number): EnemyState[] {

    const {
        playerState
    } = appState();

    if (!Guard.isPlayerAlive(playerState)) {
        return [];
    }

    const { hitboxes: { bottom: bottomhitbox } } = playerState;

    return GetShipsReadyToFire(tick).filter((enemy) => enemy.hitbox.left + pixelSize2x >= bottomhitbox.left && enemy.hitbox.right <= bottomhitbox.right + pixelSize2x);
}