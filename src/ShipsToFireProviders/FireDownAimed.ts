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
 * Module:          Ships fire down when the player moves under neath this. Enemies can fire multiple bullets.
 * Responsibility:  Ships to fire function for the devil enemy.
 */

const {
    pixelSize2x
} = dimensionProvider();

/**
 * A function that selects the orbs that should fire.
 * @param {number} tick. Current tick
 * @param {number} maxBullets. Maximum amount of bullets the enemies can collectivy fire.
 * @param {number} fireOnFrame. Optional. When provided, enemies will only be eligable to fire when their current frame is equal to the fireOnFrame.
 */
export default function fireDownAimed(tick: number, maxBullets: number, fireOnFrames?: number[]): ShipToFire[] {

    const {
        enemyLevelState: { bullets, enemies },
    } = appState();
    const returnValue: ShipToFire[] = [];

    const remainingBullets = maxBullets - bullets.length;

    if (remainingBullets === 0) {
        return returnValue;
    }

    let candidates = getCandidates(tick);

    // Additional filter on enemies that ony fire on a specified frame.
    if (fireOnFrames !== undefined) {
        candidates = candidates.filter((es) => es.currentFrameIndex !== undefined && fireOnFrames.indexOf(es.currentFrameIndex) > -1);
    }

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