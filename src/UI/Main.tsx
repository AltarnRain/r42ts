/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import React, { useState } from "react";
import GameResultModel from "../Models/GameResultModel";
import About from "./About";
import { GameOptions } from "./GameOptions";
import GameOver from "./GameOver";
import MainMenu from "./MainMenu";
import { ScreenState } from "./UITypes";

/**
 * Module:          Main
 * Responsibility:  Top level component for the UI.
 */

export default function Main(): JSX.Element {

    const [screenState, setScreenState] = useState<ScreenState>("options");
    const [gameResult, setGameResult] = useState<GameResultModel>();
    const [gameSpeed, setGameSpeed] = useState(100);

    return (
        <div>
            {
                screenState === "mainmenu" && <MainMenu setGameSpeed={setGameSpeed} setScreenState={setScreenState} setGameResult={setGameResult} gameSpeed={gameSpeed} /> ||
                screenState === "about" && <About setScreenState={setScreenState} /> ||
                screenState === "gameover" && <GameOver setScreenState={setScreenState} gameResult={gameResult} /> ||
                screenState === "options" && <GameOptions setGameSpeed={setGameSpeed} gameSpeed={gameSpeed} setScreenState={setScreenState} />
            }
        </div >
    );
}