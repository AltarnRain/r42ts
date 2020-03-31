/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Runs the game
 * Responsibility:  Main game loop.
 */

import BaseGameObject from "./Base/BaseGameObject";
import PlayerBulletFrame from "./Frames/PlayerBulletFrame";
import { DrawGameField } from "./GameScreen/StaticRenders";
import KeyboardState from "./Handlers/KeyboardStateHandler/KeyboardStateHandler";
import { IDraw } from "./Interfaces/IDraw";
import Player from "./Player/Player";
import PlayerBullet from "./Player/PlayerBullet";

export default class Runner {

    /**
     * Array of current game objects on screen.
     */
    private gameobjects: BaseGameObject[] = [];

    /**
     * Drawable objects like the lives indicator, score, etc.
     */
    private drawable: IDraw[] = [];

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
     * Static reference to this class.
     */
    private static runner: Runner;

    /**
     * Reference to the player object.
     */
    private player: BaseGameObject;

    /**
     * Quick reference to the player bullet.
     */
    private playerBullet: PlayerBullet | undefined;

    /**
     * Constructs the Runner.
     */
    private constructor() {
        this.run = this.run.bind(this);
    }

    /**
     * Start the runner.
     */
    public start(): void {
        this.handler = window.requestAnimationFrame(this.run);
    }

    /**
     * Stop the runner.
     */
    public stop(): void {
        window.cancelAnimationFrame(this.handler);
    }

    /**
     * Runs the main game loop.
     * @param {number} tick. The current tick.
     */
    private run(tick: number): void {
        // Runs all animation at the passed FPS
        if (tick - this.lastTick > (1000 / 60)) {

            DrawGameField();

            if (this.drawable) {
                this.drawable.forEach((d) => d.draw(tick));
            }

            if (this.player) {
                this.player.draw(tick);
            }

            this.gameobjects.forEach((a) => a.draw(tick));

            // Bullet left the field.
            if (this.playerBullet && !this.playerBullet.inField()) {
                this.playerBullet = undefined;
            }

            if (this.playerBullet !== undefined) {
                this.playerBullet.draw(tick);
            } else if (KeyboardState.fire && this.playerBullet === undefined) {
                this.playerBullet = new PlayerBullet(PlayerBulletFrame.F0, 270, 50, 1, { ...this.player.getLocation() });
            }

            this.lastTick = tick;

            this.handler = window.requestAnimationFrame(this.run);
        }
    }

    /**
     * Register an IDrawable class.
     * @param drawable.
     * @returns {() => void}. Function to remove the object from the array of drawable objects.
     */
    public register(gameObject: BaseGameObject): void {
        this.gameobjects.push(gameObject);
    }

    /**
     * Registers an object that is Drawable.
     * @param {IDraw} drawable. Drawable object.
     */
    public registerDrawable(drawable: IDraw) {
        this.drawable.push(drawable);
    }

    /**
     * Registers the player.
     * @param {Player} player. The player object.
     */
    public registerPlayer(player: Player): void {
        this.player = player;
    }

    /**
     * Get the game runner instance.
     * @returns {Runner}. Reference to the game runner.
     */
    public static get(): Runner {
        if (!Runner.runner) {
            Runner.runner = new Runner();
        }

        return Runner.runner;
    }

    public static register(gameObject: BaseGameObject): void {
        Runner.get().register(gameObject);
    }

    /**
     * Register a drawable object.
     * @param {IDraw} drawable. Object with an IDraw method.
     */
    public static registerDrawable(drawable: IDraw): void {
        Runner.get().registerDrawable(drawable);
    }

    /**
     * Register the player object.
     * @param {Player} player.
     */
    public static registerPlayer(player: Player): void {
        Runner.get().registerPlayer(player);
    }
}