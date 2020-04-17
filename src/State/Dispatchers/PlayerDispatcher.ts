/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import Player from "../../Player/Player";
import PlayerBullet from "../../Player/PlayerBullet";
import { PlayerFormationPhases } from "../../Types/Types";
import ActionPayload from "../ActionPayLoad";
import GameActions from "../GameActions";
import { dispatch } from "../Store";

/**
 * Module:          PlayerDispatcher
 * Responsibility:  Dispatches player actions.
 */

export function setPlayer(player: Player): void {
    dispatch({
        type: GameActions.setPlayer,
        payload: player,
    });
}

export function setBullet(bullet: PlayerBullet): void {
    dispatch({
        type: GameActions.setBullet,
        payload: bullet,
    });
}

export function setPlayerFormationPhase(phase: PlayerFormationPhases): void {
    dispatch({
        type: GameActions.setPlayerFormationPhase,
        payload: phase,
    });
}