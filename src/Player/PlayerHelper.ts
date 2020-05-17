/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { GameRectangle } from "../Models/GameRectangle";
import { PlayerHitboxes } from "../State/Player/PlayerState";
import { overlaps } from "../Utility/Geometry";

/**
 * Module:          PlayerHelper
 * Responsibility:  Helper functions to aid with player related logic.
 */

/**
 * Determines if one of the player's hitboxes overlaps with the provided hitbox.
 * @export
 * @param {PlayerHitboxes} playerHitboxes. The player's hitboxes.
 * @param {GameRectangle} hitbox. Another hitbox.
 * @returns {boolean}. True if there's overlap. False other or if any of the hitboxes is undefined.
 */
export default function playerIsHit(playerHitboxes: PlayerHitboxes | undefined, hitbox: GameRectangle | undefined): boolean {
    if (playerHitboxes === undefined) {
        return false;
    }

    if (hitbox === undefined) {
        return false;
    }

    const hitMiddle = overlaps(playerHitboxes.middle, hitbox);
    const hitBottom = overlaps(playerHitboxes.bottom, hitbox);

    return hitMiddle || hitBottom;
}