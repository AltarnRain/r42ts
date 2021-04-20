/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import React, { useEffect, useState } from "react";
import { updateKeyActions } from "../State/Keyboard/KeyboardStateReducer";
import { updateKeybinds } from "../Utility/JSEvents";
import { AsciiCheckbox } from "./AsciiCheckbox";
import { AsciiSlider } from "./AsciiSlider";
import { HoverButton } from "./HoverButton";
import { KeybindingsModel } from "./KeybindingsModel";
import SettingsManager from "./SettingsManager";
import { Styles } from "./Styles";
import { ScreenState } from "./UITypes";

const checkboxChars = ["[", "]", "\u00A0", "x"];

const sliderChars = ["[", "]", "\u00A0", "\u00B7", String.fromCharCode(7), String.fromCharCode(4), "\u25A0"];

/**
 * Module:          Options
 * Responsibility:  Game options
 */

export function GameOptions(props: {
    gameSpeed: number,
    playSound: boolean,
    keybindings: KeybindingsModel
    setGameSpeed(speed: number): void,
    setScreenState(screenState: ScreenState): void,
    setPlaySounds(playSound: boolean): void,
    setKeybinds(keybindings: KeybindingsModel): void,
}): JSX.Element {

    const {
        gameSpeed,
        playSound,
        setGameSpeed,
        setScreenState,
        setPlaySounds,
        keybindings,
        setKeybinds
    } = props;

    const [listening, setListening] = useState(false);
    const [currentKeyBind, setCurrentKeyBind] = useState<keyof KeybindingsModel | undefined>(undefined)

    useEffect(() => {
        document.addEventListener("keydown", listenForKeyBind);

        return () => document.removeEventListener("keydown", listenForKeyBind);
    })

    /**
     * Handles a change in the game speed slider.
     * @param {ChangeEvent<HTMLInputElement>} e. Input event.
     */
    function onSpeedChange(value: number): void {
        setGameSpeed(value);
        SettingsManager.storeSetting("gamespeed", value.toString());
    }

    /**
     * Handles a chane in the play sound checkbox.
     * @param {ChangeEvent<HTMLInputElement>} e. Input event.
     */
    function onPlaySoundChange(value: boolean): void {
        setPlaySounds(value);
        SettingsManager.storeSetting("playsound", value.toString());
    }

    function resetSettings(): void {
        SettingsManager.storeSetting("gamespeed", "100");
        SettingsManager.storeSetting("playsound", "true");

        setGameSpeed(100);
        setPlaySounds(true);
    }

    function changeBinding(key: keyof KeybindingsModel): void {
        
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
            
            SettingsManager.storeSetting("keybindings", JSON.stringify(newKeybindings));
            setKeybinds(newKeybindings);

            // Lazy solution but it works.
            // Update the JSEvent keys that are listened to.
            updateKeybinds();

            // Update the key to action mapping the KeyboardReducer uses.
            updateKeyActions();
        }

        setListening(false);
    }

    return (
        <div style={Styles.page}>
            {listening ? (
                <p style={Styles.header}>Press the key to bind</p>
            ) : (
                <>
                <p style={Styles.header}>Options</p>
                <div style={Styles.defaultTextContainer}>
                    <div style={{display: "flex"}}>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <p>Adjust game speed</p>
                            <br/>
                            <p>Play sounds</p>
                        </div>
                        <div style={{marginLeft: "1em", display: "flex", flexDirection: "column"}}>
                            <div>
                                <AsciiSlider
                                    min={50}
                                    max={200}
                                    step={1}
                                    charCount={11}
                                    chars={sliderChars}
                                    value={gameSpeed}
                                    onChange={onSpeedChange}
                                />
                                {'\u00A0'}
                                <span style={{display: "inline-block", textAlign: "right", width: "2em"}}>{gameSpeed}%</span>
                            </div>
                            <br/>
                            <AsciiCheckbox
                                chars={checkboxChars}
                                value={playSound}
                                onChange={onPlaySoundChange}
                            />
                        </div>

                    </div>
                </div>
                <div style={Styles.defaultTextContainer}>
                    <table style={Styles.tableStyle}>
                        <thead>
                            <tr>
                                <th style={Styles.tableHeaderCellStyle}>Action</th>
                                <th style={Styles.tableHeaderCellStyle}>Key</th>
                                <th style={Styles.tableHeaderCellStyle}>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={Styles.tableTextCellStyle}>Up</td>
                                <td style={Styles.tableTextCellStyle}>{keybindings.upkey}</td>
                                <td style={Styles.tableCellStyle}><HoverButton onClick={() => changeBinding("upkey")} text="Edit"/></td>
                            </tr>
                            <tr>
                                <td style={Styles.tableTextCellStyle}>Down</td>
                                <td style={Styles.tableTextCellStyle}>{keybindings.downKey}</td>
                                <td style={Styles.tableCellStyle}><HoverButton onClick={() => changeBinding("downKey")} text="Edit"/></td>
                            </tr>
                            <tr>
                                <td style={Styles.tableTextCellStyle}>Left</td>
                                <td style={Styles.tableTextCellStyle}>{keybindings.leftKey}</td>
                                <td style={Styles.tableCellStyle}><HoverButton onClick={() => changeBinding("leftKey")} text="Edit"/></td>
                            </tr>
                            <tr>
                                <td style={Styles.tableTextCellStyle}>Right</td>
                                <td style={Styles.tableTextCellStyle}>{keybindings.rightKey}</td>
                                <td style={Styles.tableCellStyle}><HoverButton onClick={() => changeBinding("rightKey")} text="Edit"/></td>
                            </tr>
                            <tr>
                                <td style={Styles.tableTextCellStyle}>Fire</td>
                                <td style={Styles.tableTextCellStyle}>{keybindings.fireKey}</td>
                                <td style={Styles.tableCellStyle}><HoverButton onClick={()=> changeBinding("fireKey")} text="Edit"/></td>
                            </tr>
                            <tr>
                                <td style={Styles.tableTextCellStyle}> Phaser</td>
                                <td style={Styles.tableTextCellStyle}>{keybindings.phaserKey}</td>
                                <td style={Styles.tableCellStyle}><HoverButton onClick={() => changeBinding("phaserKey")} text="Edit"/></td>
                            </tr>
                            <tr>
                                <td style={Styles.tableTextCellStyle}>Pause</td>
                                <td style={Styles.tableTextCellStyle}>{keybindings.pauseKey}</td>
                                <td style={Styles.tableCellStyle}><HoverButton onClick={() => changeBinding("pauseKey")} text="Edit"/></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style={Styles.spacer}/>
                <div style={Styles.buttonContainer}>
                    <HoverButton onClick={resetSettings} text="Reset settings" />
                    <p style={Styles.buttonSeparator}>/</p>
                    <HoverButton onClick={() => setScreenState("mainmenu")} text="Main menu" />
                </div>
                </>
            )}
        </div>
    );
}