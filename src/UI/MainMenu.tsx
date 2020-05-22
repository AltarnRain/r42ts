/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import * as React from "react";
import { Styles } from "./Styles";

/**
 * Module:          MainMenu
 * Responsibility:  Show the main menu.
 */

export default function MainMenu(): JSX.Element {

    const [gameRunning, setGameRunning] = React.useState(false);

    /**
     * Starts the game
     */
    function startGame(): void {
        // Remove the UI from screen.
        setGameRunning(true);

        // Lazy load the gameloop. When this module is pulled in
        // and module that uses constants will immediately set them.
        // This includes game dimensions so we REALLY don't want
        // to load the game until the dimensions are set in store aka. fullscreen or window model
        const gameloop = import("../GameLoop");
        gameloop.then((m) => m.GameLoop.start());
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
                        <div style={Styles.instructions}>
                            <textarea readOnly={true} style={Styles.instructionsText} rows={50}>
                                Press F1 to fire a bullet.
                                Press F2 to fire a phaser.
                                You only have limited charges so use them wisely.
                                Press Backspace to self destruct and ship a level.
                                Use the arrow keys to move.

                                A life and phaser is awared every 7500 points.
                                When you die you'll lose your phaser charges.
                                When you die you can hold Space to pause your formation
                                When there's enemies on the screen you can move
                                left and right while your ship is warping in.
                </textarea>
                        </div>
                        <br />
                        <div style={Styles.buttonContainer}>
                            <button style={Styles.buttonSize} onClick={() => requestFullscreen()}>Fullscreen</button>
                            <br />
                            <button style={Styles.buttonSize} onClick={startGame} >Play game</button>
                        </div>
                    </>
            }
        </div>
    );
}