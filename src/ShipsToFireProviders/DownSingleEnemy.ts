/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { angles } from "../Constants/Angles";
import ShipToFire from "../ShipsToFire";
import { EnemyState } from "../State/EnemyLevel/EnemyState";
import { appState } from "../State/Store";
import { getRandomArrayElement } from "../Utility/Array";
import { GetShipsReadyToFire as getShipsReadyToFire } from "./GetShipsReadyToFire";

/**
 * Module:          DownSingleEnemy
 * Responsibility:  Picks a random ship and returns it as a fire candidate X times so it fires X bullets.
 *                  Keeps track of shots fires and takes into account a Last Fire Tick so the bullets are
 *                  spread out.
 */

export default class DownSingleEnemy {
    private shotsFires: number;

    private firingEnemy: EnemyState | undefined;

    constructor(private maxBullets: number) {
        this.shotsFires = 0;
    }

    public downSingleEnemy(tick: number): ShipToFire[] {

        const returnValue: ShipToFire[] = [];

        const {
            enemyLevelState: { enemies, bullets }
        } = appState();

        if (bullets.length >= 5) {
            return returnValue;
        }

        if (this.shotsFires === this.maxBullets ||
            !enemies.some((e) => e.enemyId === this.firingEnemy?.enemyId)) {

            // Enemy is not set, fired its shots or died. Pick a new enemy that fires.
            const enemiesReadyToFire = getShipsReadyToFire(tick);

            this.firingEnemy = {...getRandomArrayElement(enemiesReadyToFire)};

            // Reset shots fired.
            this.shotsFires = 0;
        }

        if (this.firingEnemy !== undefined &&
            (this.firingEnemy.lastFiretick === undefined || this.firingEnemy.lastFiretick + 100 < tick)) {
            // Lets fire a bullet.
            returnValue.push({ enemy: this.firingEnemy, angle: angles.down });

            this.firingEnemy.lastFiretick = tick;
            this.shotsFires++;
        }

        return returnValue;
    }
}