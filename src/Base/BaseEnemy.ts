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
import GameLocation from "../Models/GameLocation";
import { GameRectangle } from "../Models/GameRectangle";
import { GameSize } from "../Models/GameSize";
import { OffsetFrames } from "../Models/OffsetFrames";
import Particle from "../Particles/Particle";
import dimensionProvider from "../Providers/DimensionProvider";
import FrameProvider from "../Providers/FrameProvider";
import { appState } from "../State/Store";
import { GameObjectType } from "../Types/Types";
import { getFrameCenter, getFrameDimensions, getFrameHitbox } from "../Utility/Frame";
import { cloneObject } from "../Utility/Lib";
import { getOffsetLocation } from "../Utility/Location";
import { BaseDestructableObject as BaseDestructable } from "./BaseDestructableObject";
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
    protected frameProvider!: FrameProvider;

    /**
     * Frame tick handler. Handles changes in the frames.
     */
    private frameTickHandler: TickHandler;

    /**
     * The real location the enemy has, without offsets.
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
     * When true this enemy will fire bullets. Passed in from the constructor.
     */
    private canFire?: (sef: BaseEnemy) => boolean;

    /**
     * Provides location. Can be used to alter the movement behaviour of enemies.
     */
    private locationProvider: BaseLocationProvider;

    /**
     * Construct the enemy.
     * @param {GameLocation} startLocation. Start location of the enemy.
     * @param {number} frameChangeTime. Time in ms between frames.
     * @param {OffsetFrames} offsetFrames. Frames with offsets.
     * @param {Explosion} explosion. Explosion asset. Aka. BOOM animation.
     * @param {BaseLocationProvider} locationProvider. Handles the locations of the enemy. Can be used to inject movement behaviour.
     * @param {function} canFire. A function that checks if the enemy can fire a bullet. Injected from the outside.
     */
    constructor(
        startLocation: GameLocation,
        frameChangeTime: number,
        offsetFrames: OffsetFrames,
        explosion: Explosion,
        locationProvider: BaseLocationProvider,
        canFire?: (self: BaseEnemy) => boolean) {
        super(startLocation);

        this.locationProvider = locationProvider;

        this.offSetFrames = cloneObject(offsetFrames);
        this.explosion = cloneObject(explosion);

        this.actualLocation = { ...this.location };

        this.frameTickHandler = new TickHandler(frameChangeTime, () => this.onFrameChange());

        this.offSets = offsetFrames.offSets.map((o) => {
            return {
                left: o.left * averagePixelSize,
                top: o.top * averagePixelSize,
            };
        });

        // Bind canFire to the current instance.
        this.canFire = canFire;
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
     * Returns the bullet frame.
     */
    protected abstract getBulletParticle(tick: number): Particle | undefined;

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
        const { width, height } = getFrameDimensions(this.currentFrame, averagePixelSize);
        this.actualLocation = this.locationProvider.getLocation(this.actualLocation, width, height);
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
    public getCenterLocation(): GameLocation {
        return getFrameCenter(this.location, this.currentFrame, averagePixelSize);
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
        const dimensions = getFrameDimensions(this.currentFrame, averagePixelSize);
        return getFrameHitbox(this.location, dimensions.width, dimensions.height, negativeMaxPixelSize, 0);
    }

    /**
     * Returns a particle if the enemy fired a bullet.
     * @returns {Particle | undefined}. When the enemy fired a bullet a particle object is return, otherwise undefined.
     */
    public getBullet(tick: number): Particle | undefined {
        const { playerState } = appState();

        // Enemies never fire bullets when the player is dead.
        if (playerState.ship === undefined) {
            return undefined;
        }

        if (this.canFire === undefined) {
            return undefined;
        } else {
            // This may seem like a weird function call but keep in mind canFire is passed into the
            // object from the outside and typed to accept a base enemy object. I
            // do NOT want 'this' magic within canFire so I opted to use a parameter.
            if (this.canFire(this)) {
                return this.getBulletParticle(tick);
            } else {
                return undefined;
            }
        }
    }
}