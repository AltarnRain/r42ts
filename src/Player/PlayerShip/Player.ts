/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Player
 * Responsibility:  Player ship
 */

import BaseGameObject from "../../Base/BaseGameObject";
import KeyboardState from "../../Handlers/KeyboardStateHandler/KeyboardStateHandler";
import Explosion from "../../Models/Explosion";
import GameLocation from "../../Models/GameLocation";
import { GameRectangle } from "../../Models/GameRectangle";
import { GameSize } from "../../Models/Gamesize";
import DimensionProvider from "../../Providers/DimensionProvider";
import renderFrame from "../../Render/RenderFrame";
import { Frame, GameObjectType } from "../../Types/Types";
import { convertFrameColor, getFrameDimensions, getFrameHitbox } from "../../Utility/Frame";
import { getAngle } from "../../Utility/Geometry";
import { cloneObject } from "../../Utility/Lib";
import { getNewLocation } from "../../Utility/Location";
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
     * Frame dimensions.
     */
    private dimensions: GameSize;

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

        this.currentFrame = cloneObject(PlayerFrame);

        this.dimensions = getFrameDimensions(PlayerFrame, averagePixelSize);

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
            this.location = getNewLocation(this.location, angle, 15);
        }
    }

    /**
     * Returns the player's hitbox
     * @return {GameRectangle}. Players hitbox.
     */
    public getHitbox(): GameRectangle {
        return getFrameHitbox(this.location, this.dimensions.width, this.dimensions.height, 0,  averagePixelSize );
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
