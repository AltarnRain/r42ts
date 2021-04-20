/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import React, { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Canvas } from "../Render/Canvas";
import ApplicationState from "../State/ApplicationState";
import { setPause, setScreenState } from "../State/Game/GameActions";
import { KeybindingsState } from "../State/Settings/KeybindingsState";
import { setGameSpeedSetting, setKeybindings, setSoundStateSetting } from "../State/Settings/SettingsActions";
import SettingsState from "../State/Settings/SettingsState";
import { setSpeed } from "../State/Speed/SpeedActions";
import { dispatch } from "../State/Store";
import { HoverButton } from "./Components/HoverButton";
import SettingsManager from "./SettingsManager";
import { Styles } from "./Styles";
import { AsciiCheckbox } from "./AsciiCheckbox";
import { AsciiSlider } from "./AsciiSlider";

const checkboxChars = ["[", "]", "\u00A0", "x"];

const sliderChars = ["[", "]", "\u00A0", "\u00B7", String.fromCharCode(7), String.fromCharCode(4), "\u25A0"];

/**
 * Module:          Options
 * Responsibility:  Game options
 */

export function GameOptions(): JSX.Element {

    const [listening, setListening] = useState(false);
    const [currentKeyBind, setCurrentKeyBind] = useState<keyof KeybindingsState | undefined>(undefined);

    const settings = useSelector<ApplicationState, SettingsState>((state) => state.settingsState);
    const gameInProgress = useSelector<ApplicationState, boolean>((state) => state.gameState.gameInProgress);

    const {
        gameSpeed,
        keybindings,
        playSound
    } = settings;

    useEffect(() => {
        document.addEventListener("keydown", listenForKeyBind);

        return () => {
            document.removeEventListener("keydown", listenForKeyBind);
        };
    }, [listening]);

    /**
     * Handles a change in the game speed slider.
     * @param {ChangeEvent<HTMLInputElement>} e. Input event.
     */
    function onSpeedChange(value: number): void {
        // Store the setting
        dispatch(setGameSpeedSetting(value));

        // Update the speed state. This triggers calculations and is stored in a seperate state.
        dispatch(setSpeed(value));
    }

    /**
     * Handles a chane in the play sound checkbox.
     * @param {ChangeEvent<HTMLInputElement>} e. Input event.
     */
    function onPlaySoundChange(value: boolean): void {
        dispatch(setSoundStateSetting(value));
    }

    function changeBinding(key: keyof KeybindingsState): void {
        setListening(true);
        setCurrentKeyBind(key);
    }

    function listenForKeyBind(e: KeyboardEvent): void {
        if (!listening) {
            return;
        }

        const newKeybindings = { ...keybindings };

        if (currentKeyBind !== undefined) {
            newKeybindings[currentKeyBind] = e.code;

            dispatch(setKeybindings(newKeybindings));
            SettingsManager.storeSetting("keybindings", JSON.stringify(newKeybindings));
        }

        setListening(false);
    }

    function continueGame(): void {
        dispatch(setScreenState("playing"));
        dispatch(setPause(false));
        Canvas.setCanvasDimensions();
    }

    return (
        <div style={Styles.defaultContainer}>
            {
                listening ? <p style={Styles.header}>Press the key to bind</p>
                    :
                    <div style={{ flexDirection: "column" }}>
                        <p style={Styles.header}>Options</p>
                        {
                            !gameInProgress && <b><p style={Styles.textStyle} >Adjust game speed</p></b>
                        }
                        {
                            !gameInProgress && <div style={{ ...Styles.textStyle, flexDirection: "column" }}>
                                <AsciiSlider
                                    chars={sliderChars}
                                    charCount={11}
                                    min={50}
                                    max={200}
                                    step={1}
                                    value={gameSpeed}
                                    onChange={onSpeedChange} />
                                {gameSpeed}%</div>
                        }
                        <div>
                            <div style={{ flexDirection: "row" }}>
                                <AsciiCheckbox chars={checkboxChars} value={playSound} onChange={onPlaySoundChange} />
                                <span style={Styles.textStyle}>Play sounds</span>
                            </div>
                        </div>
                        <br />
                        <b><span style={Styles.textStyle}>Keybindings</span></b>
                        <table style={Styles.tableStyle}>
                            <thead>
                                <tr style={Styles.tableStyle}>
                                    <th style={Styles.tableHeaderCellStyle}>Action</th>
                                    <th style={Styles.tableHeaderCellStyle}>Key</th>
                                    <th style={Styles.tableHeaderCellStyle}>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cell("Up", keybindings.upkey, "upkey", changeBinding)
                                }
                                {
                                    cell("Down", keybindings.downKey, "downKey", changeBinding)
                                }
                                {
                                    cell("Left", keybindings.leftKey, "leftKey", changeBinding)
                                }
                                {
                                    cell("Right", keybindings.rightKey, "rightKey", changeBinding)
                                }
                                {
                                    cell("Fire", keybindings.fireKey, "fireKey", changeBinding)
                                }
                                {
                                    cell("Phaser", keybindings.phaserKey, "phaserKey", changeBinding)
                                }
                                {
                                    cell("Pause", keybindings.pauseKey, "pauseKey", changeBinding)
                                }
                                {
                                    cell("In game menu", keybindings.menu, "menu", changeBinding)
                                }
                            </tbody>
                        </table>
                        {
                            gameInProgress ? <HoverButton onClick={continueGame} text="Continue" /> :
                                <HoverButton onClick={() => dispatch(setScreenState("mainmenu"))} text="Main menu" />
                        }
                    </div>
            }
        </div>
    );
}

function cell(description: string, currentBind: string, keybindingKeyword: keyof KeybindingsState, changeBinding: (key: keyof KeybindingsState) => void): ReactElement {
    return (
        <tr>
            <td style={Styles.tableTextCellStyle}>{description}</td>
            <td style={Styles.tableTextCellStyle}>{currentBind}</td>
            <td style={Styles.tableCellStyle}><HoverButton onClick={() => changeBinding(keybindingKeyword)} text="Edit" /></td>
        </tr>
    );
}
