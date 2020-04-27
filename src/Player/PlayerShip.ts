/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Player
 * Responsibility:  Player ship
 */

import { movePlayer } from "../Handlers/MovePlayer";
import Explosion from "../Models/Explosion";
import { GameRectangle } from "../Models/GameRectangle";
import dimensionProvider from "../Providers/DimensionProvider";
import renderFrame from "../Render/RenderFrame";
import { appState } from "../State/Store";
import { Frame, GameObjectType } from "../Types/Types";
import { getFrameDimensions, getFrameHitbox } from "../Utility/Frame";
import FrameMutators from "../Utility/FrameMutators";
import getPlayerExplosion from "./PlayerExplosion";
import { getPlayerFrame } from "./PlayerFrames";

const {
    minPixelSize,
    averagePixelSize,
} = dimensionProvider();

const shipDimensions = getFrameDimensions(getPlayerFrame(), averagePixelSize);

export default class PlayerShip {

    /**
     * Reference to the player's ships frame.
     */
    private frameClone: Frame;

    /**
     * Player explosion.
     */
    private explosionClone: Explosion;

    /**
     * Construct the class.
     */
    constructor() {
        this.frameClone = getPlayerFrame();
        FrameMutators.convertFrameColor(this.frameClone);

        this.explosionClone = getPlayerExplosion();
        FrameMutators.convertFrameColor(this.explosionClone.explosionCenterFrame);

        this.explosionClone.particleFrames.forEach((p) => FrameMutators.convertFrameColor(p));
    }

    /**
     * Returns the player explosion
     * @returns {Explosion}. Player explosion.
     */
    public getExplosion(): Explosion {
        return this.explosionClone;
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
        renderFrame(playerState.playerLeftLocation, playerState.playerTopLocation, this.frameClone);
    }

    /**
     * Updates the player's state. Means movement.
     */
    public updateState(): void {
        movePlayer(10);
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
    public getNozzleLocation(): { left: number, top: number } {
        const { playerState } = appState();
        return {
            left: playerState.playerLeftLocation + minPixelSize * 2,
            top: playerState.playerTopLocation - minPixelSize * 1,
        };
    }
}
