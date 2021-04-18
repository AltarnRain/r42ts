/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          SettingsState
 * Responsibility:  State of the game's settings
 */

import { KeybindingsState } from "./KeybindingsState";

export default interface SettingsState{
    playSound: boolean;
    gameSpeed: number;
    keybindings: KeybindingsState;
}
