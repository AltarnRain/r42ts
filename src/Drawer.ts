/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Animator
 * Responsibility:  Animate an animated object.
 */

import { DrawGameField } from "./Game";
import IDraw from "./Interfaces/IDraw";

export default class Drawer {

    /**
     * Array of current animations on screen.
     */
    private animations: IDraw[] = [];

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
     * Flag that tracks if a render is in progress.
     */
    private rendering: boolean;

    /**
     * Constructs the Animator
     * @param {IDraw} drawable object. 
     */
    constructor(private fps: number = 60) {
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

        // Only run if a render is not in progress
        if (!this.rendering) {

            // Runs all animation at the passed FPS
            if (tick - this.lastTick > (1000 / this.fps)) {

                DrawGameField();

                this.rendering = true;
                this.animations.forEach((a) => a.draw(tick));
                this.rendering = false;
                this.lastTick = tick;
            }

            this.handler = window.requestAnimationFrame(this.runner);
        }
    }

    public register(animation: IDraw): void {
        this.animations.push(animation);
    }
}