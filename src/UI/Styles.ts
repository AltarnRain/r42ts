/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { CSSProperties } from "react";
import CGAColors from "../Constants/CGAColors";

/**
 * Module:          Styles
 * Responsibility:  Styles used by the UI
 */

const base: CSSProperties = {
    display: "flex",
};

const alignCenter: CSSProperties = {
    ...base,
    justifyContent: "center",
    flexDirection: "row",
};

const defaultFont: CSSProperties = {
    fontFamily: "consolas",
};

export namespace Styles {
    export const round42Header: CSSProperties = {
        ...alignCenter,
        ...defaultFont,
        color: CGAColors.yellow,
        fontFamily: "consolas",
        fontSize: 50
    };

    export const instructions: CSSProperties = {
        ...alignCenter,
        ...defaultFont,
        whiteSpace: "pre-wrap"
    };

    export const buttonContainer: CSSProperties = {
        ...alignCenter,
        fontFamily: "consolas",
        flexDirection: "column",
        flexGrow: 0,
        alignItems: "center",
    };

    export const buttonSize: CSSProperties = {
        ...alignCenter,
        ...defaultFont,
        width: "100px",
    };

    export const instructionsText: CSSProperties = {
        backgroundColor: "black",
        color: CGAColors.yellow,
        width: "400px",
        height: "300px",
    };
}
