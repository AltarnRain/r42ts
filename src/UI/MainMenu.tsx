/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import * as React from "react";
import GameLoop from "../GameLoop";
import dimensionProvider from "../Providers/DimensionProvider";
import { gameStart } from "../State/Game/GameActions";
import { dispatch } from "../State/Store";
import { Styles } from "./Styles";

/**
 * Module:          MainMenu
 * Responsibility:  Show the main menu.
 */

export default function MainMenu(): JSX.Element {

    const [gameRunning, setGameRunning] = React.useState(false);

    function startGame(): void {
        setGameRunning(true);
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        if (canvas) {
            // Initialize the dimentions of the canvas.
            canvas.width = dimensionProvider().fullGameWidth;
            canvas.height = dimensionProvider().fullGameHeight;
        }

        dispatch(gameStart());
        GameLoop.start();
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
                            {/* <button style={Styles.buttonSize} onClick={() => requestFullscreen()}>Fullscreen</button> */}
                            <br />
                            <button style={Styles.buttonSize} onClick={startGame} >Play game</button>
                        </div>
                    </>
            }
        </div>
    );
}