/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import SpeedEnum from "./SpeedEnum";
import { SetSpeed } from "./SpeedTypes";

/**
 * Module:          SpeedActions
 * Responsibility:  Functions that create an actions to update the speed state.
 */

export function setSpeed(speed: number): SetSpeed {
    return {
        type: SpeedEnum.setSpeed,
        speed,
    };
}