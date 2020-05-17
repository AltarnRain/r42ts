/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          EnemyLevelTypes
 * Responsibility:  Action types for EnemyLevelState changes.
 */

import { GameLocation } from "../../Models/GameLocation";
import { ParticleState } from "../ParticleState";
import Constants from "./EnemyLevelConstants";
import { EnemyState } from "./EnemyState";
import { ExplosionCenterState } from "./ExplosionCenterState";

export interface ResetLevelState {
    type: typeof Constants.resetLevelState;
}

export interface AddParticle {
    type: typeof Constants.addParticle;
    particle: ParticleState;
}

export interface AddParticles {
    type: typeof Constants.addParticles;
    particles: ParticleState[];
}

export interface SetShrapnellState {
    type: typeof Constants.setShrapnellState;
    shrapnell: ParticleState[];
}

export interface AddExplosionCenter {
    type: typeof Constants.addExplosionCenter;
    explosionCenter: ExplosionCenterState;
    shrapnell: ParticleState[];
}

export interface SetPhaserLocations {
    type: typeof Constants.setPhaserLocations;
    payload: GameLocation[];
}

export interface ClearPhaserLocations {
    type: typeof Constants.clearPhaserLocations;
}

export interface SetExplosionCenters {
    type: typeof Constants.setExplosionCenters;
    explosionCenters: ExplosionCenterState[];
}

export interface AddBullet {
    type: typeof Constants.addBullet;
    bullet: ParticleState;
}

export interface SetBulletState {
    type: typeof Constants.setBulletState;
    bullets: ParticleState[];
}

export interface SetTotalEnemies {
    type: typeof Constants.setTotalEnemies;
    totalEnemies: number;
}

export interface RemoveEnemy {
    type: typeof Constants.removeEnemy;
    enemyId: number;
}

export interface UpdateEnemyLastFireTick {
    type: typeof Constants.setEnemyLastFireTick;
    payload: {
        enemyId: number,
        tick: number,
    };
}

export interface SetEnemies {
    type: typeof Constants.setEnemies;
    enemies: EnemyState[];
}
export type EnemyLevelTypes =
    ResetLevelState |
    AddParticle |
    AddParticles |
    SetShrapnellState |
    AddExplosionCenter |
    SetPhaserLocations |
    ClearPhaserLocations |
    SetExplosionCenters |
    AddBullet |
    SetBulletState |
    SetTotalEnemies |
    RemoveEnemy |
    UpdateEnemyLastFireTick |
    SetEnemies
    ;
