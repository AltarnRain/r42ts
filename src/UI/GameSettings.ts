/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { KeybindingsModel } from "./KeybindingsModel";

/**
 * Module:          GameSettings
 * Responsibility:  Provide a definition for game settings
 */

export default interface GameSettings {
    playSound: boolean;
    gameSpeed: number;
    keybindings: KeybindingsModel;
}