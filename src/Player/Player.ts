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
import DimensionProvider from "../Providers/DimensionProvider";
import renderFrame from "../Render/RenderFrame";
import { Frame, GameObjectType } from "../Types/Types";
import { convertFrameColor, getFrameLocations } from "../Utility/Frame";
import { cloneObject, getAngle, getNewLocation } from "../Utility/Lib";
import PlayerExplosion from "./PlayerExplosion";
import { PlayerFrames } from "./PlayerFrames";

export default class Player extends BaseGameObject {
    /**
     * Frames used by the player ship
     */
    private frame: Frame;

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

        this.frame = cloneObject(PlayerFrames);

        convertFrameColor(this.frame);
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

        renderFrame(this.location, this.frame);
    }

    /**
     * Returns the locations occupied by the object.
     */
    public getLocations(): GameLocation[] {
        return getFrameLocations(this.frame, this.location);
    }

    /**
     * Points for the player
     */
    public getPoints(): number {
        return 0;
    }
}
