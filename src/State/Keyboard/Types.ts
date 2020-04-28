import { GameKeys } from "../../Utility/KeyboardEvents";
import Constants from "./Constants";

export interface KeyUp {
    type: typeof Constants.keyup;
    payload: GameKeys;
}

export interface KeyDown {
    type: typeof Constants.keydown;
    payload: GameKeys;
}

export type KeyboardTypes = KeyUp | KeyDown;