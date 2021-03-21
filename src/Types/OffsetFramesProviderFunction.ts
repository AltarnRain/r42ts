/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { OffsetFrames } from "../Models/OffsetFrames";

/**
 * Module:          OffsetFramesProviderFunction
 * Responsibility:  Define the typing for an off set frames provider.
 */

/**
 * Always provides a fresh OffsetFrame object.
 */
type OffsetFramesProviderFunction = () => OffsetFrames;

export default OffsetFramesProviderFunction;