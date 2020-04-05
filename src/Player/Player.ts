/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Player
 * Responsibility:  Player ship
 */

import BaseGameObject from "../Base/BaseGameObject";
import KeyboardState from "../Handlers/KeyboardStateHandler/KeyboardStateHandler";
import Explosion from "../Models/Explosion";
import GameLocation from "../Models/GameLocation";
import { Hitbox } from "../Models/Hitbox";
import DimensionProvider from "../Providers/DimensionProvider";
import renderFrame from "../Render/RenderFrame";
import { Frame, GameObjectType } from "../Types/Types";
import { convertFrameColor, getFrameHitbox } from "../Utility/Frame";
import { cloneObject, getAngle, getNewLocation } from "../Utility/Lib";
import PlayerExplosion from "./PlayerExplosion";
import { PlayerFrame } from "./PlayerFrames";

export default class Player extends BaseGameObject {
    /**
     * Frame used by the player ship
     */
    private frame: Frame;

    /**
     * Construct the class.
     */
    constructor(location?: GameLocation) {
        super(location);

        if (!location) {
            this.location = {
                left: DimensionProvider().fullWidth / 2,
                top: DimensionProvider().fullHeight * 0.9,
            };
        }

        this.frame = cloneObject(PlayerFrame);

        convertFrameColor(this.frame);
    }

    /**
     * Returns the player explosion
     * @returns {Explosion}. Player explosion.
     */
    public getExplosion(): Explosion {
        return PlayerExplosion;
    }

    /**
     * Returns the object type.
     * @returns {GameObjectType}. Player object type.
     */
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
            this.location = getNewLocation(angle, 15, this.location);
        }

        renderFrame(this.location, this.frame);
    }

    /**
     * Returns the player's hitbox
     * @return {Hitbox}. Players hitbox.
     */
    public getHitbox(): Hitbox {
        return getFrameHitbox(this.location, this.frame, DimensionProvider().maxPixelSize);
    }
}
