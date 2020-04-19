/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Base class for enemies.
 * Responsibility:  Base class for enemies.
 */

import TickHandler from "../Handlers/TickHandler";
import Explosion from "../Models/Explosion";
import GameLocation from "../Models/GameLocation";
import { GameSize } from "../Models/Gamesize";
import { OffsetFrames } from "../Models/OffsetFrames";
import DimensionProvider from "../Providers/DimensionProvider";
import FrameProvider from "../Providers/FrameProvider";
import { GameObjectType } from "../Types/Types";
import { getFrameCenter, getFrameDimensions } from "../Utility/Frame";
import { cloneObject } from "../Utility/Lib";
import { getLocation, getOffsetLocation } from "../Utility/Location";
import { BaseDestructableObject } from "./BaseDestructableObject";

const {
    averagePixelSize,
    maxPixelSize
} = DimensionProvider();

export abstract class BaseEnemyObject extends BaseDestructableObject {

    /**
     * Enemy speed.
     */
    protected currentSpeed: number;

    /**
     * The original speed of the object.
     */
    protected baseSpeed: number;

    /**
     * The frame provider. Must be set in an inheriting class.
     */
    protected frameProvider!: FrameProvider;

    /**
     * Frame tick handler.
     */
    private frameTickHandler: TickHandler;

    /**
     * The real location the enemy has, without offsets
     */
    protected actualLocation: GameLocation;

    /**
     * Offets for each frame.
     */
    private offSets: GameLocation[];

    /**
     * Explosion for the enemy.
     */
    protected explosion: Explosion;

    /**
     * Frames with offsets.
     */
    protected offSetFrames: OffsetFrames;

    /**
     * Construct the object.
     * @param {number} speed. Speed of the enemy.
     */
    constructor(location: GameLocation, speed: number, frameChangeTime: number, offsetFrames: OffsetFrames, explosion: Explosion) {
        super(location);
        this.currentSpeed = speed;
        this.baseSpeed = speed;

        this.offSetFrames = cloneObject(offsetFrames);
        this.explosion = cloneObject(explosion);

        this.actualLocation = { ...this.location };

        this.onFrameChange = this.onFrameChange.bind(this);

        this.frameTickHandler = new TickHandler(frameChangeTime, this.onFrameChange);

        this.offSets = offsetFrames.offSets.map((o) => {
            return {
                left: o.left * averagePixelSize,
                top: o.top * averagePixelSize,
            };
        });

        this.explosion = explosion;
    }

    /**
     * Returns the explosion asset.
     * @returns {Explosion}. An explosion asset.
     */
    public getExplosion(): Explosion {
        return this.explosion;
    }

    /**
     * Returns the with and height of the current frame.
     * @returns {GameSize}.
     */
    protected getCurrentFrameDimensions(): GameSize {
        return getFrameDimensions(this.currentFrame, maxPixelSize);
    }

    /**
     * Returns the point worth.
     * @returns {number}. Point worth of the enemy.
     */
    public abstract getPoints(): number;

    /**
     * Return the angle an enemy.
     */
    protected abstract getAngle(): number;

    /**
     * Called by a TickHandler when the next frame is up.
     */
    private onFrameChange(): void {
        this.currentFrame = this.frameProvider.getNextFrame();
    }

    /**
     * Base implementation of a state update.
     * @param {number} tick
     */
    public updateState(tick: number) {
        this.frameTickHandler.tick(tick);
        this.actualLocation = getLocation(this.actualLocation, this.getAngle(), this.currentSpeed);
        this.location = this.getOffsetLocation();
    }

    /**
     * Calculates the offsetLocation
     * @returns {GameLocation}. GameLocation offset to let the frames render over one another.
     */
    protected getOffsetLocation(): GameLocation {
        const frameOffsets = this.offSets[this.frameProvider.getCurrentIndex()];
        if (frameOffsets !== undefined) {
            return getOffsetLocation(this.actualLocation, frameOffsets.left, frameOffsets.top);
        } else {
            return this.actualLocation;
        }
    }

    /**
     * Set the speed of the enemy.
     * @param {Number} value.
     */
    public setSpeed(value: number): void {
        this.currentSpeed = value;
    }

    /**
     * increases the speed of an enemy. Uses the base speed to calculate a new speed.
     * @param {number} value. Values below 1 decrease speed, values above 1 increase speed.
     */
    public increaseSpeed(value: number): void {
        this.currentSpeed = this.baseSpeed * value;
    }

    /**
     * Returns the enemies hitpoints. Returns 0 by default. Only meteorites have hitpoints.
     */
    public getHitpoints(): number {
        return 0;
    }

    /**
     * Returns the center location of the object.
     * @returns {GameLocation}. GameLocation located at the center of the object.
     */
    public getCenterLocation(): GameLocation {
        return getFrameCenter(this.location, this.currentFrame, averagePixelSize);
    }
    /**
     * Always an enemy
     */
    public getObjectType(): GameObjectType {
        return "enemy";
    }
}