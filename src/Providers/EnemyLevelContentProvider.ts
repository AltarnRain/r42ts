/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseEnemy from "../Base/BaseEnemy";
import CGAColors from "../Constants/CGAColors";
import { Locations, Speeds } from "../Constants/Constants";
import getBoatSpawnLocations from "../Enemies/Boat/GetBoatSpawnLocations";
import GetCloakingOrbSpawnLocations from "../Enemies/CloakingOrb/GetOrbSpawnLocations";
import orbSpawnLocations from "../Enemies/Orb/OrbEnemiesSpawnLocations";
import robotSpawnLocations from "../Enemies/Robot/RobotSpawnLocations";
import BulletRunner from "../Runners/BulletRunner";
import fireDownAimed from "../ShipsToFireProviders/FireDownAimed";
import { fiveDownRandom, threeDownRandom } from "../ShipsToFireProviders/FireDownRandom";
import firstEnemyOccasionalDown from "../ShipsToFireProviders/FirstEnemyOccasionalDown";
import maxFiveDiagonal from "../ShipsToFireProviders/MaxFiveDiagonal";
import elevenInALine from "../SpawnLocations/ElevennInALine";
import sevenSixSeverGridProvider from "../SpawnLocations/SevenSixSevenGridProvider";
import { Enemies } from "../Types";
import enemyFactory from "./EnemyFactory";

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

        case "orb":
        case "orb-up-down": {
            const enemies = orbSpawnLocations.map((location, index) => enemyFactory(enemy, location, index));
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
            const bulletRunner = new BulletRunner(CGAColors.blue, Speeds.Bullets.balloon, threeDownRandom);

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
            const bulletRunner = new BulletRunner(CGAColors.lightGreen, Speeds.Bullets.devil, (tick) => fireDownAimed(tick, 3));

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
            const enemies = getBoatSpawnLocations().map((location) => enemyFactory(enemy, location));
            const bulletRunner = new BulletRunner(CGAColors.blue, Speeds.Bullets.balloon, fiveDownRandom);

            return {
                enemies,
                bulletRunner
            };
        }

        case "cloaking-orb": {
            const enemies = GetCloakingOrbSpawnLocations().map((location) => enemyFactory(enemy, location));

            // Frames 0, 1, 2 are when the orb is fully vibisble. This is the only time this enemy is allowed to fire.
            // After all, it's going to look pretty weird when bullets appear out of thin air.
            const bulletRunner = new BulletRunner(CGAColors.lightRed, Speeds.Bullets.cloakingOrb, (tick) => fireDownAimed(tick, 5, [0, 1, 3] ));

            return {
                enemies,
                bulletRunner
            };
        }

        default:
            throw new Error(`Unknown enemy ${enemy}`);
    }
}
