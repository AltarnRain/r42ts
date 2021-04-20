/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { Settings } from "../State/Game/UITypes";
import { KeybindingsState } from "../State/Settings/KeybindingsState";
import { setGameSpeedSetting, setKeybindings, setSoundStateSetting } from "../State/Settings/SettingsActions";
import SettingsState from "../State/Settings/SettingsState";
import { dispatch } from "../State/Store";
import StorageKeys from "./StorageKeys";

/**
 * Module:          SettingsManager
 * Responsibility:  Provider and stores game settings.
 */

export namespace SettingsManager {

    /**
     * getSettings
     * @returns {GameSettings}. Game settings object.
     */
    export function getSettings(): SettingsState {

        const playSound = window.localStorage.getItem(StorageKeys.playSound);
        const gameSpeed = window.localStorage.getItem(StorageKeys.gameSpeed);
        const keybindings = window.localStorage.getItem(StorageKeys.keybindings);

        return {
            gameSpeed: gameSpeed === null ? 100 : parseInt(gameSpeed, 10),
            playSound: playSound === null ? true : playSound === "true",
            keybindings: keybindings === null ? getDefaultKeyBindings() : JSON.parse(keybindings),
        };
    }

    export function setSettings(): void {
        const currentSettings = getSettings();
        dispatch(setGameSpeedSetting(currentSettings.gameSpeed));
        dispatch(setKeybindings(currentSettings.keybindings));
        dispatch(setSoundStateSetting(currentSettings.playSound));
    }

    export function getDefaultKeyBindings(): KeybindingsState {
        return {
            upkey: "ArrowUp",
            downKey: "ArrowDown",
            leftKey: "ArrowLeft",
            rightKey: "ArrowRight",
            fireKey: "F1",
            phaserKey: "F2",
            pauseKey: "Space",
            menu: "KeyQ",
        };
    }

    /**
     * Stores a setting in the local storage
     * @param {Settings} setting. Setting to store
     * @param {string} value. Value to store.
     */
    export function storeSetting(setting: Settings, value: string): void {
        switch (setting) {
            case "gamespeed":
                window.localStorage.setItem(StorageKeys.gameSpeed, value);
                break;
            case "playsound":
                window.localStorage.setItem(StorageKeys.playSound, value);
                break;
            case "keybindings":
                window.localStorage.setItem(StorageKeys.keybindings, value);
                break;
            default:
                throw new Error("Unknown setting");
        }
    }
}

export default SettingsManager;