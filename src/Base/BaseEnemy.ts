/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          BaseEnemy
 * Responsibility:  Base class for all enemies.
 *                  This class provides contacts and default methods that will work
 *                  for most enemies in the game leaving specifics to derived classes.
 */

import TickHandler from "../Handlers/TickHandler";
import Explosion from "../Models/Explosion";
import { GameRectangle } from "../Models/GameRectangle";
import { GameSize } from "../Models/GameSize";
import { OffsetFrames } from "../Models/OffsetFrames";
import dimensionProvider from "../Providers/DimensionProvider";
import { AngleProviderFunction, ExplosionProviderFunction, GameObjectType, OffsetFramesProviderFunction } from "../Types/Types";
import { getFrameCenter, getFrameDimensions, getFrameHitbox, getMaximumFrameDimensions } from "../Utility/Frame";
import { getOffsetLocation } from "../Utility/Location";
import { BaseDestructableObject as BaseDestructable } from "./BaseDestructableObject";
import BaseFrameProvider from "./BaseFrameProvider";
import BaseLocationProvider from "./BaseLocationProvider";

const {
    averagePixelSize,
    maxPixelSize,
} = dimensionProvider();

const negativeMaxPixelSize = maxPixelSize * -1;

export abstract class BaseEnemy extends BaseDestructable {

    /**
     * The frame provider. Must be set in an inheriting class.
     */
    protected frameProvider: BaseFrameProvider;

    /**
     * Frame tick handler. Handles changes in the frames.
     */
    private frameTickHandler: TickHandler;

    /**
     * The real location the enemy has, without offsets.
     */
    protected actualLeft: number;

    protected actualTop: number;

    /**
     * Offets for each frame.
     */
    protected offSets: Array<{ left: number, top: number }>;

    /**
     * Explosion for the enemy.
     */
    protected explosion: Explosion;

    /**
     * Provides location. Can be used to alter the movement behaviour of enemies.
     */
    protected locationProvider: BaseLocationProvider;

    /**
     * Maximum enemy dimensions.
     */
    private maxDimensions: GameSize;

    /**
     * Helps the enemy determine which angle it will use to fire a bullet.
     */
    private angleProvider?: AngleProviderFunction;

    /**
     * Construct the enemy.
     * @param {GameLocation} startLocation. Start location of the enemy.
     * @param {number} frameChangeTime. Time in ms between frames.
     * @param {OffsetFrames} offsetFrames. Frames with offsets.
     * @param {Explosion} explosion. Explosion asset. Aka. BOOM animation.
     * @param {BaseLocationProvider} locationProvider. Handles the locations of the enemy. Can be used to inject movement behaviour.
     * @param {BulletRunner} bulletProvider. A class that checks if the enemy can fire a bullet. When undefined the enemy does not fire.
     */
    constructor(
        left: number,
        top: number,
        frameChangeTime: number,
        getOffsetFrames: OffsetFramesProviderFunction,
        explosion: ExplosionProviderFunction,
        locationProvider: BaseLocationProvider,
        frameProvider: BaseFrameProvider,
        angleProvider?: AngleProviderFunction) {
        super(left, top);

        this.locationProvider = locationProvider;

        this.explosion = explosion();
        this.actualLeft = left;
        this.actualTop = top;
        this.frameTickHandler = new TickHandler(frameChangeTime, () => this.onFrameChange());

        const offSetFrames = getOffsetFrames();
        this.offSets = offSetFrames.offSets.map((o) => {
            return {
                left: o.left * averagePixelSize,
                top: o.top * averagePixelSize,
            };
        });

        this.maxDimensions = getMaximumFrameDimensions(offSetFrames.frames, averagePixelSize);
        this.angleProvider = angleProvider;
        this.frameProvider = frameProvider;

        this.frameProvider.setFrames(offSetFrames.frames);
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
     * Base implementation of a state update.
     * @param {number} tick
     */
    public updateState(tick: number) {
        this.frameTickHandler.tick(tick);

        // Use the maximum widths of the enemies frames to prevent the enemy from getting stick on the sides.
        const actualLocation = this.locationProvider.getLocation(this.actualLeft, this.actualLeft, this.maxDimensions.width, this.maxDimensions.height);
        this.actualLeft = actualLocation.left;
        this.top = actualLocation.top;

        const offsetLocation = this.getOffsetLocation();
        this.left = offsetLocation.left;
        this.top = offsetLocation.top;
    }

    /**
     * Calculates the offsetLocation
     * @returns {GameLocation}. GameLocation offset to let the frames render over one another.
     */
    protected getOffsetLocation(): { left: number, top: number } {
        const frameOffsets = this.offSets[this.frameProvider.getCurrentIndex()];
        if (frameOffsets !== undefined) {
            return getOffsetLocation(this.actualLeft, this.actualTop, frameOffsets.left, frameOffsets.top);
        } else {
            return { left: this.actualLeft, top: this.actualTop };
        }
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
     * @returns {GameLocation}. GameLocation located at the center of the object.
     */
    public getCenterLocation(): { left: number, top: number } {
        return getFrameCenter(this.left, this.top, this.currentFrameClone, averagePixelSize);
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
        const dimensions = getFrameDimensions(this.currentFrameClone, averagePixelSize);
        return getFrameHitbox(this.left, this.top, dimensions.width, dimensions.height, negativeMaxPixelSize, 0);
    }

    public getFireAngle(): number | undefined {
        if (this.angleProvider === undefined) {
            return undefined;
        }

        const center = this.getCenterLocation();
        const angle = this.angleProvider(center.left, center.top);
        return angle;
    }
}