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

    const [gameRunning, setGameRunning] = useState(false);

    /**
     * Starts the game
     */
    function startGame(): void {
        // Remove the UI from screen.
        setGameRunning(true);

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
                gameRunning ? null :
                    <>
                        <div style={Styles.round42Header}>Welcome to Round 42</div>
                        <br />
                        <div style={Styles.instructionContainer}>
                            <div style={{ flexDirection: "column" }}>
                                <h2 style={Styles.instructionsText}>Instructions</h2>
                                <ul style={Styles.instructionsText}>
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
                        </div>
                    </>
            }
        </div>
    );
}