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
        fontSize: 50
    };

    export const defaultContainer: CSSProperties = {
        ...alignCenter
    };

    export const buttonContainer: CSSProperties = {
        ...alignCenter,
        ...defaultFont,
        flexDirection: "column",
        flexGrow: 0,
        alignItems: "center",
    };

    export const buttonStyle: CSSProperties = {
        ...alignCenter,
        ...defaultFont,
        backgroundColor: "black",
        color: "yellow",
        width: "100px",
        borderColor: "yellow",
    };

    export const buttonHoverStyle: CSSProperties = {
        ...buttonStyle,
        backgroundColor: "yellow",
        color: "black",
    };

    export const textStyle: CSSProperties = {
        ...defaultFont,
        backgroundColor: "black",
        color: CGAColors.yellow,
    };
}
