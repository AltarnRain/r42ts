/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          ActionPayload<any>
 * Responsibility:  Defines an action with a payload
 */

import { Action } from "redux";
import { GameActions } from "./GameActions";

export default interface ActionPayload extends Action {
    /**
     * The type of action.
     */
    type: GameActions;

    /**
     * Payload. Can be any object.
     */
    payload: any;
}
