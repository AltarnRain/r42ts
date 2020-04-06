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
import { GameRectangle } from "../Models/GameRectangle";
import DimensionProvider from "../Providers/DimensionProvider";
import renderFrame from "../Render/RenderFrame";
import { Frame, GameObjectType } from "../Types/Types";
import { convertFrameColor, getFrameHitbox } from "../Utility/Frame";
import { cloneObject, getAngle } from "../Utility/Lib";
import { getNewLocation } from "../Utility/Location";
import PlayerExplosion from "./PlayerExplosion";
import { PlayerFrame } from "./PlayerFrames";

const {
    minPixelSize,
    fullWidth,
    fullHeight,
    averagePixelSize
} = DimensionProvider();

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
                left: fullWidth / 2,
                top: fullHeight * 0.9,
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
        const angle = getAngle(KeyboardState);

        if (angle !== -1) {
            this.location = getNewLocation(this.location, angle, 15);
        }

        renderFrame(this.location, this.frame);
    }

    /**
     * Returns the player's hitbox
     * @return {GameRectangle}. Players hitbox.
     */
    public getHitbox(): GameRectangle {
        return getFrameHitbox(this.location, this.frame, averagePixelSize,  0, averagePixelSize );
    }

    /**
     * Returns the top/left of the nozzle.
     */
    public getNozzleLocation(): GameLocation {
        return {
            left: this.location.left + minPixelSize * 2,
            top: this.location.top - minPixelSize * 1,
        };
    }
}
