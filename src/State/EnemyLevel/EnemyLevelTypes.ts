/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Types
 * Responsibility:  Action types for the EnemyLevel state
 */

import { GameLocation } from "../../Models/GameLocation";
import { ParticleState } from "../Player/ParticleState";
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

export interface SetFireInterval {
    type: typeof Constants.setFireInterval;
    payload: number;
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

export interface AddOrUpdateEnemy {
    type: typeof Constants.addOrUpdateEnemy;
    enemyState: EnemyState;
}

export interface RemoveEnemy {
    type: typeof Constants.removeEnemy;
    enemyId: number;
}

export type EnemyLevelTypes =
    ResetLevelState |
    AddParticle |
    AddParticles |
    SetShrapnellState |
    AddExplosionCenter |
    SetPhaserLocations |
    ClearPhaserLocations |
    SetFireInterval |
    SetExplosionCenters |
    AddBullet |
    SetBulletState |
    SetTotalEnemies |
    AddOrUpdateEnemy |
    RemoveEnemy
    ;
