/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { KeybindingsState } from "./KeybindingsState";
import SettingsEnum from "./SettingsEnum";

/**
 * Module:          SettingsTypes
 * Responsibility:  Definitions for actions dispatched to update the SettingsState
 */
export interface SetSpeed {
    type: typeof SettingsEnum.setGameSpeedSetting;
    speed: number;
}

export interface SetToggleSound {
    type: typeof SettingsEnum.setSoundStateSetting;
    value: boolean;
}

export interface SetKeybindings {
    type: typeof SettingsEnum.setKeybindings;
    keybindings: KeybindingsState;
}

export type SettingsStateTypes = SetSpeed | SetToggleSound | SetKeybindings;
