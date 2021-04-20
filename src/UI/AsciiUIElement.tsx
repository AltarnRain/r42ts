/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import React, { ComponentProps, CSSProperties, useState } from "react";

const sliderContainerStyle: CSSProperties = {
    display: "inline",
    position: "relative",
};

const inputStyle: CSSProperties = {
    display: "block",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    margin: 0,
    opacity: 0,
};

const inline: CSSProperties = {
    display: "inline",
};

type AsciiUIElement<T extends keyof JSX.IntrinsicElements> = ComponentProps<T> & {
    tagName: T
    prefix: string;
    suffix: string;
    text: string;
    style: CSSProperties;
    fixStyle?: CSSProperties;
    hoverStyle?: CSSProperties;
    fixHoverStyle?: CSSProperties;
}

/**
 * AsciiInput
 * Because the component logic is mostly the same.
 * @param {AsciiUIElement} props
 * @returns {JSX.Element}
 */
export function AsciiUIElement<T extends keyof JSX.IntrinsicElements>({ tagName, prefix, suffix, text, style, fixStyle, hoverStyle, fixHoverStyle, ...inputProps }: AsciiUIElement<T>): JSX.Element {

    const [hover, setHover] = useState(false);

    function onMouseEnter(): void {
        setHover(true);
    }

    function onMouseLeave(): void {
        setHover(false);
    }

    const leftRightStyle = hover && (fixHoverStyle || hoverStyle) || fixStyle || style;
    const centerStyle = hover && hoverStyle || style;

    return (
        <span style={inline}>
            <span style={leftRightStyle}>{prefix}</span>
            <span style={sliderContainerStyle}>
                <span style={centerStyle}>
                    {text}
                </span>
                {React.createElement(tagName, {
                    onMouseEnter,
                    onMouseLeave,
                    onFocus: onMouseEnter,
                    onBlur: onMouseLeave,
                    style: inputStyle,
                    ...inputProps,
                })}
            </span>
            <span style={leftRightStyle}>{suffix}</span>
        </span>
    );
}
