/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { diagonalAtPlayerAngleProvider } from "../AngleProviders/DiagonalAtPlayerAngleProvider";
import getTwoPixelBullet from "../Assets/twoPXBullet";
import { BaseEnemy } from "../Base/BaseEnemy";
import BaseLevel from "../Base/BaseLevel";
import BaseParticle from "../Base/BaseParticle";
import BulletRunner from "../BulletProviders/BulletRunner";
import CGAColors from "../Constants/CGAColors";
import orbSpawnLocations from "../Enemies/Orb/OrbEnemiesSpawnLocations";
import OrbEnemy from "../Enemies/Orb/OrbEnemy";
import { drawBackground } from "../GameScreen/StaticRenders";
import MoveDownAppearUp from "../LocationProviders/MoveDownAppearUp";
import GameLoop from "../Main/GameLoop";
import BulletParticle from "../Particles/BulletParticle";
import PlayerShip from "../Player/PlayerShip";
import CircleFrameProvider from "../Providers/CircleFrameProvider";
import EnemyLevelState from "../State/Definition/EnemyLevelState";
import { dispatch } from "../State/Store";

/**
 * Module:          Level 00
 * Responsibility:  Define the playground level.
 */

/**
 * Sets up level 00. Play ground level.
 */
export default class Level00 extends BaseLevel {

    constructor(stateManager: any, levelWon: () => boolean) {
        super(stateManager, levelWon);
    }

    public start(): void {
        super.start();

        this.begin([], 0);
    }
}
