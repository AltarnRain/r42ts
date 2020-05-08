/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import dimensionProvider from "../Providers/DimensionProvider";
import { addBullet, addOrUpdateEnemy } from "../State/EnemyLevel/EnemyLevelActions";
import { EnemyState } from "../State/EnemyLevel/EnemyState";
import { StateProviders } from "../State/StateProviders";
import { appState, dispatch } from "../State/Store";
import { FireAngleProviderFunction, FireCheckFunction, Frame, FrameProviderFunction, ShipsToFireFunction } from "../Types";
import Mutators from "../Utility/FrameMutators";

/**
 * Module:          StraightDownBulletProvider
 * Responsibility:  Shoots a bullet straight down
 */

const {
    pixelSize
} = dimensionProvider();

/**
 * Class the handles al bullet business.
 * @export
 * @class BulletRunner
 */
export default class BulletRunner {
    /**
     * The bullet frame that will be fired.
     */
    private bulletFrame: Frame;

    /**
     * The fire check function. This function has the final say in whether an enemy will fire or not.
     */
    private fireCheck: FireCheckFunction;

    /**
     * Speed of the bullets shot by the enemy.
     */
    private speed: number;

    /**
     * The color of the bullet fired.
     */
    private bulletColor: string;

    /**
     * Ships to fire function.
     * @private
     * @type {ShipsToFireFunction}
     * @memberof BulletRunner
     */
    private shipsToFire: ShipsToFireFunction;

    /**
     * Provides a fire angle for a ship.
     * @private
     * @type {FireAngleProviderFunction}
     * @memberof BulletRunner
     */
    private fireAngleProvider: FireAngleProviderFunction;

    /**
     * Creates an instance of BulletRunner.
     * @param {FrameProviderFunction} getBulletFrame. A function that returns a bullet frame.
     * @param {string} bulletColor. The color of the bullet.
     * @param {number} speed. The speed of the bullet.
     * @param {ShipsToFireFunction} shipsToFire. A function that returns shits that can fire.
     * @param {FireCheckFunction} fireCheck. A function that checks individual ships if they can fire.
     * @memberof BulletRunner
     */
    constructor(
        getBulletFrame: FrameProviderFunction,
        bulletColor: string,
        speed: number,
        fireAngleProvider: FireAngleProviderFunction,
        shipsToFire: ShipsToFireFunction,
        fireCheck: FireCheckFunction) {

        this.speed = speed;
        this.bulletColor = bulletColor;
        this.bulletFrame = getBulletFrame();
        this.fireCheck = fireCheck;
        this.shipsToFire = shipsToFire;
        this.fireAngleProvider = fireAngleProvider;

        Mutators.Frame.setColor(this.bulletFrame, this.bulletColor);
    }

    /**
     * Determines which enemies can fire and how. Then dispatches bullets to the state.
     * @param {number} tick. Current tick.
     */
    public updateState(tick: number): void {
        const {
            playerState,
            enemyLevelState
        } = appState();

        // Enemies never fire bullets when the player is dead.
        if (!playerState.alive) {
            return;
        }

        const enemiesWhoMayFire: EnemyState[] = [];
        for (const enemy of enemyLevelState.enemies) {
            const lastShotTick = enemy.lastFireTick;

            // Check if this enemy's shot timeout has passed.
            if (tick - lastShotTick > enemyLevelState.fireInterval) {
                enemiesWhoMayFire.push(enemy);
            }
        }

        const ships = this.shipsToFire(enemiesWhoMayFire, this.fireAngleProvider);

        // The candiates are sorted so the enemeies with the best odds of hitting the player
        // are at the top. Now we'll use the firecheck function to get an array of enemies that
        // can actually fire.
        for (const ship of ships) {
            const fireAngle = this.fireAngleProvider(ship, ship.offsetLeft, ship.offsetTop);

            // Always call a fire check function with the last version of the enemyLevelState
            // this state is constantly updated by the dispatches done below.
            // Fire check functions check the state and make the final call if the ship
            // can fire or not.
            if (this.fireCheck(ship, fireAngle)) {
                const { hitbox } = ship;
                if (fireAngle !== undefined) {

                    const left = hitbox.left + ((hitbox.right - hitbox.left) / 2) - pixelSize;
                    const top = hitbox.bottom + pixelSize;

                    const bullet = StateProviders.getBulletParticleState(
                        left,
                        top,
                        this.speed,
                        fireAngle,
                        this.bulletFrame,
                        ship.enemyId,
                    );

                    const newState = { ...ship, lastFireTick: tick };

                    dispatch(addBullet(bullet));
                    dispatch(addOrUpdateEnemy(newState));
                }
            }
        }
    }
}