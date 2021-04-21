/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import React, { ComponentProps, CSSProperties, useState } from "react";

const htmlElementStyle: CSSProperties = {
    display: "block",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    margin: 0,
    opacity: 0,
};

const htmlElementSizeTargetStyle: CSSProperties = {
    display: "inline",
    position: "relative",
};

type AsciiUIElement<T extends keyof JSX.IntrinsicElements> = ComponentProps<T> & {
    /**
     * Name of the invisible HTML element that will be stretched over the text to capture user input.
     * All other props will be passed to this element.
     */
    tagName: T
     /**
     * The text string to display
     */
    text: string;
    /**
     * The style to apply to the text
     */
    style: CSSProperties;
    /**
     * The style of the text when the user hovers over or focuses the element
     */
    hoverStyle?: CSSProperties;
    /**
     * The string to prepend to the text.
     * Can be styled independently from text.
     */
    prefix?: string;
    /**
     * The string to append to the text.
     * Can be styled independently from text.
     */
    suffix?: string;
    /**
     * The style of the prefix and suffix
     */
    affixStyle?: CSSProperties;
    /**
     * The style of the prefix and suffix when the user hovers over or focuses the element
     */
    affixHoverStyle?: CSSProperties;
    /**
     * Whether or not the invisible HTML element will be stretched over the prefix and suffix
     * Default is true
     */
    affixClickable?: boolean;
}

/**
 * AsciiUIElement
 * Used to create interactive UI elements that look like a string of characters.
 * @param {AsciiUIElement} props
 * @returns {JSX.Element}
 */
export function AsciiUIElement<T extends keyof JSX.IntrinsicElements>({
    tagName,
    affixClickable = true,
    prefix = "",
    suffix = "",
    text,
    style,
    affixStyle,
    hoverStyle,
    affixHoverStyle,
    ...elementProps
}: AsciiUIElement<T>): JSX.Element {

    const [hover, setHover] = useState(false);

    function onMouseEnter(): void {
        setHover(true);
    }

    function onMouseLeave(): void {
        setHover(false);
    }

    const prefixSuffixStyle = hover && (affixHoverStyle || hoverStyle) || affixStyle || style;
    const textStyle = hover && hoverStyle || style;

    return (
        <span style={affixClickable ? htmlElementSizeTargetStyle : undefined}>
            <span style={prefixSuffixStyle}>{prefix}</span>
            <span style={affixClickable ? undefined : htmlElementSizeTargetStyle}>
                <span style={textStyle}>
                    {text}
                </span>
                {React.createElement(tagName, {
                    onMouseEnter,
                    onMouseLeave,
                    onFocus: onMouseEnter,
                    onBlur: onMouseLeave,
                    style: htmlElementStyle,
                    ...elementProps,
                })}
            </span>
            <span style={prefixSuffixStyle}>{suffix}</span>
        </span>
    );
}
