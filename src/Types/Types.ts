/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Types
 * Responsibility:  Define Types
 */

import Dictionary from "../Models/Dictionary";

/**
 * Defines frames. Frames are objects with key values that start with F{N}. Where N is the frame number.
 */
export type Frames = Dictionary<Frame>;

/**
 * A single frame.
 */
export type Frame = string[][];

/**
 * The types of game objects.
 */
export type GameObjectType = "particle" | "enemy" | "player" | "particle" | "explosion" | "playerbullet";

/**
 * A function that accepts a 'tick' as a parameter.
 */
export type TickFunction = (tick: number) => void;

/**
 * Movement Limits for the player.
 */
export type MoveLimits = "immobile" | "sideways" | "forceup" | "none";

/**
 * Defines the phases of the player formation.
 */
export type PlayerFormationPhases = "begin" | "inprogress" | undefined;
