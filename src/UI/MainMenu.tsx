/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import React, { useState } from "react";
import GameResultModel from "../Models/GameResultModel";
import { HoverButton } from "./HoverButton";
import { Styles } from "./Styles";

/**
 * Module:          MainMenu
 * Responsibility:  Show the main menu.
 */

export default function MainMenu(props: { fps: number }): JSX.Element {

    const [screenState, setScreenState] = useState<"mainmenu" | "playing" | "about" | "gameover">("mainmenu");
    const [gameResult, setGameResult] = useState<GameResultModel>();

    /**
     * Starts the game
     */
    function startGame(): void {
        // Remove the UI from screen.
        setScreenState("playing");

        // Lazy load the game. When the game starts it sets dimension constants all though the game
        // before this is done we want to make sure the game is either running in full screem
        // or windows mode.
        // Once loaded this module stays loaded. Thats why the game, when it ends, doesn't show the
        // main menu as switching to full screen would have no effect at that point.
        import("../StartGame").then((m) => m.startGame(props.fps, (result) => {
            setScreenState("gameover");
            setGameResult(result);
        }));
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

    function goToSource(): void {
        const win = window.open("https://github.com/AltarnRain/r42ts", "_blank");
        if (win !== null) {
            win.focus();
        }
    }

    return (
        <div>
            {
                screenState === "playing" ? null :
                    screenState === "mainmenu" ?
                        <>
                            <p style={Styles.header}>Welcome to Round 42</p>
                            <div style={Styles.defaultContainer}>
                                <p style={Styles.textStyle}>
                                    Original game by Mike Pooler released in 1986.<br />
                                    Remake by Antonio Invernizzi 2020.
                                </p>
                            </div>
                            <br />
                            <div style={Styles.defaultContainer}>
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
                                        <li>Press Backspace to self destruct and skip a level.</li>
                                        <ul>
                                            <li>Selfdestrucing will reset your score.</li>
                                        </ul>
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
                                <p style={Styles.textStyle}>Note: Ensure this page's zoom level is set to 100% before playing fullscreen.</p>
                                <br />
                                <HoverButton onClick={startGame} text="Play" hoverStyle={Styles.buttonHoverStyle} normalStyle={Styles.buttonStyle} />
                                <br />
                                <HoverButton onClick={() => setScreenState("about")} text="About" hoverStyle={Styles.buttonHoverStyle} normalStyle={Styles.buttonStyle} />
                                <br />
                                <HoverButton onClick={goToSource} text="Source code" hoverStyle={Styles.buttonHoverStyle} normalStyle={Styles.buttonStyle} />
                            </div>
                        </> :
                        screenState === "about" ?
                            <>
                                <p style={Styles.header}>About me</p>
                                <p style={Styles.textStyle}>
                                    My name is Antonio Invernizzi. I've worked as a professional programmer for 20 years.<br />
                                    <br />
                                        Round 42 is a big reason why.<br />
                                    <br />
                                        It was 1990 and my parents bought our first PC. A 4 Mhz 8088 XT. It shipped with 3 games:
                                        <ul>
                                        <li>Digger</li>
                                        <li>A pinball machine</li>
                                        <li>Round 42</li>
                                    </ul>
                                </p>
                                <p>
                                    It is fair to say I was instantly addicted to Round 42 and spend many, many hours trying to beat the game often with my mother watching. <br />
                                        Good times :) <br />
                                        Course, spending hour uppon hour behind a PC made me curious what else I could do with it and... well... now I'm a programmer. <br />
                                        Though, I am not a game developer by trade I realy enjoyed the challenge of writing one.
                                    </p>
                                <p style={Styles.header}>Technologies used</p>
                                <ul>
                                    <li>TypeScript for coding</li>
                                    <li>WebPack for packaging</li>
                                    <li>Redux for state</li>
                                    <li>Immer for QoL state management.</li>
                                    <li>React (menu only)</li>
                                    <li>Howler for sound</li>
                                </ul>
                                <HoverButton onClick={() => setScreenState("mainmenu")} text="Back to main menu" hoverStyle={Styles.buttonHoverStyle} normalStyle={Styles.buttonStyle} />
                            </>
                            : screenState === "gameover" ?
                                <>
                                    <p style={Styles.header}>Game over</p>
                                    <br />
                                    <div style={Styles.defaultContainer}>
                                        <table style={{ ...Styles.textStyle, width: "20%" }}>
                                            <tbody>
                                                <tr><td>Score</td><td>{gameResult?.score}</td></tr>
                                                <tr><td>Bullets fired</td><td>{gameResult?.bulletsFired}</td></tr>
                                                <tr><td>Enemies hit</td><td>{gameResult?.enemiesHit}</td></tr>
                                                <tr><td>% Hit</td><td>{getHitPercentage(gameResult?.enemiesHit, gameResult?.bulletsFired)}</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <br />
                                    <div style={Styles.buttonContainer}>
                                        <HoverButton onClick={startGame} text="Play again?" hoverStyle={Styles.buttonHoverStyle} normalStyle={Styles.buttonStyle} />
                                    </div>
                                </>
                                : null
            }
        </div >
    );

    /**
     * Calculates the % hit to display when the game is over.
     * @param {number | undefined} enemiesHit. Number of enememies hit.
     * @param {number | undefined} bulletsFired. Number of bullets fired
     * @returns {string}. Percentage value to show.
     */
    function getHitPercentage(enemiesHit: number | undefined, bulletsFired: number | undefined): string {
        if (enemiesHit === undefined) {
            return "0%";
        }

        if (bulletsFired === undefined) {
            return "0%";
        }

        if (bulletsFired === 0) {
            return "0%";
        }

        const percentageHit = (enemiesHit / bulletsFired) * 100;

        return `${Math.round(percentageHit)}%`;
    }
}