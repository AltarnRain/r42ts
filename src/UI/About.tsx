/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import React from "react";
import { setScreenState } from "../State/Game/GameActions";
import { dispatch } from "../State/Store";
import { HoverButton } from "./Components/HoverButton";
import { Styles } from "./Styles";

/**
 * Module:          About
 * Responsibility:  Show 'about' this game.
 */

export default function About(): JSX.Element {

    return (
        <>
            <p style={Styles.header}>About me</p>
            <div style={{ ...Styles.defaultContainer, flexDirection: "column", ...Styles.textStyle }}>
                <p>
                    <p>My name is Antonio Invernizzi. I've worked as a professional programmer for 20 years. Round 42 is a big reason why.</p>
                    <p>It was 1990 and my parents bought our first PC. A 4 Mhz 8088 XT. It shipped with 3 games:
                    <ul>
                            <li>Digger</li>
                            <li>A pinball machine</li>
                            <li>Round 42</li>
                        </ul>
                    </p>
                    <p>It is fair to say I was instantly addicted to Round 42 and spend many, many hours trying to beat the game often with my mother watching. <br/><br/>
                    Good times :).  <br/> <br/>
                    Course, spending hour uppon hour behind a PC made me curious what else I could do with it and... well... now I'm a programmer.
                    Though, I am not a game developer by trade I realy enjoyed the challenge of writing one.</p>
                    <p>I did NOT reverse engineer Round 42. Everything I put into this remake was gather from observation and experience.</p>
                </p>
                <p style={Styles.header}>Technologies used</p>
                <p>
                    <ul>
                        <li>TypeScript for coding</li>
                        <li>WebPack for packaging</li>
                        <li>Redux for state</li>
                        <li>Immer for QoL state management.</li>
                        <li>React (menu only)</li>
                        <li>React Redux (menu only)</li>
                        <li>Howler for sound</li>
                    </ul>
                </p>
                <div style={Styles.buttonContainer}>
                    <HoverButton onClick={() => dispatch(setScreenState("mainmenu"))} text="Back to main menu" />
                </div>
            </div>
        </>
    );
}