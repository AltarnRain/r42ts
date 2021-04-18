/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import produce from "immer";
import SettingsManager from "../../UI/SettingsManager";
import SettingsState from "./SettingsState";
import { SettingsStateTypes } from "./SettingsTypes";

/**
 * Module:          SettingsReducer
 * Responsibility:  Reducer for game settings
 */

export function settingsReducer(state: SettingsState = init(), action: SettingsStateTypes): SettingsState {

    return produce(state, (draft) => {
        switch (action.type) {
            case SettingsEnum.setGameSpeedSetting:
                draft.gameSpeed = action.speed;
                break;
            case SettingsEnum.setKeybindings:

                // undefined means reset to default
                if (action.keybindings === undefined) {
                    draft.keybindings = SettingsManager.getDefaultKeyBindings();
                } else {
                    draft.keybindings = action.keybindings;
                }

                break;
            case SettingsEnum.setSoundStateSetting:
                draft.playSound = action.value;
                break;
        }
    });
}

/**
 * Init state with stored settings.
 */
function init(): SettingsState {
    return SettingsManager.getSettings();
}