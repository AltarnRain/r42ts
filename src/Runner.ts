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
import { DrawGameField } from "./GameScreen/StaticRenders";
import KeyboardState from "./Handlers/KeyboardStateHandler/KeyboardStateHandler";
import IDraw from "./Interfaces/IDraw";
import ExplosionCenter from "./Particles/ExplosionCenter";
import Particle from "./Particles/Particle";
import Player from "./Player/Player";
import PlayerBullet from "./Player/PlayerBullet";
import PlayerBulletFrame from "./Player/PlayerBulletFrame";
import explosionLocationProvider from "./Providers/ExplosionLocationProvider";
import particleProvider from "./Providers/ParticleProvider";

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
     * Particles travelling on the screen.
     */
    private particles: Particle[] = [];

    /**
     * Explosion centers on the screen.
     */
    private explosionCenters: ExplosionCenter[] = [];

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

            this.gameobjects.forEach((go) => go.draw(tick));

            if (this.particles.length > 0) {
                this.particles.forEach((p) => p.draw(tick));
                this.particles = this.particles.filter((p) => !p.inScreen());
            }

            if (this.explosionCenters.length > 0) {
                this.explosionCenters.forEach((ec) => ec.draw(tick));
                this.explosionCenters = this.explosionCenters.filter((ec) => ec.fizzledOut());
            }

            // Bullet left the field.
            if (this.playerBullet && !this.playerBullet.inScreen()) {
                this.playerBullet = undefined;
            }

            if (this.playerBullet !== undefined) {
                this.playerBullet.draw(tick);
            } else if (KeyboardState.fire && this.playerBullet === undefined) {
                this.playerBullet = new PlayerBullet(PlayerBulletFrame.F0, 270, 50, 1, { ...this.player.getLocation() });
            }

            if (KeyboardState.selfDestruct) {

                if (this.gameobjects.length > 0 && this.player !== undefined) {

                    const assets = [
                        ...this.gameobjects,
                        this.player
                    ];

                    // Reset main rendering.
                    this.gameobjects = [];
                    this.player = undefined;

                    const explosionsLocations = assets.map((a) => explosionLocationProvider(a));

                    for (const explosionsLocation of explosionsLocations) {
                        const center = new ExplosionCenter(explosionsLocation.explosion.frame, explosionsLocation.location, explosionsLocation.explosion.explosionCenterDelay);
                        const particles = particleProvider(explosionsLocation.explosion, explosionsLocation.location);

                        this.particles.push(...particles);
                        this.explosionCenters.push(center);
                    }
                }
            }

            if (this.player !== undefined || this.playerBullet !== undefined) {
                const hittableObjects = [
                    ...this.gameobjects,
                    ...this.particles,
                    ...this.explosionCenters
                ].filter((o) => o !== undefined);

                if (hittableObjects.length > 0) {
                    for (const hittableObject of hittableObjects) {
                        const type = hittableObject.getObjectType();

                        switch (type) {
                            case "explosion":
                            case "particle":
                            case "enemy": {
                                    const loc = hittableObject.getLocation();

                                }
                        }
                    }
                }
            }

            this.lastTick = tick;
        }

        this.handler = window.requestAnimationFrame(this.run);
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