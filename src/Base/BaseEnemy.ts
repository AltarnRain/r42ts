/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import TickHandler from "../Handlers/TickHandler";
import ILocationProvider from "../Interfaces/ILocationProvider";
import Explosion from "../Models/Explosion";
import { GameLocation } from "../Models/GameLocation";
import { GameRectangle } from "../Models/GameRectangle";
import { GameSize } from "../Models/GameSize";
import dimensionProvider from "../Providers/DimensionProvider";
import { Angle, ExplosionProviderFunction, FireAngleProviderFunction, Frame, GameObjectType, OffsetFramesProviderFunction } from "../Types";
import { getFrameCenter, getFrameHitbox, getMaximumFrameDimensions } from "../Utility/Frame";
import { getOffsetLocation } from "../Utility/Location";
import BaseFrameProvider from "./BaseFrameProvider";
import renderFrame from "../Render/RenderFrame";

/**
 * Module:          BaseEnemy
 * Responsibility:  Base class for all enemies.
 *                  This class provides contacts and default methods that will work
 *                  for most enemies in the game leaving specifics to derived classes.
 */

const {
    pixelSize,
} = dimensionProvider();

const negativepixelSize = pixelSize * -1;

export abstract class BaseEnemy {

    /**
     * Static to ensure every enemy gets a new id.
     */
    private static idCounter = 0;

    /**
     * Id of the enemy. Used to check if a bullet belongs to an enemy.
     */
    private enemyId = 0;

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
     * Current frame of the object
    */
    protected currentFrame!: Frame;

    /**
     * Provides location. Can be used to alter the movement behaviour of enemies.
     */
    protected locationProvider: ILocationProvider;

    /**
     * Creates an instance of BaseEnemy.
     * @param {number} frameChangeTime. Time between frames.
     * @param {OffsetFramesProviderFunction} getOffsetFrames. Returns an OffsetFrames object.
     * @param {ExplosionProviderFunction} getExplosion. Returns an explosion object.
     * @param {ILocationProvider} locationProvider. Provides the location of the enemy.
     * @param {BaseFrameProvider} frameProvider. Provides the frame of the enemy.
     * @param {FireAngleProviderFunction} [fireAngleProvider]. Provides a fire hangle for the enemy.
     * @memberof BaseEnemy
     */
    constructor(
        frameChangeTime: number,
        getOffsetFrames: OffsetFramesProviderFunction,
        getExplosion: ExplosionProviderFunction,
        locationProvider: ILocationProvider,
        frameProvider: BaseFrameProvider,
        fireAngleProvider?: FireAngleProviderFunction) {


        this.locationProvider = locationProvider;

        this.explosion = getExplosion();
        this.frameTickHandler = new TickHandler(frameChangeTime, () => this.onFrameChange());

        const offSetFrames = getOffsetFrames();
        this.offSets = offSetFrames.offSets.map((o) => {
            return {
                left: o.left * pixelSize,
                top: o.top * pixelSize,
            };
        });

        this.maxDimensions = getMaximumFrameDimensions(offSetFrames.frames, pixelSize);
        this.angleProvider = fireAngleProvider;
        this.frameProvider = frameProvider;
        this.frameProvider.setFrames(offSetFrames.frames);

        const { left, top } = this.getOffsetLocation();
        this.offsetLeft = left;
        this.offsetTop = top;

        this.enemyId = BaseEnemy.idCounter;
        BaseEnemy.idCounter += 1;
    }

    /**
     * Returns the explosion asset.
     * @returns {Explosion}. An explosion asset.
     */
    public getExplosion(): Explosion {
        return this.explosion;
    }

    /**
     * getId
     * @returns {number}
     * @memberof BaseEnemy
     */
    public getId(): number {
        return this.enemyId;
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
        this.frameTickHandler.tick(tick);

        const offsetLocation = this.getOffsetLocation();
        this.offsetLeft = offsetLocation.left;
        this.offsetTop = offsetLocation.top;
    }

    /**
     * Calculates the offsetLocation
     * @returns {GameLocation}. Location offset to let the frames render over one another.
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

    public draw(): void {
        renderFrame(this.offsetLeft, this.offsetTop, this.currentFrame);
    }

    /**
     * Returns the hitpoint of the enemy.
     * @returns {number}
     * @memberof BaseEnemy
     */
    public getHitpoints(): number {
        return 0;
    }

    /**
     * Returns the center location of the object.
     * @returns {GameLocation}. Location located at the center of the object.
     */
    public getCenterLocation(): GameLocation {
        const { left, top } = this.locationProvider.getCurrentLocation();
        return getFrameCenter(left, top, this.currentFrame, pixelSize);
    }

    /**
     * Returns the object type.
     * @returns {GameObjectType}
     * @memberof BaseEnemy
     */
    public getObjectType(): GameObjectType {
        return "enemy";
    }

    /**
     * Returns the enemies hitbox.
     * @returns {GameRectangle}
     * @memberof BaseEnemy
     */
    public getHitbox(): GameRectangle {
        return getFrameHitbox(this.offsetLeft, this.offsetTop, this.currentFrame, negativepixelSize);
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