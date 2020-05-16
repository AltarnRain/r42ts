/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import dimensionProvider from "../Providers/DimensionProvider";
import getTwoPixelBullet from "../SharedFrames/GetTwoPixelBullet";
import { addBullet, addOrUpdateEnemy, setEnemyLastFireTick } from "../State/EnemyLevel/EnemyLevelActions";
import { EnemyState } from "../State/EnemyLevel/EnemyState";
import { StateProviders } from "../State/StateProviders";
import { appState, dispatch } from "../State/Store";
import { Frame, ShipsToFireFunction } from "../Types";
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
    private coloredBulletFrame: Frame;

    /**
     * Speed of the bullets shot by the enemy.
     */
    private speed: number;

    /**
     * The color of the bullet fired.
     */
    private bulletColor: string;

    /**
     * A function that provides an array of ships that will fire and the angle at which they will fire.
     */
    private shipsToFire: ShipsToFireFunction;

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
        bulletColor: string,
        speed: number,
        shipsToFire: ShipsToFireFunction) {

        this.speed = speed;
        this.bulletColor = bulletColor;
        this.shipsToFire = shipsToFire;

        this.coloredBulletFrame = getTwoPixelBullet();
        Mutators.Frame.setColor(this.coloredBulletFrame, this.bulletColor);
    }

    /**
     * Determines which enemies can fire and how. Then dispatches bullets to the state.
     * @param {number} tick. Current tick.
     */
    public updateState(tick: number): void {

        const {
            playerState: { alive}
        } = appState();

        // Enemies do not fire when the player is dead.
        if (!alive) {
            return;
        }

        const shipsToFire = this.shipsToFire(tick);

        // The candiates are sorted so the enemeies with the best odds of hitting the player
        // are at the top. Now we'll use the firecheck function to get an array of enemies that
        // can actually fire.
        for (const shipToFire of shipsToFire) {

            const { angle, enemy: { nozzleLocation, enemyId } } = shipToFire;

            if (angle !== undefined && nozzleLocation !== undefined) {

                const { left, top } = nozzleLocation;
                const bullet = StateProviders.getBulletParticleState(
                    left,
                    top,
                    this.speed,
                    angle,
                    this.coloredBulletFrame,
                    enemyId,
                );

                dispatch(addBullet(bullet));
                dispatch(setEnemyLastFireTick(shipToFire.enemy.enemyId, tick));
            }
        }
    }
}