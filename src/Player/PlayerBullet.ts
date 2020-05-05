/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import CGAColors from "../Constants/CGAColors";
import ILocationProvider from "../Interfaces/ILocationProvider";
import Particle from "../Particles/Particle";
import { setPlayerBulletHitbox } from "../State/Player/Actions";
import { dispatch } from "../State/Store";
import { FrameProviderFunction, GameObjectType } from "../Types";
import Mutators from "../Utility/FrameMutators";

/**
 * Module:          Player bullet
 * Responsibility:  Define the player bullet.
 */

export default class PlayerBullet extends Particle {

    /**
     * Construct the object.
     * @param {number} left. Left coordinate.
     * @param {number} top. Top coordinate.
     * @param {FrameProviderFunction} getFrame. function that returns a frame..
     * @param {number} angle. Bullet angle.
     * @param {number} speed. Speed of the bullet.
     * @param {number} acceleration. Acceleration of the bullet.
     */
    constructor(locationProvider: ILocationProvider, getFrame: FrameProviderFunction) {
        super(locationProvider, getFrame);

        Mutators.Frame.setColor(this.currentFrame, CGAColors.yellow);
    }

    public getObjectType(): GameObjectType {
        return "playerbullet";
    }

    public updateState(): void {
        super.updateState();

        const hb = this.getHitbox();
        dispatch(setPlayerBulletHitbox(hb));
    }
}