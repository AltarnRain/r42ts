/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          KeybindingsMapping
 * Responsibility:  Object that makes it easy to determine which action a keypress should trigger.
 */

import { getKeyValue } from "../../Utility/Lib";
import { KeybindingsState } from "./KeybindingsState";

interface Mapping {
    keycode: keyof KeybindingsState;
    binding: string;
}

let KeybindingsMappingInner: Mapping[] = [];
let gameKeys: string[] = [];
export namespace KeybindingsMapping {
    export function update(keybindings: KeybindingsState): void {
        KeybindingsMappingInner = [];
        for (const key of Object.keys(keybindings)) {
            const castKeyCode = key as keyof KeybindingsState;
            KeybindingsMappingInner.push({
                keycode: castKeyCode,
                binding: getKeyValue<KeybindingsState, keyof KeybindingsState>(castKeyCode, keybindings),
            });
        }

        gameKeys = [];
        gameKeys = getMapping().map((m) => m.binding);
    }

    export function getMapping(): Mapping[] {
        return [...KeybindingsMappingInner];
    }

    export function getAllGameKeys(): string[] {
        return gameKeys;
    }
}