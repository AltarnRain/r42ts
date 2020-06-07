/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import React from "react";
import GameResultModel from "../Models/GameResultModel";
import { startGame } from "../StartGame";
import { HoverButton } from "./HoverButton";
import { Styles } from "./Styles";
import { ScreenState } from "./UITypes";

/**
 * Module:          MainMenu
 * Responsibility:  Shows the main menu of the game.
 */

export default function MainMenu(props: {
    gameSpeed: number,
    soundsOn: boolean,
    setScreenState(screenState: ScreenState): void,
    setGameResult(result: GameResultModel): void,
    setGameSpeed(speed: number): void,
}): JSX.Element {

    const {
        gameSpeed,
        soundsOn: playSounds,
        setScreenState,
        setGameResult,
    } = props;

    /**
     * Request full screen
     */
    function requestFullscreen(): void {
        // We'll use the body element to place the entire application
        // in fullscreen. The body element is used by the game itself
        // to determine the game's dimensions.

        // No, this is not how you're supposed to use React but
        // all I'm using it for is a simple UI so I don't care.
        const body = document.getElementById("body");

        if (body) {
            body.requestFullscreen();
        }
    }

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
     * Starts the game
     */
    function onStartGame(): void {
        // Remove the UI from screen.
        setScreenState("playing");

        // Lazy load the game. When the game starts it sets dimension constants all though the game
        // before this is done we want to make sure the game is either running in full screem
        // or windows mode.
        // Once loaded this module stays loaded. Thats why the game, when it ends, doesn't show the
        // main menu as switching to full screen would have no effect at that point.
        startGame(gameSpeed, playSounds, (result) => {
            setScreenState("gameover");
            setGameResult(result);
        });
    }

    return (
        <>
            <p style={Styles.header}>Welcome to Round 42</p>
            <div style={Styles.defaultContainer}>
                <p style={Styles.textStyle}>
                    Original game by Mike Pooler released in 1986.
                    <br />
                    Remake by Antonio Invernizzi 2020.
                </p>
            </div>
            <div style={{ ...Styles.defaultContainer }}>
                <div style={{ flexDirection: "column" }}>
                    <p style={Styles.textStyle}>Instructions</p>
                    <ul style={Styles.textStyle}>
                        <li>Use the arrow keys to move.</li>
                        <li>Press F1 or Z to fire a bullet.</li>
                        <li>Press F2 or X to fire a Phaser.</li>
                        <ul>
                            <li>This is your super weapon. It kills a random enemy in one shot.</li>
                            <li>You only have limited charges so use them wisely.</li>
                        </ul>
                        <li>A life and phaser is awared every 7500 points.</li>
                        <li>When you die you'll lose your phaser charges.</li>
                        <li>When you die you can hold Space to pause your formation.</li>
                        <li>When there's enemies on the screen you can move left and right while your ship is warping in.</li>
                    </ul>
                </div>
            </div>
            <br />
            <div style={Styles.buttonContainer}>
                <b><p style={Styles.textStyle}>Note 1: Ensure this page's zoom level is set to 100% before playing fullscreen.</p></b>
                <HoverButton onClick={requestFullscreen} text="Fullscreen" />
                <p style={Styles.textStyle}>Note: Ensure this page's zoom level is set to 100% before playing fullscreen.</p>
                <HoverButton onClick={onStartGame} text="Play" />
                <HoverButton onClick={goToSource} text="Source code" />
                <HoverButton onClick={() => setScreenState("about")} text="About" />
                <HoverButton onClick={() => setScreenState("options")} text={"Show options"} />
            </div>
        </>
    );
}
