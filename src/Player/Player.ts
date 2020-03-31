/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Player
 * Responsibility:  Player ship
 */

import PlayerExplosion from "../Assets/Explosions/PlayerExplosion";
import BaseGameObject from "../Base/BaseGameObject";
import { PlayerFrames } from "../Frames/PlayerFrames";
import KeyboardState from "../Handlers/KeyboardStateHandler/KeyboardStateHandler";
import { Explosion } from "../Models/Explosion";
import GameLocation from "../Models/GameLocation";
import DimensionProvider from "../Providers/DimensionProvider";
import renderFrame from "../Render/RenderFrame";
import Frames from "../Types/Frames";
import GameObjectType from "../Types/GameObject";
import { cloneObject, getAngle, getNewLocation, setFramesColors } from "../Utility/Lib";

export default class Player extends BaseGameObject {
    /**
     * Frames used by the player ship
     */
    private frames: Frames;

    /**
     * Construct the class.
     */
    constructor(location?: GameLocation) {
        super();

        if (location) {
            this.location = { ...location };
        } else {
            this.location = {
                left: DimensionProvider().fullWidth / 2,
                top: DimensionProvider().fullHeight * 0.9,
            };
        }

        this.frames = cloneObject(PlayerFrames);

        setFramesColors(this.frames);
    }

    public getExplosion(): Explosion {
        return PlayerExplosion;
    }
    public getObjectType(): GameObjectType {
        return "player";
    }

    /**
     * Called when a tick occurs.
     * @param {number} tick. Tick count.
     */
    public draw(_: number): void {
        const { left, top } = this.location;

        const angle = getAngle(KeyboardState);

        if (angle !== -1) {
            this.location = getNewLocation(angle, 15, left, top);
        }

        renderFrame(this.location, this.frames.F0);
    }
}
