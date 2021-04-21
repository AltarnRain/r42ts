/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import React, { useState } from "react";
import { useSelector } from "react-redux";
import GameResultModel from "../Models/GameResultModel";
import ApplicationState from "../State/ApplicationState";
import About from "./About";
import { GameOptions } from "./GameOptions";
import GameOver from "./GameOver";
import MainMenu from "./MainMenu";
import { Styles } from "./Styles";

/**
 * Module:          Main
 * Responsibility:  Top level component for the UI.
 */

export default function Main(): JSX.Element {

    const screenState = useSelector<ApplicationState>((state) => state.gameState.screenState);
    const [gameResult, setGameResult] = useState<GameResultModel>();

    return (
        <div style={Styles.root}>
            {
                screenState === "mainmenu" && <MainMenu setGameResult={setGameResult} /> ||
                screenState === "about" && <About /> ||
                screenState === "gameover" && <GameOver gameResult={gameResult} /> ||
                screenState === "options" &&
                <GameOptions />
            }
        </div>
    );
}