/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Animator
 * Responsibility:  Animate an animated object.
 */

import IAnimate from "./Interfaces/IAnimate";

export default class Animator {

    /**
     * Animation frame handler.
     */
    private handler: number = 0;

    /**
     * Keeps track of the last tick when the animation was fired.
     * Used to determine when to call the next frame.
     */
    private lastTick: number = 0;

    /**
     * Constructs the Animator
     * @param {IAnimate} animatedObject. Any object that implements the IAnimate interface.
     */
    constructor(private animatedObject: IAnimate, private fps: number = 60) {
        this.runner = this.runner.bind(this);
    }

    /**
     * Start the animation.
     */
    public start(): void {
        this.handler = window.requestAnimationFrame(this.runner);
    }

    /**
     * Stop the animation.
     */
    public stop(): void {
        window.cancelAnimationFrame(this.handler);
    }

    /**
     * Runs the animation.
     * @param {number} tick. The current tick.
     */
    private runner(tick: number): void {

        // Rusn the animation at the passed FPS
        if (tick - this.lastTick > this.fps) {
            this.animatedObject.animate(tick);
            this.lastTick = tick;
        }

        this.handler = window.requestAnimationFrame(this.runner);
    }
}