/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Actions
 * Responsibility:  Action creators for the EnemyLevelState
 */

import { BaseEnemy } from "../../Base/BaseEnemy";
import { GameLocation } from "../../Models/GameLocation";
import Particle from "../../Particles/Particle";
import { ParticleState } from "../Player/ParticleState";
import Constants from "./Constants";
import { ExplosionCenterState } from "./ExplosionCenterState";
import { ExplosionData } from "./ExplosionData";
import { AddExplosionCenter, AddParticle, AddParticles, ClearPhaserLocations, RemoveEnemy, ResetLevelState, SetEnemies, SetEnemyFireTick, SetExplosionData, SetFireInterval, SetPhaserLocations, SetParticleState as SetShrapnellState } from "./Types";

export function resetLevelState(): ResetLevelState {
    return {
        type: Constants.resetLevelState,
    };
}

export function setEnemies(enemies: BaseEnemy[]): SetEnemies {
    return {
        type: Constants.setEnemies,
        payload: enemies,
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

export function setShrapnellState(shrapnell: ParticleState[]): SetShrapnellState {
    return {
        type: Constants.setShrapnellState,
        shrapnell,
    };
}

export function removeEnemy(enemy: BaseEnemy): RemoveEnemy {
    return {
        type: Constants.removeEnemy,
        payload: enemy
    };
}

export function addExplosionCenter(explosionCenter: ExplosionCenterState): AddExplosionCenter {
    return {
        type: Constants.addExplosionCenter,
        payload: explosionCenter,
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

export function setEnemyFireTick(ship: BaseEnemy, tick: number): SetEnemyFireTick {
    return {
        type: Constants.setEnemyFireTick,
        payload: {
            ship,
            tick
        },
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