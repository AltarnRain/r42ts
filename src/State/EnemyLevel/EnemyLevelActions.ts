/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          EnemyLevelActions
 * Responsibility:  Action creators for the EnemyLevelState
 */

import GameLocation from "../../Models/GameLocation";
import { ParticleState } from "../ParticleState";
import EnemyLevelEnum from "./EnemyLevelEnum";
import { AddBullet, AddExplosionCenter, ClearPhaserLocations, RemoveEnemy, ResetLevelState, SetBulletState, SetEnemies, SetPhaserLocations, SetShrapnellState, SetTotalEnemies, UpdateEnemyLastFireTick as SetEnemyLastFireTick } from "./EnemyLevelTypes";
import { EnemyState } from "./EnemyState";
import { ExplosionCenterState } from "./ExplosionCenterState";

export function resetLevelState(): ResetLevelState {
    return {
        type: EnemyLevelEnum.resetLevelState,
    };
}

export function addExplosionCenter(explosionCenter: ExplosionCenterState, shrapnell: ParticleState[]): AddExplosionCenter {
    return {
        type: EnemyLevelEnum.addExplosionCenter,
        explosionCenter,
        shrapnell,
    };
}

export function setShrapnellState(shrapnell: ParticleState[]): SetShrapnellState {
    return {
        type: EnemyLevelEnum.setShrapnellState,
        shrapnell,
    };
}

export function setPhaserLocations(locations: GameLocation[]): SetPhaserLocations {
    return {
        type: EnemyLevelEnum.setPhaserLocations,
        payload: locations,
    };
}

export function clearPhaserLocations(): ClearPhaserLocations {
    return {
        type: EnemyLevelEnum.clearPhaserLocations,
    };
}

export function setExplosionCenters(explosionCenters: ExplosionCenterState[]) {
    return {
        type: EnemyLevelEnum.setExplosionCenters,
        explosionCenters
    };
}

export function addBullet(bullet: ParticleState): AddBullet {
    return {
        type: EnemyLevelEnum.addBullet,
        bullet,
    };
}

export function setBulletState(bullets: ParticleState[]): SetBulletState {
    return {
        type: EnemyLevelEnum.setBulletState,
        bullets,
    };
}

export function setTotalEnemies(totalEnemies: number): SetTotalEnemies {
    return {
        type: EnemyLevelEnum.setTotalEnemies,
        totalEnemies,
    };
}

export function removeEnemy(enemyId: number): RemoveEnemy {
    return {
        type: EnemyLevelEnum.removeEnemy,
        enemyId,
    };
}

export function setEnemyLastFireTick(enemyId: number, tick: number): SetEnemyLastFireTick {
    return {
        type: EnemyLevelEnum.setEnemyLastFireTick,
        payload: {
            enemyId,
            tick,
        }
    };
}

export function setEnemiesState(enemies: EnemyState[]): SetEnemies {
    return {
        type: EnemyLevelEnum.setEnemies,
        enemies,
    };
}