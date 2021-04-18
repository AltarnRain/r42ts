/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import React from "react";
import GameResultModel from "../Models/GameResultModel";
import requestFullScreen from "../Providers/RequestFullscreen";
import { startGame } from "../StartGame";
import { HoverButton } from "./HoverButton";
import { Styles } from "./Styles";
import { ScreenState } from "./UITypes";

/**
 * Module:          MainMenu
 * Responsibility:  Shows the main menu of the game.
 */

export default function MainMenu(props: {
    setScreenState(screenState: ScreenState): void,
    setGameResult(result: GameResultModel): void,
}): JSX.Element {

    const {
        setScreenState,
        setGameResult,
    } = props;

    /**
     * Opens a tab to the github repo where the round 42's source can be downloaded.
     */
    function goToSource(): void {
        const win = window.open("https://github.com/AltarnRain/r42ts", "_blank");
        if (win !== null) {
            win.focus();
        }
    }

    /**
     * Request full screen
     */
    function requestFullscreen(): void {
        // We'll use the body element to place the entire application
        // in fullscreen. The body element is used by the game itself
        // to determine the game's dimensions.

        // No, this is not how you're supposed to use React but
        // all I'm using it for is a simple UI so I don't care.
        const body = document.getElementById("body") as HTMLBodyElement;

        if (body) {
            requestFullScreen(body);
        }
    }

    /**
     * Starts the game
     */
    function onStartGame(): void {

        requestFullscreen();

        // Remove the UI from screen.
        setScreenState("playing");

        // Lazy load the game. When the game starts it sets dimension constants all though the game
        // before this is done we want to make sure the game is either running in full screem
        // or windows mode.
        // Once loaded this module stays loaded. Thats why the game, when it ends, doesn't show the
        // main menu as switching to full screen would have no effect at that point.
        startGame((result) => {
            setScreenState("gameover");
            setGameResult(result);
        });
    }

    return (
        <>
            <p style={Styles.header}>Welcome to Round 42</p>
            <div style={Styles.defaultTextContainer}>
                <p style={Styles.textStyle}>
                    Original game by Mike Pooler released in 1986.
                    <br />
                    Remake by Antonio Invernizzi 2020.
                </p>
                <br />
            </div>
            <div style={Styles.defaultTextContainer}>
                <div style={{ flexDirection: "column" }}>
                    <p>Instructions for default keybindings</p>
                    <ul>
                        <li>Use the arrow keys to move (default).</li>
                        <li>Press F1 to fire a bullet (default).</li>
                        <li>Press F2 to fire a Phaser (default).</li>
                        <ul>
                            <li>This is your super weapon. It kills a random enemy in one shot.</li>
                            <li>You only have limited charges so use them wisely.</li>
                        </ul>
                        <li>A life and phaser is awared every 7500 points.</li>
                        <li>When you die you'll lose your phaser charges.</li>
                        <li>When you die you can hold the 'Pause' key to stop your formation. While forming you cannot be hit.</li>
                        <li>When there are enemies on the screen you can move left and right while your ship is forming.</li>
                    </ul>
                    <p>You can setup your own keybinds in the 'Option and Keybinds' menu.</p>
                </div>
            </div>
            <br />
            <div style={{ ...Styles.buttonContainer, ...Styles.textStyle }}>
                <HoverButton onClick={() => onStartGame()} text="Play" />
                <HoverButton onClick={() => setScreenState("options")} text={"Options and Keybinds"} />
                <p>Round 42 is open source. Feel free to take a look.</p>
                <HoverButton onClick={goToSource} text="Source code" />
                <p>Learn more? Click about.</p>
                <HoverButton onClick={() => setScreenState("about")} text="About" />
            </div>
        </>
    );
}
