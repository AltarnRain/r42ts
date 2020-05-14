/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseEnemy from "../Base/BaseEnemy";
import CGAColors from "../Constants/CGAColors";
import { Locations, Speeds } from "../Constants/Constants";
import orbSpawnLocations from "../Enemies/Orb/OrbEnemiesSpawnLocations";
import robotSpawnLocations from "../Enemies/Robot/RobotSpawnLocations";
import BulletRunner from "../Runners/BulletRunner";
import devilShipsToFire from "../ShipsToFireProviders/DevilShipsToFire";
import firstEnemyOccasionalDown from "../ShipsToFireProviders/FirstEnemyOccasionalDown";
import maxFiveDiagonal from "../ShipsToFireProviders/MaxFiveDiagonal";
import elevenInALine from "../SpawnLocations/ElevennInALine";
import sevenSixSeverGridProvider from "../SpawnLocations/SevenSixSevenGridProvider";
import { Enemies } from "../Types";
import enemyFactory from "./EnemyFactory";
import { maxThreeDown, maxFiveDown } from "../ShipsToFireProviders/MaxThreeDown";

/**
 * Module:          EnemyFactory
 * Responsibility:  Create enemy objects
 */

export function enemyLevelContentFactory(enemy: Enemies): { bulletRunner?: BulletRunner, enemies: BaseEnemy[] } {
    switch (enemy) {
        case "bird": {
            const enemies = sevenSixSeverGridProvider().map((location) => enemyFactory(enemy, location));
            return {
                enemies,
            };
        }

        case "robot": {
            const enemies = robotSpawnLocations.map((location) => enemyFactory(enemy, location));
            const bulletRunner = new BulletRunner(CGAColors.lightRed, Speeds.Bullets.robot, firstEnemyOccasionalDown);

            return {
                enemies,
                bulletRunner,
            };
        }

        case "orb": {
            const enemies = orbSpawnLocations.map((location) => enemyFactory(enemy, location));
            const bulletRunner = new BulletRunner(CGAColors.magenta, Speeds.Bullets.orb, maxFiveDiagonal);

            return {
                enemies,
                bulletRunner,
            };
        }

        case "spinner": {

            const enemies = sevenSixSeverGridProvider().map((location) => enemyFactory(enemy, location));
            const bulletRunner = new BulletRunner(CGAColors.white, Speeds.Bullets.spinner, maxFiveDiagonal);

            return {
                enemies,
                bulletRunner,
            };
        }

        case "balloon": {

            const enemies = sevenSixSeverGridProvider().map((location) => enemyFactory(enemy, location));
            const bulletRunner = new BulletRunner(CGAColors.blue, Speeds.Bullets.balloon, maxFiveDiagonal);

            return {
                enemies,
                bulletRunner
            };
        }

        case "asteroid-down":
        case "asteroid-diagonal": {
            const enemies: BaseEnemy[] = [];

            for (let i = 0; i < 7; i++) {
                enemies.push(enemyFactory(enemy));
            }

            return {
                enemies
            };
        }

        case "piston": {
            const enemies = elevenInALine(Locations.Piston.topStart).map((location) => enemyFactory(enemy, location));
            const bulletRunner = new BulletRunner(CGAColors.blue, Speeds.Bullets.balloon, maxThreeDown);

            return {
                enemies,
                bulletRunner
            };
        }

        case "diabolo": {
            const enemies = sevenSixSeverGridProvider().map((location) => enemyFactory(enemy, location));
            const bulletRunner = new BulletRunner(CGAColors.yellow, Speeds.Bullets.diabolo, maxFiveDiagonal);

            return {
                enemies,
                bulletRunner
            };
        }

        case "spacemonster-down":
        case "spacemonster-diagonal": {
            const enemies: BaseEnemy[] = [];

            for (let i = 0; i < 7; i++) {
                enemies.push(enemyFactory(enemy));
            }

            return {
                enemies
            };
        }

        case "devil": {

            const enemies = sevenSixSeverGridProvider().map((location) => enemyFactory(enemy, location));
            const bulletRunner = new BulletRunner(CGAColors.lightGreen, Speeds.Bullets.devil, devilShipsToFire);

            return {
                enemies,
                bulletRunner,
            };
        }
        case "crab": {
            const enemies = elevenInALine(Locations.Crab.topStart).map((location) => enemyFactory(enemy, location));
            const bulletRunner = new BulletRunner(CGAColors.lightRed, Speeds.Bullets.crab, maxFiveDiagonal);

            return {
                enemies,
                bulletRunner
            };
        }

        case "bat": {
            const enemies = sevenSixSeverGridProvider().map((location) => enemyFactory(enemy, location));
            const bulletRunner = new BulletRunner(CGAColors.yellow, Speeds.Bullets.bat, maxFiveDiagonal);

            return {
                enemies,
                bulletRunner,
            };
        }

        case "boat": {
            const enemies = elevenInALine(Locations.Piston.topStart).map((location) => enemyFactory(enemy, location));
            const bulletRunner = new BulletRunner(CGAColors.blue, Speeds.Bullets.balloon, maxFiveDown);

            return {
                enemies,
                bulletRunner
            };
        }

        default:
            throw new Error(`Unknown enemy ${enemy}`);
    }
}
