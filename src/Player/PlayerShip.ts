/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { movePlayerHandler } from "../Handlers/MovePlayerHandler";
import Explosion from "../Models/Explosion";
import { GameLocation } from "../Models/GameLocation";
import { GameRectangle } from "../Models/GameRectangle";
import dimensionProvider from "../Providers/DimensionProvider";
import renderFrame from "../Render/RenderFrame";
import { appState } from "../State/Store";
import { Frame, GameObjectType } from "../Types";
import { getFrameDimensions, getFrameHitbox } from "../Utility/Frame";
import Mutators from "../Utility/FrameMutators";
import { IHitbox } from "../Interfaces/IHitbox";
import getPlayerExplosion from "./PlayerExplosion";
import { getPlayerFrame } from "./PlayerFrames";

/**
 * Module:          Player
 * Responsibility:  Player ship
 */
const {
    minPixelSize,
    averagePixelSize,
} = dimensionProvider();

const shipDimensions = getFrameDimensions(getPlayerFrame(), averagePixelSize);

export default class PlayerShip implements IHitbox {

    /**
     * Reference to the player's ships frame.
     */
    private frame: Frame;

    /**
     * Player explosion.
     */
    private explosion: Explosion;

    /**
     * Construct the class.
     */
    constructor() {
        this.frame = getPlayerFrame();
        Mutators.Frame.convertHexToCGA(this.frame);

        this.explosion = getPlayerExplosion();
        Mutators.Frame.convertHexToCGA(this.explosion.explosionCenterFrame);

        this.explosion.particleFrames.forEach((p) => Mutators.Frame.convertHexToCGA(p));
    }

    /**
     * Returns the player explosion
     * @returns {Explosion}. Player explosion.
     */
    public getExplosion(): Explosion {
        return this.explosion;
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
        const { playerState } = appState();
        renderFrame(playerState.playerLeftLocation, playerState.playerTopLocation, this.frame);
    }

    /**
     * Updates the player's state. Means movement.
     */
    public updateState(): void {
        movePlayerHandler(10);
    }

    /**
     * Returns the player's hitbox
     * @return {GameRectangle}. Players hitbox.
     */
    public getHitbox(): GameRectangle {
        const { playerState } = appState();
        return getFrameHitbox(playerState.playerLeftLocation, playerState.playerTopLocation, shipDimensions.width, shipDimensions.height, 0, averagePixelSize);
    }

    /**
     * Returns the top/left of the nozzle.
     * @returns {Location}. Returns the location of the ship's nozzlel
     */
    public getNozzleLocation(): GameLocation {
        const { playerState } = appState();
        return {
            left: playerState.playerLeftLocation + minPixelSize * 2,
            top: playerState.playerTopLocation - minPixelSize * 1,
        };
    }
}
