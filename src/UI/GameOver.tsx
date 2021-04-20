/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import React, { CSSProperties } from "react";
import CGAColors from "../Constants/CGAColors";
import GameResultModel from "../Models/GameResultModel";
import { setScreenState } from "../State/Game/GameActions";
import { dispatch } from "../State/Store";
import { HoverButton } from "./Components/HoverButton";
import { Styles } from "./Styles";

/**
 * Module:          GameOver
 * Responsibility:  Game over screen
 */

const gameOverPage: CSSProperties = {...Styles.page, backgroundColor: CGAColors.black};
const gameOverContainer: CSSProperties = {...Styles.defaultTextContainer};

export default function GameOver(props: { gameResult: GameResultModel | undefined }): JSX.Element {
    const {
        gameResult
    } = props;

    return (
        <div style={gameOverPage}>
            <div style={Styles.spacer}/>
            <p style={Styles.header}>Game over</p>
            <div style={gameOverContainer}>
                <table>
                    <tbody>
                        <tr>
                            <td style={Styles.tableTextCellStyle}>Score</td>
                            <td style={Styles.tableTextCellStyle}>{gameResult?.score}</td></tr>
                        <tr>
                            <td style={Styles.tableTextCellStyle}>Bullets fired</td>
                            <td style={Styles.tableTextCellStyle}>{gameResult?.bulletsFired}</td>
                        </tr>
                        <tr>
                            <td style={Styles.tableTextCellStyle}>Enemies hit</td>
                            <td style={Styles.tableTextCellStyle}>{gameResult?.enemiesHit}</td>
                        </tr>
                        <tr>
                            <td style={Styles.tableTextCellStyle}>% Hit</td>
                            <td style={Styles.tableTextCellStyle}>{getHitPercentage(gameResult?.enemiesHit, gameResult?.bulletsFired)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style={Styles.buttonContainer}>
                <HoverButton onClick={() => dispatch(setScreenState("mainmenu"))} text="Ok" />
            </div>
            <div style={Styles.spacer}/>
        </div>
    );
}

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