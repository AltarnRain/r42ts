/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Player
 * Responsibility:  Player ship
 */

import Explosion from "../Models/Explosion";
import GameLocation from "../Models/GameLocation";
import { GameRectangle } from "../Models/GameRectangle";
import { PlayerLocationHandler } from "../Modules";
import DimensionProvider from "../Providers/DimensionProvider";
import renderFrame from "../Render/RenderFrame";
import { Frame, GameObjectType } from "../Types/Types";
import { convertFrameColor, getFrameDimensions, getFrameHitbox } from "../Utility/Frame";
import { cloneObject } from "../Utility/Lib";
import PlayerExplosion from "./PlayerExplosion";
import { PlayerFrame } from "./PlayerFrames";

const {
    minPixelSize,
    averagePixelSize,

} = DimensionProvider();

const shipDimensions = getFrameDimensions(PlayerFrame, averagePixelSize);

export default class PlayerShip {

    /**
     * Reference to the player's ships frame.
     */
    private frame: Frame;

    /**
     * Construct the class.
     */
    constructor(location: GameLocation) {

        // Set the player location in the PlayerLocationHandler.
        PlayerLocationHandler.setPlayerLocation(location);

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
     * Draw the player's ship.
     */
    public draw(): void {
        renderFrame(PlayerLocationHandler.getPlayerLocation(), this.frame);
    }

    /**
     * Updates the player's state. Means movement.
     */
    public updateState(): void {
        // Use the PlayerLocationHandler to move the player.
        PlayerLocationHandler.movePlayer(10);
    }

    /**
     * Returns the player location.
     */
    public getLocation(): GameLocation {
        return PlayerLocationHandler.getPlayerLocation();
    }

    /**
     * Returns the player's hitbox
     * @return {GameRectangle}. Players hitbox.
     */
    public getHitbox(): GameRectangle {
        return getFrameHitbox(PlayerLocationHandler.getPlayerLocation(), shipDimensions.width, shipDimensions.height, 0, averagePixelSize);
    }

    /**
     * Returns the top/left of the nozzle.
     */
    public getNozzleLocation(): GameLocation {
        return {
            left: PlayerLocationHandler.getPlayerLocation().left + minPixelSize * 2,
            top: PlayerLocationHandler.getPlayerLocation().top - minPixelSize * 1,
        };
    }
}
