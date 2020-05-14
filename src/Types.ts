/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Types
 * Responsibility:  Define Types
 */

import Explosion from "./Models/Explosion";
import { OffsetFrames } from "./Models/OffsetFrames";
import ShipToFire from "./ShipsToFire";

/**
 * A single frame.
 */
export type Frame = string[][];

/**
 * A function that accepts a 'tick' as a parameter.
 */
export type TickFunction = (tick: number) => void;

/**
 * Movement Limits for the player.
 */
export type MoveLimits = "immobile" | "sideways" | "forceup" | "none";

/**
 * A function that pulls in state to determine which ships should fire.
 */
export type ShipsToFireFunction = (tick: number) => ShipToFire[];

/**
 * Always provides a fresh explosion object.
 */
export type ExplosionProviderFunction = () => Explosion;

/**
 * Always provides a fresh OffsetFrame object.
 */
export type OffsetFramesProviderFunction = () => OffsetFrames;

/**
 * Always profirs a fres frame.
 */
export type FrameProviderFunction = () => Frame;

/**
 * An angle. An angle can be a number or undefined.
 */
export type Angle = number | undefined;

/**
 * All enemies and variations.
 */
export type Enemies =
    "bird" |
    "robot" |
    "orb" |
    "spinner" |
    "balloon" |
    "asteroid-down" |
    "asteroid-diagonal" |
    "piston" |
    "diabolo" |
    "spacemonster-down" |
    "spacemonster-diagonal" |
    "devil" |
    "crab" |
    "bat";