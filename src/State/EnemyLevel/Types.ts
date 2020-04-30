/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Types
 * Responsibility:  Action types for the EnemyLevel state
 */

import { BaseEnemy } from "../../Base/BaseEnemy";
import { GameLocation } from "../../Models/GameLocation";
import ExplosionCenter from "../../Particles/ExplosionCenter";
import Particle from "../../Particles/Particle";
import Constants from "./Constants";

export interface ResetLevelState {
    type: typeof Constants.resetLevelState;
}

export interface SetEnemies {
    type: typeof Constants.setEnemies;
    payload: BaseEnemy[];
}

export interface AddParticle {
    type: typeof Constants.addParticle;
    payload: Particle;
}

export interface RemoveParticle {
    type: typeof Constants.removeParticle;
    payload: Particle;
}

export interface AddParticles {
    type: typeof Constants.addParticles;
    payload: Particle[];
}

export interface RemoveEnemy {
    type: typeof Constants.removeEnemy;
    payload: BaseEnemy;
}

export interface AddExplosionCenter {
    type: typeof Constants.addExplosionCenter;
    payload: ExplosionCenter;
}

export interface RemoveExplosionCenter {
    type: typeof Constants.removeExplosionCenter;
    payload: ExplosionCenter;
}

export interface SetPhaserLocations {
    type: typeof Constants.setPhaserLocations;
    payload: GameLocation[];
}

export interface ClearPhaserLocations {
    type: typeof Constants.clearPhaserLocations;
}

export interface SetFireInterval {
    type: typeof Constants.setFireInterval;
    payload: number;
}

export interface SetEnemyFireTick {
    type: typeof Constants.setEnemyFireTick;
    payload: {
        ship: BaseEnemy;
        tick: number;
    };
}
export type EnemyLevelTypes =
    ResetLevelState |
    SetEnemies |
    AddParticle |
    RemoveParticle |
    AddParticle |
    AddParticles |
    RemoveEnemy |
    AddExplosionCenter |
    RemoveExplosionCenter |
    SetPhaserLocations |
    ClearPhaserLocations |
    SetFireInterval |
    SetEnemyFireTick;
