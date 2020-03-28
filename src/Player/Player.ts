/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Player
 * Responsibility:  Player ship
 */

import { PlayerFrames } from "../Frames/PlayerFrames";
import TickHandler from "../Handlers/TickHandler";
import IAnimate from "../Interfaces/IAnimate";
import GameLocation from "../Models/GameLocation";
import DimensionProvider from "../Providers/DimensionProvider";
import KeyboardState from "../Providers/KeyboardStateProvider/KeyboardStateProvider";
import RenderFrame from "../Render/RenderFrame";
import Frames from "../Types/Frames";
import { cloneFrames, getAngle, getNewLocation, setFrameColors } from "../Utility/Lib";

export default class Player implements IAnimate {

    /**
     * Handles player movement.
     */
    private moveTickHandler: TickHandler;

    /**
     * Current player location.
     */
    private location: GameLocation;

    /**
     * Frames used by the player ship
     */
    private frames: Frames;

    /**
     * Construct the class.
     */
    constructor() {

        this.onMove = this.onMove.bind(this);
        this.moveTickHandler = new TickHandler(60, this.onMove);

        this.location = {
            left: DimensionProvider().fullWidth / 2,
            top: DimensionProvider().fullHeight * 0.9,
        };

        this.frames = cloneFrames(PlayerFrames);

        setFrameColors(this.frames);
    }

    /**
     * Called when a tick occurs.
     * @param {number} tick. Tick count.
     */
    public animate(tick: number): void {
        this.moveTickHandler.tick(tick);
        RenderFrame(this.location, this.frames.F0);
    }

    /**
     * Called by a TickHandler for each movement tick
     */
    private onMove(): void {

        const { left, top } = this.location;

        const angle = getAngle(KeyboardState);

        if (angle !== -1) {
            this.location = getNewLocation(angle, 20, left, top);
        }
    }
}
