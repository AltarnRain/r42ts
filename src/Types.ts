/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Types
 * Responsibility:  Define Types
 */

import { BaseEnemy } from "./Base/BaseEnemy";
import Explosion from "./Models/Explosion";
import { OffsetFrames } from "./Models/OffsetFrames";
import { EnemyState } from "./State/EnemyLevel/EnemyState";

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
 * An angle provider function is NOT a pure function. It may pull in state
 * To determine the best angle. For example, enemies mostly limited to diagonal angles
 * Begin firing straight down once a certain amount of enemies are left.
 */
export type FireAngleProviderFunction = (enemy: BaseEnemy, left: number, top: number) => number | undefined;

/**
 * Function definition of a FireCheckFunction.
 * A fire check function accepts the current enemy being checked if it can be fired.
 * Fire check functions are NOT pure. They CAN pull in state and do additional checks.
 */
export type FireCheckFunction = (enemyState: EnemyState) => boolean;

/**
 * Always provides a fresh explosion object.
 */
export type ExplosionProviderFunction = () => Explosion;

/**
 * Always provides a fresh frame.
 */
export type FramesProviderFunction = () => Frames;

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
 * A function that provides an array of enemies that can fire.
 */
export type ShipsToFireFunction = (enemies: EnemyState[]) => EnemyState[];

export type Enemies = "bird" | "robot" | "orb";