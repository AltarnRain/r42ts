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
import EnemyLevelEnum from "./EnemyLevelEnum";
import { EnemyState } from "./EnemyState";
import { ExplosionCenterState } from "./ExplosionCenterState";

export interface ResetLevelState {
    type: typeof EnemyLevelEnum.resetLevelState;
}

export interface SetShrapnellState {
    type: typeof EnemyLevelEnum.setShrapnellState;
    shrapnell: ParticleState[];
}

export interface AddExplosionCenter {
    type: typeof EnemyLevelEnum.addExplosionCenter;
    explosionCenter: ExplosionCenterState;
    shrapnell: ParticleState[];
}

export interface SetPhaserLocations {
    type: typeof EnemyLevelEnum.setPhaserLocations;
    payload: GameLocation[];
}

export interface ClearPhaserLocations {
    type: typeof EnemyLevelEnum.clearPhaserLocations;
}

export interface SetExplosionCenters {
    type: typeof EnemyLevelEnum.setExplosionCenters;
    explosionCenters: ExplosionCenterState[];
}

export interface AddBullet {
    type: typeof EnemyLevelEnum.addBullet;
    bullet: ParticleState;
}

export interface SetBulletState {
    type: typeof EnemyLevelEnum.setBulletState;
    bullets: ParticleState[];
}

export interface SetTotalEnemies {
    type: typeof EnemyLevelEnum.setTotalEnemies;
    totalEnemies: number;
}

export interface RemoveEnemy {
    type: typeof EnemyLevelEnum.removeEnemy;
    enemyId: number;
}

export interface UpdateEnemyLastFireTick {
    type: typeof EnemyLevelEnum.setEnemyLastFireTick;
    payload: {
        enemyId: number,
        tick: number,
    };
}

export interface SetEnemies {
    type: typeof EnemyLevelEnum.setEnemies;
    enemies: EnemyState[];
}
export type EnemyLevelTypes =
    ResetLevelState |
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
