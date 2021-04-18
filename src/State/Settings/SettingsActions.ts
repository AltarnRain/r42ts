/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          SettingsActions
 * Responsibility:  Actions for updating the settings state
 */

import { KeybindingsState } from "./KeybindingsState";
import { SetKeybindings, SetSpeed, SetToggleSound } from "./SettingsTypes";

export function setGameSpeedSetting(speed: number): SetSpeed {
    return {
        type: SettingsEnum.setGameSpeedSetting,
        speed,
    }
}

export function setSoundStateSetting(value: boolean): SetToggleSound {
    return {
        type: SettingsEnum.setSoundStateSetting,
        value
    }
}

export function setKeybindings(keybindings: KeybindingsState | undefined): SetKeybindings {
    return {
        type: SettingsEnum.setKeybindings,
        keybindings,
    }
}