/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import TickHandler from "../Handlers/TickHandler";
import Explosion from "../Models/Explosion";
import { GameLocation } from "../Models/GameLocation";
import { GameRectangle } from "../Models/GameRectangle";
import { GameSize } from "../Models/GameSize";
import dimensionProvider from "../Providers/DimensionProvider";
import { Angle, ExplosionProviderFunction, FireAngleProviderFunction, GameObjectType, OffsetFramesProviderFunction } from "../Types";
import { getFrameCenter, getFrameDimensions, getFrameHitbox, getMaximumFrameDimensions } from "../Utility/Frame";
import { getOffsetLocation } from "../Utility/Location";
import BaseFrameProvider from "./BaseFrameProvider";
import BaseGameObject from "./BaseGameObject";
import ILocationProvider from "../Interfaces/ILocationProvider";

/**
 * Module:          BaseEnemy
 * Responsibility:  Base class for all enemies.
 *                  This class provides contacts and default methods that will work
 *                  for most enemies in the game leaving specifics to derived classes.
 */

const {
    averagePixelSize,
    maxPixelSize,
} = dimensionProvider();

const negativeMaxPixelSize = maxPixelSize * -1;

export abstract class BaseEnemy extends BaseGameObject {

    /**
     * The frame provider. Must be set in an inheriting class.
     */
    protected frameProvider: BaseFrameProvider;

    /**
     * Frame tick handler. Handles changes in the frames.
     */
    private frameTickHandler: TickHandler;

    /**
     * Offets for each frame.
     */
    protected offSets: GameLocation[];

    /**
     * Explosion for the enemy.
     */
    protected explosion: Explosion;

    /**
     * Maximum enemy dimensions.
     */
    protected maxDimensions: GameSize;

    /**
     * Helps the enemy determine which angle it will use to fire a bullet.
     */
    private angleProvider?: FireAngleProviderFunction;

    /**
     * Left position offset for animation.
     */
    private offsetLeft: number;

    /**
     * Top position offset for animation.
     */
    private offsetTop: number;

    /**
     * Construct the enemy.
     */
    constructor(
        frameChangeTime: number,
        getOffsetFrames: OffsetFramesProviderFunction,
        getExplosion: ExplosionProviderFunction,
        locationProvider: ILocationProvider,
        frameProvider: BaseFrameProvider,
        fireAngleProvider?: FireAngleProviderFunction) {
        super(locationProvider);

        this.locationProvider = locationProvider;

        this.explosion = getExplosion();
        this.frameTickHandler = new TickHandler(frameChangeTime, () => this.onFrameChange());

        const offSetFrames = getOffsetFrames();
        this.offSets = offSetFrames.offSets.map((o) => {
            return {
                left: o.left * averagePixelSize,
                top: o.top * averagePixelSize,
            };
        });

        this.maxDimensions = getMaximumFrameDimensions(offSetFrames.frames, averagePixelSize);
        this.angleProvider = fireAngleProvider;
        this.frameProvider = frameProvider;
        this.frameProvider.setFrames(offSetFrames.frames);

        const { left, top } = this.getOffsetLocation();
        this.offsetLeft = left;
        this.offsetTop = top;
    }

    /**
     * Returns the explosion asset.
     * @returns {Explosion}. An explosion asset.
     */
    public getExplosion(): Explosion {
        return this.explosion;
    }

    /**
     * Returns the point worth.
     * @returns {number}. Point worth of the enemy.
     */
    public abstract getPoints(): number;

    /**
     * Called by a TickHandler when the next frame is up.
     */
    protected abstract onFrameChange(): void;

    /**
     * Returns the enemies offsets locations.
     */
    public getLocation(): GameLocation {
        // Overrides BaseEnemy
        return {
            left: this.offsetLeft,
            top: this.offsetTop
        };
    }

    /**
     * Base implementation of a state update.
     * @param {number} tick
     */
    public updateState(tick: number) {
        super.updateState(tick);

        this.frameTickHandler.tick(tick);

        const offsetLocation = this.getOffsetLocation();
        this.offsetLeft = offsetLocation.left;
        this.offsetTop = offsetLocation.top;
    }

    /**
     * Calculates the offsetLocation
     * @returns {Location}. Location offset to let the frames render over one another.
     */
    protected getOffsetLocation(): GameLocation {
        const frameOffsets = this.offSets[this.frameProvider.getCurrentIndex()];
        const { left, top } = this.locationProvider.getCurrentLocation();
        return getOffsetLocation(left, top, frameOffsets.left, frameOffsets.top);
    }

    /**
     * Increases the speed of an enemy.
     * @param {number} value. Values below 1 decrease speed, values above 1 increase speed.
     */
    public increaseSpeed(value: number): void {
        this.locationProvider.increaseSpeed(value);
        this.frameTickHandler.increaseSpeed(value);
    }

    /**
     * Returns the enemies hitpoints. Returns 0 by default. Only meteorites have hitpoints.
     */
    public getHitpoints(): number {
        return 0;
    }

    /**
     * Returns the center location of the object.
     * @returns {Location}. Location located at the center of the object.
     */
    public getCenterLocation(): GameLocation {
        const { left, top } = this.locationProvider.getCurrentLocation();
        return getFrameCenter(left, top, this.currentFrame, averagePixelSize);
    }

    /**
     * Always an enemy
     */
    public getObjectType(): GameObjectType {
        return "enemy";
    }

    /**
     * Returns the current frame's hitbox.
     * @returns {GameRectangle}. Bird's hitbox.
     */
    public getHitbox(): GameRectangle {
        const dimensions = getFrameDimensions(this.frameProvider.getCurrentFrame(), averagePixelSize);
        return getFrameHitbox(this.offsetLeft, this.offsetTop, dimensions.width, dimensions.height, negativeMaxPixelSize, 0);
    }

    /**
     * Returns the fire angle of the orb enemy.
     * @returns {Angle}. An angle.
     */
    public getFireAngle(): Angle {
        if (this.angleProvider === undefined) {
            return undefined;
        }

        const center = this.getCenterLocation();
        const angle = this.angleProvider(this, center.left, center.top);
        return angle;
    }
}