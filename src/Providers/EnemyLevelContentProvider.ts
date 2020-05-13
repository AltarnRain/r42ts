/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseEnemy from "../Base/BaseEnemy";
import CGAColors from "../Constants/CGAColors";
import { Speeds } from "../Constants/Constants";
import orbSpawnLocations from "../Enemies/Orb/OrbEnemiesSpawnLocations";
import pistonSpawnLocations from "../Enemies/Piston/PistonSpawnLocations";
import robotSpawnLocations from "../Enemies/Robot/RobotSpawnLocations";
import BulletRunner from "../Runners/BulletRunner";
import { Enemies } from "../Types";
import enemyFactory from "./EnemyFactory";
import firstEnemyOccasionalDown from "./ShipsToFireProviders/FirstEnemyOccasionalDown";
import maxFiveDiagonal from "./ShipsToFireProviders/MaxFiveDiagonal";
import maxThreeDown from "./ShipsToFireProviders/MaxThreeDown";
import sevenSixSeverGridProvider from "./SpawnLocations/SevenSixSevenGridProvider";

/**
 * Module:          EnemyFactory
 * Responsibility:  Create enemy objects
 */

export function enemyLevelContentFactory(enemy: Enemies): { bulletRunner?: BulletRunner, enemies: BaseEnemy[] } {
    switch (enemy) {
        case "bird": {
            const enemies = sevenSixSeverGridProvider().map((location) => enemyFactory("bird", location));
            return {
                enemies,
            };
        }

        case "robot": {
            const enemies = robotSpawnLocations.map((location) => enemyFactory("robot", location));
            const bulletRunner = new BulletRunner(CGAColors.lightRed, Speeds.Bullets.robot, firstEnemyOccasionalDown);

            return {
                enemies,
                bulletRunner,
            };
        }

        case "orb": {
            const enemies = [orbSpawnLocations.map((location) => enemyFactory("orb", location))[0]];
            const bulletRunner = new BulletRunner(CGAColors.magenta, Speeds.Bullets.orb, maxFiveDiagonal);

            return {
                enemies,
                bulletRunner,
            };
        }

        case "spinner": {

            const enemies = sevenSixSeverGridProvider().map((location) => enemyFactory("spinner", location));
            const bulletRunner = new BulletRunner(CGAColors.white, Speeds.Bullets.spinner, maxFiveDiagonal);

            return {
                enemies,
                bulletRunner,
            };
        }

        case "balloon": {

            const enemies = sevenSixSeverGridProvider().map((location) => enemyFactory("balloon", location));
            const bulletRunner = new BulletRunner(CGAColors.blue, Speeds.Bullets.balloon, maxFiveDiagonal);

            return {
                enemies,
                bulletRunner
            };
        }

        case "asteroid-down": {
            const enemies: BaseEnemy[] = [];

            for (let i = 0; i < 7; i++) {
                enemies.push(enemyFactory("asteroid-down"));
            }

            return {
                enemies
            };
        }

        case "piston": {
            const enemies = pistonSpawnLocations.map((rl) => enemyFactory("piston", rl));
            const bulletRunner = new BulletRunner(CGAColors.blue, Speeds.Bullets.balloon, maxThreeDown);

            return {
                enemies,
                bulletRunner
            };
        }

        case "diabolo": {
            const enemies = sevenSixSeverGridProvider().map((location) => enemyFactory("diabolo", location));
            const bulletRunner = new BulletRunner(CGAColors.yellow, Speeds.Bullets.diabolo, maxFiveDiagonal);

            return {
                enemies,
                bulletRunner
            };
        }

        case "spacemonster-down": {
            const enemies: BaseEnemy[] = [];

            for (let i = 0; i < 7; i++) {
                enemies.push(enemyFactory("spacemonster-down"));
            }

            return {
                enemies
            };
        }

        default:
            throw new Error(`Unknown enemy ${enemy}`);
    }
}
