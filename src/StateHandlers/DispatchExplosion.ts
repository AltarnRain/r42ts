/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          QueueExplosionRender
 * Responsibility:  Helper function to add a full explosion to the state.
 */

import Explosion from "../Models/Explosion";
import dimensionProvider from "../Providers/DimensionProvider";
import { addExplosionCenter } from "../State/EnemyLevel/EnemyLevelActions";
import { ExplosionCenterState } from "../State/EnemyLevel/ExplosionCenterState";
import { StateProviders } from "../State/StateProviders";
import { dispatch } from "../State/Store";
import { getFrameHitbox } from "../Utility/Frame";

const {
    pixelSize
} = dimensionProvider();

/**
 * Handles the dispatches to add an explosion with shrapnell to the state.
 * @param {number} left. Left coordinate.
 * @param {number} top. Top coordinate.
 * @param {Explosion} explosion. An explosion asset.
 * @param {Particle[]} targetParticleArray. The array where the particles will be pushed into. Helps keep track of particles belonging to the player or an enemy.
 */
export function dispatchExplosion(left: number, top: number, coloredExplosion: Explosion, tick: number): void {

    const newShrapnell = StateProviders.explosionShrapnellProvider(left, top, coloredExplosion);
    const explosionHitbox = getFrameHitbox(left, top, coloredExplosion.explosionCenterFrame, pixelSize);

    const newExplosion: ExplosionCenterState = {
        left,
        top,
        startTick: tick,
        hitbox: explosionHitbox,
        coloredFrame: coloredExplosion.explosionCenterFrame,
        explosionCenterDelay: coloredExplosion.explosionCenterDelay,
    };

    dispatch(addExplosionCenter(newExplosion, newShrapnell));
}