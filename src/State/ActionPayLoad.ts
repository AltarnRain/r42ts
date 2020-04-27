/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          ActionPayload
 * Responsibility:  Define an extention to default redux action that allow for any payload.
 */

import { Action } from "redux";
import GameActions from "./GameActions";

/**
 * An action that can carry a payload to a reducer.
 */
export default interface ActionPayload<T> extends Action<GameActions> {

    /**
     * The optional payload. Can be any type.
     */
    payload?: T;
}