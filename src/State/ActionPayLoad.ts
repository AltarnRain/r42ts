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