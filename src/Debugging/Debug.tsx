/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Debug
 * Responsibility:  This module enables the game to be loaded at whatever lives, level, phaser count, etc.
 */

import React from "react";
import ReactDOM from "react-dom";
import GameLoop from "../GameLoop";
import ctxProvider from "../Render/CtxProvider";
import setCanvasDimensions from "../Render/SetCanvasDimensions";
import { setDebuggingState } from "../State/Debugging/DebuggingActions";
import DebuggingState from "../State/Debugging/DebuggingState";
import { increaseScore, setLevel, setLives, setPhasers, setTimeLevelTimeLimit } from "../State/Game/GameActions";
import { dispatch } from "../State/Store";
import SettingsManager from "../UI/SettingsManager";
import { getURLQueryKVPs } from "../Utility/Lib";
import DebugSound from "./DebugSound";

/**
 * Start the game. If the URL contains certain query query's it will
 * begin in the playground or show th canvas. If nothing is specified (default) the
 * game will just start
 */
export default function debug(): void {
    const queryKeyValuePairs = getURLQueryKVPs(window.location.search);

    const showPlayGround = queryKeyValuePairs.some((kvp) => kvp.key === "playground");
    const showCanvas = queryKeyValuePairs.some((kvp) => kvp.key === "canvas");
    let level = queryKeyValuePairs.find((kvp) => kvp.key === "level")?.value;
    const drawGrid = queryKeyValuePairs.find((kvp) => kvp.key === "grid");
    const showhitboxes = queryKeyValuePairs.find((kvp) => kvp.key === "hitboxes");
    const immortal = queryKeyValuePairs.find((kvp) => kvp.key === "god");
    const lives = queryKeyValuePairs.find((kvp) => kvp.key === "lives");
    const phasers = queryKeyValuePairs.find((kvp) => kvp.key === "phasers");
    const timelevelTimeLimit = queryKeyValuePairs.find((kvp) => kvp.key === "timelevelTimeLimit");
    const sound = queryKeyValuePairs.find((kvp) => kvp.key === "sound");

    if (showPlayGround) {

        const debuggingState: DebuggingState = {};

        if (!level) {
            level = "0";
        }

        if (level) {
            dispatch(setLevel(parseInt(level, 10)));
        }

        if (lives) {
            dispatch(setLives(parseInt(lives.value, 10)));
        } else {
            dispatch(setLives(900));
        }

        if (phasers) {
            dispatch(setPhasers(parseInt(phasers.value, 10)));
        } else {
            dispatch(setPhasers(900));
        }

        if (timelevelTimeLimit) {
            dispatch(setTimeLevelTimeLimit(parseInt(timelevelTimeLimit.value, 10)));
        }

        if (immortal) {
            debuggingState.playerIsImmortal = true;
        }

        if (drawGrid) {
            let gridDetail: number | undefined;
            if (drawGrid.value) {
                gridDetail = parseInt(drawGrid.value, 10);
            }

            debuggingState.drawGrid = true;
            debuggingState.gridDetail = gridDetail;
        }

        if (showhitboxes) {
            debuggingState.drawHitboxes = true;
        }

        dispatch(increaseScore(7400));

        dispatch(setDebuggingState(debuggingState));

        setCanvasDimensions();

        SettingsManager.setSettings();

        // Start with base speed.
        GameLoop.init();

    } else if (showCanvas) {
        // canvas testing
        const ctx = ctxProvider();

        // Green.
        ctx.fillStyle = "#00AA00";

        (window as any).r42 = ctx;
    } else if (sound) {
        ReactDOM.render(<DebugSound/>, document.getElementById("root"));
    } else {
        throw new Error("No Debugging info given");
    }
}
