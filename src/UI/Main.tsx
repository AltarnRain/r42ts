/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import React, { useState } from "react";
import GameResultModel from "../Models/GameResultModel";
import About from "./About";
import { GameOptions } from "./GameOptions";
import GameOver from "./GameOver";
import MainMenu from "./MainMenu";
import SettingsManager from "./SettingsManager";
import { ScreenState } from "./UITypes";

/**
 * Module:          Main
 * Responsibility:  Top level component for the UI.
 */

const {
    gameSpeed: gameSpeedSetting,
    playSound: playSoundSetting,
    keybindings
} = SettingsManager.getSettings();

export default function Main(): JSX.Element {

    const [screenState, setScreenState] = useState<ScreenState>("options");
    const [gameResult, setGameResult] = useState<GameResultModel>();
    const [gameSpeed, setGameSpeed] = useState(gameSpeedSetting);
    const [playSound, setPlaySounds] = useState(playSoundSetting);
    const [keybinds, setKeybinds] = useState(keybindings);

    return (
        <div>
            {
                screenState === "mainmenu" && <MainMenu soundsOn={playSound} setGameSpeed={setGameSpeed} setScreenState={setScreenState} setGameResult={setGameResult} gameSpeed={gameSpeed} /> ||
                screenState === "about" && <About setScreenState={setScreenState} /> ||
                screenState === "gameover" && <GameOver setScreenState={setScreenState} gameResult={gameResult} /> ||
                screenState === "options" &&
                <GameOptions
                    gameSpeed={gameSpeed}
                    playSound={playSound}
                    setGameSpeed={setGameSpeed}
                    setScreenState={setScreenState}
                    setPlaySounds={setPlaySounds}
                    keybindings={keybinds}
                    setKeybinds={setKeybinds}
                />
            }
        </div>
    );
}