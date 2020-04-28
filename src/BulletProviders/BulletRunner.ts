/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { BaseEnemy } from "../Base/BaseEnemy";
import BulletParticle from "../Particles/BulletParticle";
import dimensionProvider from "../Providers/DimensionProvider";
import { appState, dispatch, dispatch2 } from "../State/Store";
import { FireCheckFunction, Frame, FrameProviderFunction } from "../Types/Types";
import { getFrameReturner } from "../Utility/Frame";
import { calculateAngle, calculateAngleDifference } from "../Utility/Geometry";
import { addParticle, setEnemyFireTick } from "../State/Definition/EnemyLevel/Actions";

/**
 * Module:          StraightDownBulletProvider
 * Responsibility:  Shoots a bullet straight down
 */

const {
    averagePixelSize
} = dimensionProvider();

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

    constructor(
        getBulletFrame: FrameProviderFunction,
        bulletColor: string,
        speed: number,
        shouldfire: FireCheckFunction) {

        this.fireCheck = shouldfire;
        this.speed = speed;
        this.bulletColor = bulletColor;
        this.bulletFrame = getBulletFrame();
    }

    public getBullets(tick: number): void {
        const {
            playerState,
            enemyLevelState
        } = appState();

        // Enemies never fire bullets when the player is dead.
        if (playerState.ship === undefined) {
            return;
        }

        // To determine which enemies have the best change of hitting
        // the player we calculate difference between the angle at which the
        // enemy will fire vs the angle towards the player.
        const candidates: Array<{ ship: BaseEnemy, angleDifference: number, angle: number }> = [];

        for (const enemy of enemyLevelState.enemies) {
            const ship = enemy.ship;
            const lastShotTick = enemy.lastFireTick;

            // Check if this enemy's shot timeout has passed.
            if (tick - lastShotTick > enemyLevelState.fireInterval) {

                const enemyFireAngle = ship.getFireAngle();
                const center = ship.getCenterLocation();
                const angleToPlayer = calculateAngle(center.left, center.top, playerState.playerLeftLocation, playerState.playerTopLocation);

                if (enemyFireAngle !== undefined && angleToPlayer !== undefined) {
                    const angleDifference = calculateAngleDifference(enemyFireAngle, angleToPlayer);

                    candidates.push({ ship, angleDifference, angle: enemyFireAngle });
                }
            }
        }

        // Sort the candidates. Those with the lowest angle difference will come out on top.
        candidates.sort((e1, e2) => {
            if (e1.angleDifference < e2.angleDifference) {
                return -1;
            } else {
                return 1;
            }
        });

        // The candiates are sorted so the enemeies with the best odds of hitting the player
        // are at the top. Now we'll use the firecheck function to get an array of enemies that
        // can actually fire.
        for (const candidate of candidates) {

            // Always call a fire check function with the last version of the enemyLevelState
            // this state is constantly updated by the dispatches done below.
            // Fire check functions check the state and make the final call if the ship
            // can fire or not.
            if (this.fireCheck(candidate.ship)) {
                const hitbox = candidate.ship.getHitbox();
                const enemyFireAngle = candidate.angle;

                const left = hitbox.left + ((hitbox.right - hitbox.left) / 2) - averagePixelSize;
                const top = hitbox.bottom + averagePixelSize;

                const bullet = new BulletParticle(left, top, candidate.ship, this.bulletColor, getFrameReturner(this.bulletFrame), enemyFireAngle, this.speed);

                dispatch2(addParticle(bullet));
                dispatch2(setEnemyFireTick(candidate.ship, tick));
            }
        }
    }
}