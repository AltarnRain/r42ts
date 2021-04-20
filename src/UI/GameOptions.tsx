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
import { AsciiCheckbox } from "./Components/AsciiCheckbox";
import { AsciiSlider } from "./Components/AsciiSlider";

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
        <div style={gameInProgress ? Styles.ingamePage : Styles.page}>
            {gameInProgress && <div style={Styles.spacer}/>}
            <p style={Styles.header}>Options</p>
            <div style={Styles.defaultContainer}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    {!gameInProgress && <span style={Styles.textStyle} >Adjust game speed</span>}
                    {!gameInProgress && <br />}
                    <span style={Styles.textStyle}>Play sounds</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", marginLeft: "1em" }}>
                    {!gameInProgress && (
                        <span style={Styles.textStyle}>
                            <AsciiSlider
                                chars={sliderChars}
                                charCount={13}
                                min={50}
                                max={200}
                                step={1}
                                value={gameSpeed}
                                onChange={onSpeedChange}
                                disabled={listening}
                            />
                            {' '}
                            <span style={{ display: "inline-block", textAlign: "right", width: "2em" }}>{gameSpeed}%</span>
                        </span>
                    )}
                    {!gameInProgress && <br />}
                    <AsciiCheckbox disabled={listening} chars={checkboxChars} value={playSound} onChange={onPlaySoundChange} />
                </div>
            </div>
            <div style={Styles.defaultTextContainer}>
                <span style={Styles.textStyle}>{listening ? "Press the key to bind" : "Keybindings"}</span>
                <br />
                <table style={Styles.tableStyle}>
                    <thead>
                        <tr>
                            <th style={Styles.tableHeaderCellStyle}>Action</th>
                            <th style={Styles.tableHeaderCellStyle}>Key</th>
                            <th style={Styles.tableHeaderCellStyle}>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cell("Up", keybindings.upkey, "upkey", changeBinding, listening, currentKeyBind)
                        }
                        {
                            cell("Down", keybindings.downKey, "downKey", changeBinding, listening, currentKeyBind)
                        }
                        {
                            cell("Left", keybindings.leftKey, "leftKey", changeBinding, listening, currentKeyBind)
                        }
                        {
                            cell("Right", keybindings.rightKey, "rightKey", changeBinding, listening, currentKeyBind)
                        }
                        {
                            cell("Fire", keybindings.fireKey, "fireKey", changeBinding, listening, currentKeyBind)
                        }
                        {
                            cell("Phaser", keybindings.phaserKey, "phaserKey", changeBinding, listening, currentKeyBind)
                        }
                        {
                            cell("Pause", keybindings.pauseKey, "pauseKey", changeBinding, listening, currentKeyBind)
                        }
                        {
                            cell("In game menu", keybindings.menu, "menu", changeBinding, listening, currentKeyBind)
                        }
                    </tbody>
                </table>
            </div>
            {!gameInProgress && <div style={Styles.spacer}/>}
            <div style={Styles.buttonContainer}>
                {
                    gameInProgress ? <HoverButton disabled={listening} onClick={continueGame} text="Continue" /> :
                        <HoverButton disabled={listening} onClick={() => dispatch(setScreenState("mainmenu"))} text="Main menu" />
                }
            </div>
            {gameInProgress && <div style={Styles.spacer}/>}
        </div>
    );
}

function cell(description: string, currentBind: string, keybindingKeyword: keyof KeybindingsState, changeBinding: (key: keyof KeybindingsState) => void, listening: boolean, currentKeyBind: keyof KeybindingsState | undefined): ReactElement {
    return (
        <tr>
            <td style={Styles.tableTextCellStyle}>{description}</td>
            <td style={Styles.tableTextCellStyle}>{currentBind}</td>
            <td style={Styles.tableTextCellStyle}>
                {listening && currentKeyBind === keybindingKeyword ? (
                    <span style={Styles.textEmphasisStyle}>Press key</span>
                ) : (
                    <HoverButton disabled={listening} onClick={() => changeBinding(keybindingKeyword)} text="Edit" />
                )}
            </td>
        </tr>
    );
}
