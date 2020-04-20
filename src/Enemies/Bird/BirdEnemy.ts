/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Bird enemy
 * Responsibility:  Defines the behaviour of the bird enemy.
 */

import Explosion01 from "../../Assets/Explosion01";
import { BaseEnemyObject } from "../../Base/BaseEnemyObject";
import CGAColors from "../../Constants/CGAColors";
import TickHandler from "../../Handlers/TickHandler";
import GameLocation from "../../Models/GameLocation";
import Particle from "../../Particles/Particle";
import DimensionProvider from "../../Providers/DimensionProvider";
import FrameProvider from "../../Providers/FrameProvider";
import { Frame } from "../../Types/Types";
import { getRandomArrayElement } from "../../Utility/Array";
import { getRandomFrameKeyIndex, setRandomFrameColors, convertVariableFrameColor } from "../../Utility/Frame";
import { BirdFrames } from "./BirdFrames";

const colors = [CGAColors.lightMagenta, CGAColors.yellow, CGAColors.lightCyan, CGAColors.lightRed];

const {
    averagePixelSize,
    fullHeight,
    gameFieldTop,
    fullWidth,
} = DimensionProvider();

export default class BirdEnemy extends BaseEnemyObject {

    /**
     * Hanels color changes.
     */
    private colorTickHandler: TickHandler;

    /**
     * Angle
     */
    private angle: number = 0;

    /**
     * Creates the object.
     */
    constructor(location: GameLocation, speed: number, frameChangetime: number) {
        super(location, speed, frameChangetime, BirdFrames, Explosion01);
        this.angle = getRandomArrayElement([2, 358, 178, 182]);

        this.onColorChange = this.onColorChange.bind(this);

        this.colorTickHandler = new TickHandler(40, this.onColorChange);

        this.frameProvider = new FrameProvider(this.offSetFrames.frames, getRandomFrameKeyIndex(this.offSetFrames.frames));
        this.currentFrame = this.frameProvider.getFrame();

        convertVariableFrameColor(this.explosion.explosionCenterFrame, CGAColors.white);
        convertVariableFrameColor(this.explosion.particleFrames[0], CGAColors.white);
        convertVariableFrameColor(this.explosion.particleFrames[1], CGAColors.white);

        this.location = this.getOffsetLocation();
    }

    /**
     * Updates the objects state.
     */
    public updateState(tick: number): void {
        super.updateState(tick);

        this.colorTickHandler.tick(tick);

        const { width, height} = this.getCurrentFrameDimensions();

        const leftLimit = averagePixelSize * 2;
        const rightLimit = fullWidth - width - averagePixelSize * 2;

        if (this.location.left <= leftLimit || this.location.left >= rightLimit) {
            this.angle = 180 - this.angle;
        }

        if (this.location.top <= gameFieldTop || this.location.top >= fullHeight - height) {
            this.angle *= -1;
        }
    }

    public getBulletFrame(): Frame {
        return {} as Frame;
    }

    /**
     * Returns the points for the bird.
     */
    public getPoints(): number {
        return 200;
    }

    /**
     * Returns a bullet particle.
     */
    protected getBulletParticle(): Particle {
        // TODO: Bird will fire diagolan bullets on hard mode.
        return {} as Particle;
    }

    protected shouldFire(): boolean {
        return false;
    }

    protected getAngle(): number {
        return this.angle;
    }

    /**
     * Called by a TickHandler when the bird should change color.
     */
    private onColorChange(): void {
        setRandomFrameColors(this.offSetFrames.frames, colors);
    }
}