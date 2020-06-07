/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import React, { useState } from "react";
import GameResultModel from "../Models/GameResultModel";
import About from "./About";
import GameOver from "./GameOver";
import MainMenu from "./MainMenu";
import { ScreenState } from "./UITypes";

/**
 * Module:          Main
 * Responsibility:  Top level component for the UI.
 */

export default function Main(props: { speed: number }): JSX.Element {

    const [screenState, setScreenState] = useState<ScreenState>("mainmenu");
    const [gameResult, setGameResult] = useState<GameResultModel>();

    return (
        <div>
            {
                screenState === "mainmenu" && <MainMenu setScreenState={setScreenState} setGameResult={setGameResult} fps={props.speed} /> ||
                screenState === "about" && <About setScreenState={setScreenState} /> ||
                screenState === "gameover" && <GameOver setScreenState={setScreenState} gameResult={gameResult} />
            }
        </div >
    );
}