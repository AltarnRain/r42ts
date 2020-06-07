/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import React from "react";
import { HoverButton } from "./HoverButton";
import { Styles } from "./Styles";
import { ScreenState } from "./UITypes";

/**
 * Module:          About
 * Responsibility:  Show 'about' this game.
 */

export default function About(props: { setScreenState(setScreenState: ScreenState): void }): JSX.Element {

    const {
        setScreenState
    } = props;

    return (
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
    );
}