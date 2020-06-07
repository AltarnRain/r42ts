/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import calculateSpeed from "../../Utility/CalculateSpeed";
import baseBulletSpeeds from "./BaseBulletSpeeds";
import baseMovementSpeeds from "./BaseMovementSpeeds";
import SpeedEnum from "./SpeedEnum";
import SpeedState from "./SpeedState";
import { SpeedTypes } from "./SpeedTypes";

/**
 * Module:          SpeedReducer
 * Responsibility:  Provides the speed state
 */

const baseSpeed = 100;

export default function speedReducer(state: SpeedState = createSpeedState(baseSpeed), action: SpeedTypes): SpeedState {
    switch (action.type) {
        case SpeedEnum.setSpeed:
            return createSpeedState(action.speed);
        default:
            return state;
    }
}

/**
 * Create the speed state.
 * @param {number} speed. The speed to create a speed state with.
 */
function createSpeedState(speed: number): SpeedState {
    return {
        movement: convertSpeeds(baseMovementSpeeds, speed),
        bullets: convertSpeeds(baseBulletSpeeds, speed),
        gameSpeed: speed,
        minimumDistance: calculateSpeed(20, speed),
    };
}

/**
 * Converts a 'speed' object. It is a 1 on 1 copy but the speeds are all recalculated.
 * @param {any} a. any.
 */
function convertSpeeds(a: any, gameSpeed: number): any {
    const base: any = {};
    for (const key of Object.keys(a)) {
        const keyValue = a[key];

        if (typeof keyValue === "number") {
            base[key] = calculateSpeed(keyValue, gameSpeed);
        } else if (Array.isArray(keyValue)) {
            base[key] = keyValue.map((v) => calculateSpeed(v, gameSpeed));
        } else if (typeof keyValue === "object" && keyValue !== null) {
            base[key] = convertSpeeds(keyValue, gameSpeed);
        } else {
            throw new Error("Not a supported value");
        }
    }

    return base;
}