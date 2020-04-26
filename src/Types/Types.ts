/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Types
 * Responsibility:  Define Types
 */

import { BaseEnemy } from "../Base/BaseEnemy";
import Explosion from "../Models/Explosion";
import { OffsetFrames } from "../Models/OffsetFrames";
import EnemyLevelState from "../State/Definition/EnemyLevelState";

/**
 * Defines frames. Frames are objects with key values that start with F{N}. Where N is the frame number.
 */
export type Frames = Frame[];

/**
 * A single frame.
 */
export type Frame = string[][];

/**
 * The types of game objects.
 */
export type GameObjectType = "particle" | "enemy" | "player" | "particle" | "explosion" | "playerbullet" | "enemybullet";

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

/**
 * Function definition of an angle provider function.
 */
export type AngleProviderFunction = (left: number, top: number) => number | undefined;

/**
 * Function definition of a FireCheckFunction.
 */
export type FireCheckFunction = (enemy: BaseEnemy, levelState: EnemyLevelState) => boolean;

export type ExplosionProviderFunction = () => Explosion;

export type FramesProviderFunction = () => Frames;

export type OffsetFramesProviderFunction = () => OffsetFrames;

export type FrameProviderFunction = () => Frame;