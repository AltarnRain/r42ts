/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import React, { ChangeEvent, useEffect, useState } from "react";
import { KeybindingsState } from "../State/Settings/KeybindingsState";
import { setGameSpeedSetting, setKeybindings, setSoundStateSetting } from "../State/Settings/SettingsActions";
import SettingsState from "../State/Settings/SettingsState";
import { setSpeed } from "../State/Speed/SpeedActions";
import { appState, appStore, dispatch } from "../State/Store";
import { HoverButton } from "./HoverButton";
import SettingsManager from "./SettingsManager";
import { Styles } from "./Styles";
import { ScreenState } from "./UITypes";

/**
 * Module:          Options
 * Responsibility:  Game options
 */

export function GameOptions(props: {setScreenState(screenState: ScreenState): void}): JSX.Element {

    const {
        setScreenState
    } = props;

    const [listening, setListening] = useState(false);
    const [currentKeyBind, setCurrentKeyBind] = useState<keyof KeybindingsState | undefined>(undefined);
    const [settings, setSettings] = useState<SettingsState>(appState().settingsState);

    const {
        gameSpeed,
        keybindings,
        playSound
    } = settings;

    useEffect(() => {
        document.addEventListener("keydown", listenForKeyBind);

        const subscription = appStore().subscribe(() => {
            const settingsState = appState().settingsState;
            if (settings !== settingsState) {
                setSettings(settingsState);
            }
        })

        return () => {
            document.removeEventListener("keydown", listenForKeyBind)
            subscription();
        };
    }, [listening]);

    /**
     * Handles a change in the game speed slider.
     * @param {ChangeEvent<HTMLInputElement>} e. Input event.
     */
    function onSpeedChange(e: ChangeEvent<HTMLInputElement>): void {
        if (!e) {
            return;
        }

        // Store the setting
        dispatch(setGameSpeedSetting(e.target.valueAsNumber));

        // Update the speed state. This triggers calculations and is stored in a seperate state.
        dispatch(setSpeed(e.target.valueAsNumber));
    }

    /**
     * Handles a chane in the play sound checkbox.
     * @param {ChangeEvent<HTMLInputElement>} e. Input event.
     */
    function onPlaySoundChange(e: ChangeEvent<HTMLInputElement>): void {
        if (!e) {
            return;
        }

        const on = e.target.valueAsNumber === 1;

        dispatch(setSoundStateSetting(on));
    }

    function resetSettings(): void {
        SettingsManager.storeSetting("gamespeed", "100");
        SettingsManager.storeSetting("playsound", "true");
        SettingsManager.storeSetting("keybindings", JSON.stringify(SettingsManager.getDefaultKeyBindings()));

        setGameSpeedSetting(100);
        setSoundStateSetting(true);
        setKeybindings(SettingsManager.getDefaultKeyBindings());
    }

    function changeBinding(key: keyof KeybindingsState): void {
        setListening(true);
        setCurrentKeyBind(key);
    }

    function listenForKeyBind(e: KeyboardEvent): void {
        if (!listening) {
            return;
        }

        const newKeybindings  = {...keybindings};

        if (currentKeyBind !== undefined) {
            newKeybindings[currentKeyBind] = e.code;

            dispatch(setKeybindings(newKeybindings));
            SettingsManager.storeSetting("keybindings", JSON.stringify(newKeybindings));
        }

        setListening(false);
    }

    return (
        <div style={Styles.defaultContainer}>
            {
                listening ? <p style={Styles.header}>Press the key to bind</p>
                :
                <div style={{ flexDirection: "column" }}>
                <p style={Styles.header}>Options</p>
                <b><p style={Styles.textStyle} >Adjust game speed</p></b>
                <div>
                    <div style={{ ...Styles.textStyle, flexDirection: "column" }}>
                        <input
                            type="range"
                            min="50"
                            max="200"
                            step={1}
                            value={gameSpeed}
                            onChange={onSpeedChange} />
                        {gameSpeed}%
                        </div>
                    <div style={{ flexDirection: "row" }}>
                        <input type="checkbox" checked={playSound} onChange={onPlaySoundChange} />
                        <span style={Styles.textStyle}>Play sounds</span>
                    </div>
                </div>
                <table style={Styles.tableStyle}>
                    <thead>
                        <tr style={Styles.tableStyle}>
                            <th style={Styles.tableStyle}>Action</th>
                            <th style={Styles.tableStyle}>Key</th>
                            <th style={Styles.tableStyle}>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={Styles.tableStyle}>Up</td>
                            <td style={Styles.tableStyle}>{keybindings.upkey}</td>
                            <td style={Styles.tableStyle}><HoverButton onClick={() => changeBinding("upkey")} text="Edit"/></td>
                        </tr>
                        <tr>
                            <td style={Styles.tableStyle}>Down</td>
                            <td style={Styles.tableStyle}>{keybindings.downKey}</td>
                            <td style={Styles.tableStyle}><HoverButton onClick={() => changeBinding("downKey")} text="Edit"/></td>
                        </tr>
                        <tr>
                            <td style={Styles.tableStyle}>Left</td>
                            <td style={Styles.tableStyle}>{keybindings.leftKey}</td>
                            <td style={Styles.tableStyle}><HoverButton onClick={() => changeBinding("leftKey")} text="Edit"/></td>

                        </tr>
                        <tr>
                            <td style={Styles.tableStyle}>Right</td>
                            <td style={Styles.tableStyle}>{keybindings.rightKey}</td>
                            <td style={Styles.tableStyle}><HoverButton onClick={() => changeBinding("rightKey")} text="Edit"/></td>
                        </tr>
                        <tr>
                            <td style={Styles.tableStyle}>Fire</td>
                            <td style={Styles.tableStyle}>{keybindings.fireKey}</td>
                            <td style={Styles.tableStyle}><HoverButton onClick={()=> changeBinding("fireKey")} text="Edit"/></td>
                        </tr>
                        <tr>
                            <td style={Styles.tableStyle}> Phaser</td>
                            <td style={Styles.tableStyle}>{keybindings.phaserKey}</td>
                            <td style={Styles.tableStyle}><HoverButton onClick={() => changeBinding("phaserKey")} text="Edit"/></td>
                        </tr>
                        <tr>
                            <td style={Styles.tableStyle}>Pause</td>
                            <td style={Styles.tableStyle}>{keybindings.pauseKey}</td>
                            <td style={Styles.tableStyle}><HoverButton onClick={() => changeBinding("pauseKey")} text="Edit"/></td>
                        </tr>
                    </tbody>
                </table>
                <HoverButton onClick={resetSettings} text="Reset settings" />
                <HoverButton onClick={() => setScreenState("mainmenu")} text="Main menu" />
            </div>
            }

        </div>
    );
}