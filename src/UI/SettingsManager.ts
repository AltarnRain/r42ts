/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import GameSettings from "./GameSettings";
import StorageKeys from "./StorageKeys";
import { Settings } from "./UITypes";

/**
 * Module:          SettingsManager
 * Responsibility:  Provider and stores game settings.
 */

export namespace SettingsManager {

    /**
     * getSettings
     * @returns {GameSettings}. Game settings object.
     */
    export function getSettings(): GameSettings {

        const playSound = window.localStorage.getItem(StorageKeys.playSound);
        const gameSpeed = window.localStorage.getItem(StorageKeys.gameSpeed);

        return {
            gameSpeed: gameSpeed === null ? 100 : parseInt(gameSpeed, 10),
            playSound: playSound === null ? true : playSound === "true",
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
            default:
                throw new Error("Unknown setting");
        }
    }
}

export default SettingsManager;