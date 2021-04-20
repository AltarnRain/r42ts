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

const alignLeft: CSSProperties = {
    ...base,
    justifyContent: "flex-start",
    flexDirection: "row",
};

const defaultFont: CSSProperties = {
    fontFamily: "DOS",
    fontSize: 24,
};

export namespace Styles {
    export const root: CSSProperties = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        minHeight: "100%",
    };

    export const page: CSSProperties = {
        ...defaultFont,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: CGAColors.lightBlue,
        paddingBottom: "1em",
        flex: 1,
        maxWidth: 1080,
    };

    export const defaultContainer: CSSProperties = {
        ...alignLeft,
        padding: "1em",
        margin: "1em 1em 0 1em",
        backgroundColor: CGAColors.blue,
    };

    export const header: CSSProperties = {
        ...defaultContainer,
        ...alignCenter,
        ...defaultFont,
        color: CGAColors.lightCyan,
        fontSize: 24,
    };

    export const textStyle: CSSProperties = {
        ...defaultFont,
        color: CGAColors.white,
    };

    export const defaultTextContainer: CSSProperties = {
        ...textStyle,
        ...defaultContainer,
        flexDirection: "column",
    };

    export const buttonContainer: CSSProperties = {
        ...alignCenter,
        ...defaultFont,
        ...defaultContainer,
        alignItems: "center",
    };

    export const tableStyle: CSSProperties = {
        ...defaultFont,
        borderCollapse: "separate",
        borderSpacing: "0.1em",
    }

    export const tableCellStyle: CSSProperties = {
        ...textStyle,
        borderColor: CGAColors.white,
        borderStyle: "solid",
        borderWidth: "0.1em",
        padding: "0.1em",
        textAlign:"center",
        width: 400,
    }

    export const tableTextCellStyle: CSSProperties = {
        ...tableCellStyle,
        padding: "0.1em 0.6em",
    };

    export const tableHeaderCellStyle: CSSProperties = {
        ...tableTextCellStyle,
        color: CGAColors.lightCyan,
    };

    export const buttonStyle: CSSProperties = {
        ...defaultFont,
        backgroundColor: CGAColors.blue,
        color: CGAColors.yellow,
    };

    export const buttonHoverStyle: CSSProperties = {
        ...buttonStyle,
        backgroundColor: "yellow",
        color: "black",
    };

    export const sliderStyle: CSSProperties = {
        ...defaultFont,
    };

    export const sliderBarStyle: CSSProperties = {
        ...sliderStyle,
        color: CGAColors.yellow,
    };

    export const sliderHoverStyle: CSSProperties = {
        ...sliderStyle,
        backgroundColor: CGAColors.yellow,
        color: CGAColors.blue,
    };

    export const buttonSeparator: CSSProperties = {
        ...textStyle,
        padding: "0 0.5em",
    };

    export const spacer: CSSProperties = {
        flex: 1,
    };
}
