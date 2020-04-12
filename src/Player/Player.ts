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
import { GameObjectType } from "../Types/Types";
import { convertFrameColor, getFrameDimensions, getFrameHitbox } from "../Utility/Frame";
import { getAngle } from "../Utility/Geometry";
import { cloneObject } from "../Utility/Lib";
import { fallsWithin, getNewLocation } from "../Utility/Location";
import PlayerExplosion from "./PlayerExplosion";
import { PlayerFrame } from "./PlayerFrames";

const {
    minPixelSize,
    fullWidth,
    fullHeight,
    averagePixelSize,
    gameFieldTop,

} = DimensionProvider();

const shipDimensions = getFrameDimensions(PlayerFrame, averagePixelSize);
const maxBottom = fullHeight - shipDimensions.height;
const maxRight = fullWidth - shipDimensions.width;

export default class Player extends BaseGameObject {
    /**
     * Construct the class.
     */
    constructor(location: GameLocation) {
        super(location);

        this.currentFrame = cloneObject(PlayerFrame);

        convertFrameColor(this.currentFrame);
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

    public updateState(): void {
        const angle = getAngle(KeyboardState);

        if (angle !== -1) {
            const newLocation = getNewLocation(this.location, angle, 15);
            if (fallsWithin(newLocation, gameFieldTop, maxBottom, 0, maxRight)) {
                this.location = newLocation;
            }
        }
    }

    /**
     * Returns the player's hitbox
     * @return {GameRectangle}. Players hitbox.
     */
    public getHitbox(): GameRectangle {
        return getFrameHitbox(this.location, shipDimensions.width, shipDimensions.height, 0, averagePixelSize);
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
