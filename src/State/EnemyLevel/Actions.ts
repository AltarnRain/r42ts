import { BaseEnemy } from "../../Base/BaseEnemy";
import BaseParticle from "../../Base/BaseParticle";
import { GameLocation } from "../../Models/GameLocation";
import ExplosionCenter from "../../Particles/ExplosionCenter";
import Constants from "./Constants";
import { AddExplosionCenter, AddParticle, AddParticles, ClearPhaserLocations, RemoveEnemy, RemoveExplosionCenter, ResetLevelState, SetEnemies, SetEnemyFireTick, SetFireInterval, SetPhaserLocations, RemoveParticle } from "./Types";
import PlayerShip from "../../Player/PlayerShip";

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

export function addParticle(particle: BaseParticle): AddParticle {
    return {
        type: Constants.addParticle,
        payload: particle,
    };
}

export function addParticles(particles: BaseParticle[]): AddParticles {
    return {
        type: Constants.addParticles,
        payload: particles,
    };
}

export function removeParticle(particle: BaseParticle): RemoveParticle {
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