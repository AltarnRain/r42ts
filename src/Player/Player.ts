/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Player
 * Responsibility:  Player ship
 */

import { getPlayerLocation, movePlayer, setPlayerLocation } from "../Handlers/PlayerLocationHandler";
import Explosion from "../Models/Explosion";
import GameLocation from "../Models/GameLocation";
import { GameRectangle } from "../Models/GameRectangle";
import DimensionProvider from "../Providers/DimensionProvider";
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

export default class Player {

    private frame: Frame;

    /**
     * Construct the class.
     */
    constructor(location: GameLocation) {

        // Set the player location in the PlayerLocationHandler.
        setPlayerLocation(location);

        this.frame = cloneObject(PlayerFrame);

        convertFrameColor(cloneObject(PlayerFrame));
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
        movePlayer();
    }

    /**
     * Returns the player's hitbox
     * @return {GameRectangle}. Players hitbox.
     */
    public getHitbox(): GameRectangle {
        return getFrameHitbox(getPlayerLocation(), shipDimensions.width, shipDimensions.height, 0, averagePixelSize);
    }

    /**
     * Returns the top/left of the nozzle.
     */
    public getNozzleLocation(): GameLocation {
        return {
            left: getPlayerLocation().left + minPixelSize * 2,
            top: getPlayerLocation().top - minPixelSize * 1,
        };
    }
}
