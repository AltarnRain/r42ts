/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseEnemyLevel from "../Base/BaseEnemyLevel";
import CGAColors from "../Constants/CGAColors";
import { birdMovementSpeed as birdMovementSpeed } from "../Constants/EnemyMovementSpeeds";
import { birdRandomAngles as birdRandomAngles } from "../Constants/MovementAngles";
import birdSpawnLocations from "../Enemies/Bird/BirdSpawnLoctions";
import { enemyFactory } from "../Enemies/EnemyFactory";
import getExplosion01 from "../SharedFrames/Explosion01";
import { setExplosionData } from "../State/EnemyLevel/EnemyLevelActions";
import { ExplosionData } from "../State/EnemyLevel/ExplosionData";
import { dispatch } from "../State/Store";
import { getRandomArrayElement } from "../Utility/Array";
import { getFrameDimensions } from "../Utility/Frame";

/**
 * Module:          Level 01
 * Responsibility:  Define the first level.
 */

/**
 * Sets up level 01.
 */
export default class Level01 extends BaseEnemyLevel {

    /**
     * Start Level 01.
     */
    public start(): void {
        super.start();

        const explosion = getExplosion01(CGAColors.white, CGAColors.white);

        const { width, height } = getFrameDimensions(explosion.explosionCenterFrame);
        const explosionData: ExplosionData = {
            explosionCenterDelay: explosion.explosionCenterDelay,
            explosionHeight: height,
            explosionWidth: width,
        };

        dispatch(setExplosionData(explosionData));

        const enemies = birdSpawnLocations.map((location) => {

            // This may deviate from te original game but I do not care. Each birds will
            // begin to move in a random direction determined by the function below
            const randomMovementAngle = getRandomArrayElement(birdRandomAngles);
            return enemyFactory("bird", location.left, location.top, birdMovementSpeed, randomMovementAngle);
        });

        this.begin(enemies);
    }
}