/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import getTwoPixelBullet from "../SharedFrames/GetTwoPixelBullet";
import { addBullet, setEnemyLastFireTick } from "../State/EnemyLevel/EnemyLevelActions";
import { StateProviders } from "../State/StateProviders";
import { appState, dispatch } from "../State/Store";
import Frame from "../Types/Frame";
import ShipsToFireFunction from "../Types/ShipsToFireFunction";

/**
 * Module:          BulletRunner
 * Responsibility:  Handles all enemy bullet firing.
 */

/**
 * Class the handles al bullet business.
 * @export
 * @class BulletRunner
 */
export default class BulletRunner {
    /**
     * The bullet frame that will be fired. Precolored.
     */
    private coloredBulletFrame: Frame;

    /**
     * Speed of the bullets shot by the enemy.
     */
    private speed: () => number;

    /**
     * A function that provides an array of ships that will fire and the angle at which they will fire.
     */
    private shipsToFire: ShipsToFireFunction;

    /**
     * Construct the object.
     * @param {string} bulletColor. Color of the bullet.
     * @param {number} speed. Speed of the bullet.
     * @param {ShipsToFireFunction}. A function that returns which ships fired.
     */
    constructor(
        bulletColor: string,
        speed: () => number,
        shipsToFire: ShipsToFireFunction) {

        this.speed = speed;
        this.shipsToFire = shipsToFire;

        this.coloredBulletFrame = getTwoPixelBullet(bulletColor);
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
                    this.speed(),
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