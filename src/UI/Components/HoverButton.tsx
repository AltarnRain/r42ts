/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import React from "react";
import { AsciiUIElement } from "./AsciiUIElement";
import { Styles } from "../Styles";

/**
 * Module:          HoverButton
 * Responsibility:  Button that changes style when the mouse hovers over it.
 */

export function HoverButton(props: {
    text: string,
    disabled?: boolean,
    onClick?: () => void
}): JSX.Element {

    function click(): void {
        if (props.onClick) {
            props.onClick();
        }
    }

    return (
        <AsciiUIElement
            prefix={"\u00A0"}
            suffix={"\u00A0"}
            text={props.text}
            style={props.disabled ? Styles.uiDisabledStyle : Styles.uiStyle}
            hoverStyle={Styles.uiHoverStyle}
            onClick={click}
            tagName="button"
            disabled={props.disabled}
        />
    );
}
