/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          StateProviders
 * Responsibility:  Functions that provide a state object.
 */

import { ParticleState } from "../State/Player/ParticleState";
import { Frame } from "../Types";
import { getFrameHitbox } from "../Utility/Frame";

export namespace StateProviders {
    export function getParticleState(
        left: number,
        top: number,
        speed: number,
        angle: number,
        frame: Frame,
        acceletation: number = 1,
        hitboxTopOffset: number = 0,
        hitboxBottomOffset: number = 0): ParticleState {

        const bulletHitbox = getFrameHitbox(left, top, frame, hitboxTopOffset, hitboxBottomOffset);
        const bullet: ParticleState = {
            acceletation,
            angle,
            frame,
            hitbox: bulletHitbox,
            speed,
            left,
            top
        };

        return bullet;
    }
}
