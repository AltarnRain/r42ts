/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import React, { ChangeEvent } from "react";
import { HoverButton } from "./HoverButton";
import { KeybindingsModel } from "./KeybindingsModel";
import SettingsManager from "./SettingsManager";
import { Styles } from "./Styles";
import { ScreenState } from "./UITypes";

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
}): JSX.Element {

    const {
        gameSpeed,
        playSound,
        setGameSpeed,
        setScreenState,
        setPlaySounds,
        keybindings
    } = props;

    /**
     * Handles a change in the game speed slider.
     * @param {ChangeEvent<HTMLInputElement>} e. Input event.
     */
    function onSpeedChange(e: ChangeEvent<HTMLInputElement>): void {
        if (!e) {
            return;
        }

        setGameSpeed(e.target.valueAsNumber);
        SettingsManager.storeSetting("gamespeed", e.target.valueAsNumber.toString());
    }

    /**
     * Handles a chane in the play sound checkbox.
     * @param {ChangeEvent<HTMLInputElement>} e. Input event.
     */
    function onPlaySoundChange(e: ChangeEvent<HTMLInputElement>): void {
        if (!e) {
            return;
        }

        setPlaySounds(e.target.checked);
        SettingsManager.storeSetting("playsound", e.target.checked.toString());
    }

    function resetSettings(): void {
        SettingsManager.storeSetting("gamespeed", "100");
        SettingsManager.storeSetting("playsound", "true");

        setGameSpeed(100);
        setPlaySounds(true);
    }

    return (
        <div style={Styles.defaultContainer}>
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
                            <td style={Styles.tableStyle}><HoverButton text="Edit"/></td>
                        </tr>
                        <tr>
                            <td style={Styles.tableStyle}>Down</td>
                            <td style={Styles.tableStyle}>{keybindings.downKey}</td>
                            <td style={Styles.tableStyle}><HoverButton text="Edit"/></td>
                        </tr>
                        <tr>
                            <td style={Styles.tableStyle}>Left</td>
                            <td style={Styles.tableStyle}>{keybindings.leftKey}</td>
                            <td style={Styles.tableStyle}><HoverButton text="Edit"/></td>

                        </tr>
                        <tr>
                            <td style={Styles.tableStyle}>Right</td>
                            <td style={Styles.tableStyle}>{keybindings.rightKey}</td>
                            <td style={Styles.tableStyle}><HoverButton text="Edit"/></td>

                        </tr>
                        <tr>
                            <td style={Styles.tableStyle}>Fire</td>
                            <td style={Styles.tableStyle}>{keybindings.fireKey}</td>
                            <td style={Styles.tableStyle}><HoverButton text="Edit"/></td>
                        </tr>
                        <tr>
                            <td style={Styles.tableStyle}> Phaser</td>
                            <td style={Styles.tableStyle}>{keybindings.phaserKey}</td>
                            <td style={Styles.tableStyle}><HoverButton text="Edit"/></td>
                        </tr>
                        <tr>
                            <td style={Styles.tableStyle}>Pause</td>
                            <td style={Styles.tableStyle}>{keybindings.pauseKey === ' ' ? "Space" : keybindings.pauseKey}</td>
                            <td style={Styles.tableStyle}><HoverButton text="Edit"/></td>
                        </tr>
                    </tbody>
                </table>
                <HoverButton onClick={resetSettings} text="Reset settings" />
                <HoverButton onClick={() => setScreenState("mainmenu")} text="Main menu" />
            </div>
        </div>
    );
}