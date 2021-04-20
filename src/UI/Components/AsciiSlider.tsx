/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import React, { ChangeEvent } from "react";
import { AsciiUIElement } from "./AsciiUIElement";
import { Styles } from "../Styles";

interface AsciiSliderProperties {
    /**
     * Characters that make up the slider. 
     * (0) First char is the left bracket
     * (1) Second char is the right bracket
     * (2) Third char is the empty bar char (I would recommend \u00A0)
     * (3) Last char is the full bar char
     * Anything between (2) and (3) are a variable number of transition chars.
     */
    chars: string[];
    /**
     * Length of the slider, in character count
     */
    charCount: number;
     /**
     * Value between min and max
     */
    value: number;
    /**
     * Value representing left side of the slider
     */
    min: number;
    /**
     * Value representing right side of the slider
     */
    max: number;
    /**
     * Step size
     */
    step: number;
    /**
     * Any change to value is returned through here
     * @param {number} value
     */
    onChange(value: number): void;

    disabled?: boolean;
}

/**
 * AsciiSlider
 * For a functioning slider, the chars string length must at least be 4 characters long.
 * @param {AsciiSliderProperties} props
 * @returns {JSX.Element}
 */
export function AsciiSlider({value, min, max, step, charCount, chars, onChange, disabled}: AsciiSliderProperties): JSX.Element {
    
    function onInputChange(event: ChangeEvent<HTMLInputElement>): void {
        if (event) {
            onChange(event.target.valueAsNumber);
        }
    }

    return (
        <AsciiUIElement
            prefix={chars[0]}
            suffix={chars[1]}
            text={getAsciiSliderString(chars, charCount, value, min, max)}
            style={disabled ? Styles.sliderDisabledStyle : Styles.sliderBarStyle}
            fixStyle={disabled ? undefined : Styles.sliderStyle}
            hoverStyle={Styles.sliderHoverStyle}
            fixClickable={false}
            tagName="input"
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={onInputChange}
            disabled={disabled}
        />
    );
}

/**
 * Generates the ascii string
 * @param {string[]} chars 
 * @param {number} charCount 
 * @param {number} value 
 * @param {number} min 
 * @param {number} max 
 * @returns {string}
 */
function getAsciiSliderString(chars: string[], charCount: number, value: number, min: number, max: number): string {
    // skip the first 2 chars
    const charsOffset = 2;
    const char0 = chars[charsOffset];
    const charL = chars[chars.length - 1];
    const lineCount = Math.max(1, charCount - charsOffset);
    const factor = (value - min) / (max - min);
    const filledCount = Math.floor(lineCount * factor);
    const transFactor = lineCount * factor - filledCount;
    const transChar = transFactor != 0 && transFactor != 1 ? chars[charsOffset + Math.floor(transFactor * (chars.length - charsOffset))] : '';
    return `${charL.repeat(filledCount)}${transChar}${char0.repeat(lineCount - filledCount - transChar.length)}`;
}
