/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import React, { useState } from "react";
import { HoverButton } from "./HoverButton";
import { Styles } from "./Styles";

/**
 * Module:          MainMenu
 * Responsibility:  Show the main menu.
 */

export default function MainMenu(): JSX.Element {

    const [screenState, setScreenState] = useState<"mainmenu" | "playing" | "about">("mainmenu");

    /**
     * Starts the game
     */
    function startGame(): void {
        // Remove the UI from screen.
        setScreenState("playing");

        // Lazy load the game. When the game starts it sets dimension constants all though the game
        // before this is done we want to make sure the game is either running in full screee
        // or windows mode.
        import("../GameLoop").then((m) => m.GameLoop.start());
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
        const body = document.getElementById("body");

        if (body) {
            body.requestFullscreen();
        }
    }

    return (
        <div>
            {
                screenState === "playing" ?
                    null :
                    screenState === "mainmenu" ?
                        <>
                            <div style={Styles.round42Header}>Welcome to Round 42</div>
                            <div style={Styles.defaultContainer}>
                                <p style={Styles.textStyle} >
                                    Original game by Mike Pooler released in 1986 <br />
                            Remake by Antonio Invernizzi 2020.
                        </p>
                            </div>
                            <br />
                            <div style={Styles.defaultContainer}>
                                <div style={{ flexDirection: "column" }}>
                                    <h2 style={Styles.textStyle}>Instructions</h2>
                                    <ul style={Styles.textStyle}>
                                        <li>Use the arrow keys to move.</li>
                                        <li>Press F1 to fire a bullet.</li>
                                        <li>Press F2 to fire a phaser.
                                        <ul>
                                                <li>You only have limited charges so use them wisely.</li>

                                            </ul>
                                        </li>
                                        <li>Press Backspace to self destruct and skip a level.
                                        <ul>
                                                <li>Selfdestrucing will reset your score.</li>
                                            </ul>
                                        </li>
                                        <li>A life and phaser is awared every 7500 points.</li>
                                        <li>When you die you'll lose your phaser charges.</li>
                                        <li>When you die you can hold Space to pause your formation</li>
                                        <li>When there's enemies on the screen you can move left and right while your ship is warping in.</li>
                                    </ul>
                                </div>
                            </div>
                            <br />
                            <div style={Styles.buttonContainer}>
                                <HoverButton onClick={requestFullscreen} text="Fullscreen" hoverStyle={Styles.buttonHoverStyle} normalStyle={Styles.buttonStyle} />
                                <br />
                                <HoverButton onClick={startGame} text="Play" hoverStyle={Styles.buttonHoverStyle} normalStyle={Styles.buttonStyle} />
                                <br />
                                <HoverButton onClick={() => setScreenState("about")} text="About" hoverStyle={Styles.buttonHoverStyle} normalStyle={Styles.buttonStyle} />
                            </div>
                        </> :
                        screenState === "about" ?
                        <>
                            <HoverButton onClick={() => setScreenState("mainmenu")} text="Back to main menu" hoverStyle={Styles.buttonHoverStyle} normalStyle={Styles.buttonStyle} />
                            <div style={Styles.textStyle}>
                                <h1 style={Styles.textStyle}>About me</h1>
                                <p>
                                    My name is Antonio Invernizzi. I've worked as a professional programmer for 20 years.<br/>
                                    <br/>
                                    Round 42 is a big reason why.<br/>
                                    <br/>
                                    It was 1990 and my parents bought our first PC. A 4 Mhz 8088 XT. It shipped with 3 games:
                                    <ul>
                                        <li>Digger</li>
                                        <li>A pinball machine</li>
                                        <li>Round 42</li>
                                    </ul>
                                </p>
                                <p>
                                    It is fair to say I was instantly addicted to Round 42 and spend many, many hours trying to beat the game often with my mother watching. <br/>
                                    Good times :) <br/>
                                    Course, spending hour uppon hour behind a PC made me curious what else I could do with it and... well... now I'm a programmer. <br/>
                                    Though, I am not a game developer by trade I realy enjoyed the challenge of writing one.
                                </p>
                                <h1 style={Styles.textStyle}>Technologies used</h1>
                                <ul>
                                    <li>TypeScript for coding</li>
                                    <li>WebPack for packaging</li>
                                    <li>Redux for state</li>
                                    <li>Immer for QoL state management.</li>
                                    <li>React (menu only)</li>
                                    <li>Howler for playing sounds.</li>
                                </ul>
                            </div>
                        </> : null
            }
        </div>
    );
}