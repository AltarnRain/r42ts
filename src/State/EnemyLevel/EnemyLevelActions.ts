/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Actions
 * Responsibility:  Action creators for the EnemyLevelState
 */

import { GameLocation } from "../../Models/GameLocation";
import { ParticleState } from "../Player/ParticleState";
import Constants from "./EnemyLevelConstants";
import { AddBullet, AddExplosionCenter, AddOrUpdateEnemy, AddParticle, AddParticles, ClearPhaserLocations, RemoveEnemy, ResetLevelState, SetBulletState, SetExplosionData, SetFireInterval, SetPhaserLocations, SetRemainingEnemies, SetShrapnellState, SetTotalEnemies } from "./EnemyLevelTypes";
import { EnemyState } from "./EnemyState";
import { ExplosionCenterState } from "./ExplosionCenterState";
import { ExplosionData } from "./ExplosionData";

export function resetLevelState(): ResetLevelState {
    return {
        type: Constants.resetLevelState,
    };
}

export function addParticle(particle: ParticleState): AddParticle {
    return {
        type: Constants.addParticle,
        particle,
    };
}

export function addParticles(particles: ParticleState[]): AddParticles {
    return {
        type: Constants.addParticles,
        particles,
    };
}

export function addExplosionCenter(explosionCenter: ExplosionCenterState, shrapnell: ParticleState[]): AddExplosionCenter {
    return {
        type: Constants.addExplosionCenter,
        explosionCenter,
        shrapnell,
    };
}

export function setShrapnellState(shrapnell: ParticleState[]): SetShrapnellState {
    return {
        type: Constants.setShrapnellState,
        shrapnell,
    };
}

export function setPhaserLocations(locations: GameLocation[]): SetPhaserLocations {
    return {
        type: Constants.setPhaserLocations,
        payload: locations,
    };
}

export function clearPhaserLocations(): ClearPhaserLocations {
    return {
        type: Constants.clearPhaserLocations,
    };
}

export function setFireInterval(interval: number): SetFireInterval {
    return {
        type: Constants.setFireInterval,
        payload: interval,
    };
}

export function setExplosionData(explosionData: ExplosionData): SetExplosionData {
    return {
        type: Constants.setExplosionData,
        explosionData,
    };
}

export function setExplosionCenters(explosionCenters: ExplosionCenterState[]) {
    return {
        type: Constants.setExplosionCenters,
        explosionCenters
    };
}

export function addBullet(bullet: ParticleState): AddBullet {
    return {
        type: Constants.addBullet,
        bullet,
    };
}

export function setBulletState(bullets: ParticleState[]): SetBulletState {
    return {
        type: Constants.setBulletState,
        bullets,
    };
}

export function setTotalEnemies(totalEnemies: number): SetTotalEnemies {
    return {
        type: Constants.setTotalEnemies,
        totalEnemies,
    };
}

export function setRemainingEnemies(remainingEnemies: number): SetRemainingEnemies {
    return {
        type: Constants.setRemainingEnemies,
        remainingEnemies,
    };
}

export function addOrUpdateEnemy(enemyState: EnemyState): AddOrUpdateEnemy {
    return {
        type: Constants.addOrUpdateEnemy,
        enemyState,
    };
}

export function removeEnemy(enemyId: number): RemoveEnemy {
    return {
        type: Constants.removeEnemy,
        enemyId,
    };
}