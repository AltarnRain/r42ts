/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { addPhaser, nextLevel } from "../State/Game/GameActions";
import { dispatch } from "../State/Store";

/**
 * Module:          HandleLevelWon
 * Responsibility:  Define what should happen when the player wins a level.
 */

export default function handleLevelWon(): void {
    // Add a phaser because that's a level won reward.
    dispatch(addPhaser());

    // Move to the next level.
    dispatch(nextLevel());
}