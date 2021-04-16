/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
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
    export const header: CSSProperties = {
        ...alignCenter,
        ...defaultFont,
        margin: "0px",
        color: CGAColors.yellow,
        fontSize: 50
    };

    export const defaultContainer: CSSProperties = {
        ...alignCenter
    };

    export const textStyle: CSSProperties = {
        ...defaultFont,
        backgroundColor: "black",
        color: CGAColors.yellow,
    };

    export const defaultTextContainer: CSSProperties = {
        ...defaultContainer,
        ...textStyle,
    };

    export const buttonContainer: CSSProperties = {
        ...alignCenter,
        ...defaultFont,
        flexDirection: "column",
        flexGrow: 0,
        alignItems: "center",
    };

    export const tableStyle: CSSProperties = {
        ...defaultFont,
        borderColor: "yellow",
        borderStyle: "double",
        color: "white",
        flexDirection: "column",
        width: "200px",
        textAlign:"center"
    }

    export const buttonStyle: CSSProperties = {
        ...alignCenter,
        ...defaultFont,
        backgroundColor: "black",
        color: "yellow",
        borderColor: "yellow",
        marginBottom: "10px",
        marginTop: "10px"
    };

    export const buttonHoverStyle: CSSProperties = {
        ...buttonStyle,
        backgroundColor: "yellow",
        color: "black",
    };
}
