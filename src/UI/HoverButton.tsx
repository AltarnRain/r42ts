/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import React, { useState} from "react";

/**
 * Module:          HoverButton
 * Responsibility:  Button that changes style when the mouse hovers over it.
 */

export function HoverButton(props: { text: string, hoverStyle: React.CSSProperties, normalStyle: React.CSSProperties, onClick: () => void }): JSX.Element {

    const [hover, setHover] = useState(false);

    function toggleHover(): void {
        setHover(!hover);
    }

    return (
        <button style={hover ? props.hoverStyle : props.normalStyle} onClick={props.onClick} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>{props.text}</button>
    );
}
