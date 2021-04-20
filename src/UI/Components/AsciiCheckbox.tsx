/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import React, { ChangeEvent } from "react";
import { AsciiUIElement } from "./AsciiUIElement";
import { Styles } from "../Styles";

interface AsciiCheckboxProperties {
    /**
     * Characters that make up the slider. 
     * (0) First char is the left bracket
     * (1) Second char is the right bracket
     * (2) Third char is the empty bar char (I would recommend \u00A0)
     * (3) Last char is the full bar char
     */
    chars: string[];
    /**
     * True equals checked
     */
    value: boolean;
    /**
     * Triggered on value change
     * @param {boolean} value 
     */
    onChange(value: boolean): void;

    disabled?: boolean;
}

/**
 * AsciiCheckbox
 * For a functioning checkbox, the chars string length must at least be 4 characters long.
 * @param {AsciiCheckbox} props
 * @returns {JSX.Element}
 */
export function AsciiCheckbox({value, chars, onChange, disabled = false}: AsciiCheckboxProperties): JSX.Element {

    function onInputChange(event: ChangeEvent<HTMLInputElement>): void {
        if (event) {
            onChange(event.target.checked);
        }
    }

    return (
        <AsciiUIElement
            prefix={chars[0]}
            suffix={chars[1]}
            text={getAsciiCheckboxText(chars, value)}
            tagName="input"
            type="checkbox"
            checked={value}
            onChange={onInputChange}
            style={disabled ? Styles.sliderDisabledStyle : Styles.sliderBarStyle}
            fixStyle={disabled ? undefined : Styles.sliderStyle}
            hoverStyle={Styles.sliderHoverStyle}
            disabled={disabled}
        />
    );
};

/**
 * Generates the ascii string
 * @param {string[]} chars 
 * @param {boolean} value 
 * @returns {string}
 */
function getAsciiCheckboxText(chars: string[], value: boolean): string {
    return value ? chars[chars.length - 1] : chars[2];
}
