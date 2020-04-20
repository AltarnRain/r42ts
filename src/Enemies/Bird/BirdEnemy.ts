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
import BaseLocationProvider from "../../Base/BaseLocationProvider";
import CGAColors from "../../Constants/CGAColors";
import TickHandler from "../../Handlers/TickHandler";
import GameLocation from "../../Models/GameLocation";
import Particle from "../../Particles/Particle";
import FrameProvider from "../../Providers/FrameProvider";
import { Frame } from "../../Types/Types";
import { convertVariableFrameColor, getRandomFrameKeyIndex, setRandomFrameColors } from "../../Utility/Frame";
import { BirdFrames } from "./BirdFrames";

const colors = [CGAColors.lightMagenta, CGAColors.yellow, CGAColors.lightCyan, CGAColors.lightRed];

export default class BirdEnemy extends BaseEnemyObject {

    /**
     * Hanels color changes.
     */
    private colorTickHandler: TickHandler;

    /**
     * Creates the object.
     */
    constructor(location: GameLocation, frameChangetime: number, locationProvider: BaseLocationProvider) {
        super(location, frameChangetime, BirdFrames, Explosion01, locationProvider);

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

    /**
     * Called by a TickHandler when the bird should change color.
     */
    private onColorChange(): void {
        setRandomFrameColors(this.offSetFrames.frames, colors);
    }
}