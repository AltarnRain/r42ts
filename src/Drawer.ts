/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Drawer
 * Responsibility:  Draw an object.
 */

import { DrawGameField } from "./GameScreen/StaticRenders";
import IDraw from "./Interfaces/IDraw";

/**
 * Draws IDrawable classes.
 */
export default class Drawer {

    /**
     * Array of current game objects on screen.
     */
    private gameobjects: IDraw[] = [];

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
                this.gameobjects.forEach((a) => a.draw(tick));
                this.rendering = false;
                this.lastTick = tick;
            }

            this.handler = window.requestAnimationFrame(this.runner);
        }
    }

    /**
     * Register an IDrawable class.
     * @param drawable.
     * @returns {() => void}. Function to remove the object from the array of drawable objects.
     */
    public register(drawable: IDraw): () => void {
        this.gameobjects.push(drawable);

        return () => {
            const objectIndex = this.gameobjects.indexOf(drawable);
            this.gameobjects.splice(objectIndex, 1);
        };
    }
}