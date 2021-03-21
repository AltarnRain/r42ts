/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import SpeedEnum from "./SpeedEnum";

/**
 * Module:          SpeedTypes
 * Responsibility:  Actions for the speed reducer
 */

export interface SetSpeed {
    type: typeof SpeedEnum.setSpeed;
    speed: number;
}

export type SpeedTypes = SetSpeed;