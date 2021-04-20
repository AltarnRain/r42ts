/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import React from "react";
import { AsciiUIElement } from "../AsciiUIElement";
import { Styles } from "../Styles";

/**
 * Module:          HoverButton
 * Responsibility:  Button that changes style when the mouse hovers over it.
 */

export function HoverButton(props: {
    text: string,
    onClick?: () => void
}): JSX.Element {

    function click(): void {
        if (props.onClick) {
            props.onClick();
        }
    }

    return (
        <AsciiUIElement
            tagName="input"
            type="button"
            prefix={"\u00A0"}
            suffix={"\u00A0"}
            text={props.text}
            style={Styles.buttonStyle}
            hoverStyle={Styles.buttonHoverStyle}
            onClick={click}
        />
    );
}
