/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { BaseEnemy } from "../Base/BaseEnemy";
import { StateProviders } from "../Particles/StateProviders";
import dimensionProvider from "../Providers/DimensionProvider";
import EnemyLevelRunner from "../Runners/EnemyLevelRunner";
import { addBullet, setEnemyFireTick } from "../State/EnemyLevel/Actions";
import { appState, dispatch } from "../State/Store";
import { FireCheckFunction, Frame, FrameProviderFunction, ShipsToFireFunction } from "../Types";
import Mutators from "../Utility/FrameMutators";

/**
 * Module:          StraightDownBulletProvider
 * Responsibility:  Shoots a bullet straight down
 */

const {
    pixelSize
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

    private shipsToFire: ShipsToFireFunction;

    constructor(
        getBulletFrame: FrameProviderFunction,
        bulletColor: string,
        speed: number,
        shipsToFire: ShipsToFireFunction,
        fireCheck: FireCheckFunction) {

        this.speed = speed;
        this.bulletColor = bulletColor;
        this.bulletFrame = getBulletFrame();
        this.fireCheck = fireCheck;
        this.shipsToFire = shipsToFire;

        Mutators.Frame.setColor(this.bulletFrame, this.bulletColor);
    }

    public getBullets(tick: number): void {
        const {
            playerState,
            enemyLevelState
        } = appState();

        // Enemies never fire bullets when the player is dead.
        if (!playerState.playerOnScreen) {
            return;
        }

        const enemies = EnemyLevelRunner.getEnemies();

        const enemiesWhoMayFire: BaseEnemy[] = [];
        for (const enemy of enemies) {
            const lastShotTick = enemy.lastFireTick;

            // Check if this enemy's shot timeout has passed.
            if (tick - lastShotTick > enemyLevelState.fireInterval) {
                enemiesWhoMayFire.push(enemy.ship);
            }
        }

        const ships = this.shipsToFire(enemiesWhoMayFire);

        // The candiates are sorted so the enemeies with the best odds of hitting the player
        // are at the top. Now we'll use the firecheck function to get an array of enemies that
        // can actually fire.
        for (const ship of ships) {

            // Always call a fire check function with the last version of the enemyLevelState
            // this state is constantly updated by the dispatches done below.
            // Fire check functions check the state and make the final call if the ship
            // can fire or not.
            if (this.fireCheck(ship)) {
                const hitbox = ship.getHitbox();
                const enemyFireAngle = ship.getFireAngle();
                if (enemyFireAngle !== undefined) {

                    const left = hitbox.left + ((hitbox.right - hitbox.left) / 2) - pixelSize;
                    const top = hitbox.bottom + pixelSize;

                    const bullet = StateProviders.getBulletParticleState(
                        left,
                        top,
                        this.speed,
                        enemyFireAngle,
                        this.bulletFrame,
                        ship.getId(),
                    );

                    dispatch(addBullet(bullet));
                    dispatch(setEnemyFireTick(ship, tick));
                }
            }
        }
    }
}