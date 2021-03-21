/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import React, { useState } from "react";
import { Styles } from "./Styles";

/**
 * Module:          HoverButton
 * Responsibility:  Button that changes style when the mouse hovers over it.
 */

export function HoverButton(props: {
    text: string,
    onClick: () => void
}): JSX.Element {

    const [hover, setHover] = useState(false);

    function toggleHover(): void {
        setHover(!hover);
    }

    return (
        <button style={hover ? Styles.buttonHoverStyle : Styles.buttonStyle} onClick={props.onClick} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>{props.text}</button>
    );
}
