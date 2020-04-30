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
import ExplosionCenter from "../../Particles/ExplosionCenter";
import Particle from "../../Particles/Particle";
import Constants from "./Constants";
import { AddExplosionCenter, AddParticle, AddParticles, ClearPhaserLocations, RemoveEnemy, RemoveExplosionCenter, RemoveParticle, ResetLevelState, SetEnemies, SetEnemyFireTick, SetFireInterval, SetPhaserLocations } from "./Types";

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

export function addParticle(particle: Particle): AddParticle {
    return {
        type: Constants.addParticle,
        payload: particle,
    };
}

export function addParticles(particles: Particle[]): AddParticles {
    return {
        type: Constants.addParticles,
        payload: particles,
    };
}

export function removeParticle(particle: Particle): RemoveParticle {
    return {
        type: Constants.removeParticle,
        payload: particle,
    };
}

export function removeEnemy(enemy: BaseEnemy): RemoveEnemy {
    return {
        type: Constants.removeEnemy,
        payload: enemy
    };
}

export function addExplosionCenter(explosionCenter: ExplosionCenter): AddExplosionCenter {
    return {
        type: Constants.addExplosionCenter,
        payload: explosionCenter,
    };
}

export function removeExplosionCenter(explosionCenter: ExplosionCenter): RemoveExplosionCenter {
    return {
        type: Constants.removeExplosionCenter,
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