/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseEnemy from "../Base/BaseEnemy";
import CGAColors from "../Constants/CGAColors";
import { Locations } from "../Constants/Constants";
import Enemies from "../Enemies";
import getBoatSpawnLocations from "../Enemies/Boat/GetBoatSpawnLocations";
import orbSpawnLocations from "../Enemies/Orb/OrbEnemiesSpawnLocations";
import robotSpawnLocations from "../Enemies/Robot/RobotSpawnLocations";
import BulletRunner from "../Runners/BulletRunner";
import fireDownAimed from "../ShipsToFireProviders/FireDownAimed";
import { fiveDownRandom, threeDownRandom } from "../ShipsToFireProviders/FireDownRandom";
import firstEnemyOccasionalDown from "../ShipsToFireProviders/FirstEnemyOccasionalDown";
import maxFiveDiagonal from "../ShipsToFireProviders/MaxFiveDiagonal";
import elevenInALine from "../SpawnLocations/ElevennInALine";
import getRandomSpawnLocations from "../SpawnLocations/GetRandomSpawnLocations";
import sevenSixSevenGridProvider from "../SpawnLocations/SevenSixSevenGridProvider";
import { appState } from "../State/Store";
import dimensionProvider from "./DimensionProvider";
import enemyFactory from "./EnemyFactory";

/**
 * Module:          EnemyFactory
 * Responsibility:  Create enemy objects
 */

const {
    gameField
} = dimensionProvider();

export default function enemyLevelContentFactory(enemy: Enemies): { bulletRunner?: BulletRunner, enemies: BaseEnemy[] } {
    switch (enemy) {
        case "bird":
        case "bird-fire": {
            const enemies = sevenSixSevenGridProvider().map((location) => enemyFactory(enemy, location));

            let bulletRunner: BulletRunner | undefined;

            if (enemy === "bird-fire") {
                bulletRunner = new BulletRunner(CGAColors.brown, () => appState().speedState.bullets.bird, maxFiveDiagonal);
            }

            return {
                enemies,
                bulletRunner,
            };
        }

        case "robot":
        case "robots-random": {

            let bulletRunner: BulletRunner;
            let enemies: BaseEnemy[];

            if (enemy === "robot") {
                bulletRunner = new BulletRunner(CGAColors.lightRed, () => appState().speedState.bullets.robot, firstEnemyOccasionalDown);
                enemies = robotSpawnLocations.map((location) => enemyFactory(enemy, location));
            } else if (enemy === "robots-random") {
                bulletRunner = new BulletRunner(CGAColors.lightRed, () => appState().speedState.bullets.robot, maxFiveDiagonal);
                enemies = getRandomSpawnLocations(14, gameField.top, Locations.robot.scatteredMaxBottom).map((location) => enemyFactory(enemy, location));
            } else {
                throw new Error("Unhandled level creation");
            }

            return {
                enemies,
                bulletRunner,
            };
        }

        case "orb":
        case "orb-up-down": {
            const enemies = orbSpawnLocations.map((location, index) => enemyFactory(enemy, location, index));
            const bulletRunner = new BulletRunner(CGAColors.magenta, () => appState().speedState.bullets.orb, maxFiveDiagonal);

            return {
                enemies,
                bulletRunner,
            };
        }

        case "spinner": {

            const enemies = sevenSixSevenGridProvider().map((location) => enemyFactory(enemy, location));
            const bulletRunner = new BulletRunner(CGAColors.white, () => appState().speedState.bullets.spinner, maxFiveDiagonal);

            return {
                enemies,
                bulletRunner,
            };
        }

        case "balloon": {

            const enemies = sevenSixSevenGridProvider().map((location) => enemyFactory(enemy, location));
            const bulletRunner = new BulletRunner(CGAColors.blue, () => appState().speedState.bullets.balloon, maxFiveDiagonal);

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
            const bulletRunner = new BulletRunner(CGAColors.blue, () => appState().speedState.bullets.balloon, threeDownRandom);

            return {
                enemies,
                bulletRunner
            };
        }

        case "diabolo":
        case "diabolo-hard": {
            const enemies = sevenSixSevenGridProvider().map((location) => enemyFactory(enemy, location));
            const bulletRunner = new BulletRunner(CGAColors.yellow, () => appState().speedState.bullets.diabolo, maxFiveDiagonal);

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

            const enemies = sevenSixSevenGridProvider().map((location) => enemyFactory(enemy, location));
            const bulletRunner = new BulletRunner(CGAColors.lightGreen, () => appState().speedState.bullets.devil, (tick) => fireDownAimed(tick, 3));

            return {
                enemies,
                bulletRunner,
            };
        }
        case "crab": {
            const enemies = elevenInALine(Locations.Crab.topStart).map((location) => enemyFactory(enemy, location));
            const bulletRunner = new BulletRunner(CGAColors.lightRed, () => appState().speedState.bullets.crab, maxFiveDiagonal);

            return {
                enemies,
                bulletRunner
            };
        }

        case "bat": {
            const enemies = sevenSixSevenGridProvider().map((location) => enemyFactory(enemy, location));
            const bulletRunner = new BulletRunner(CGAColors.yellow, () => appState().speedState.bullets.bat, maxFiveDiagonal);

            return {
                enemies,
                bulletRunner,
            };
        }

        case "boat": {
            const enemies = getBoatSpawnLocations().map((location) => enemyFactory(enemy, location));
            const bulletRunner = new BulletRunner(CGAColors.blue, () => appState().speedState.bullets.balloon, fiveDownRandom);

            return {
                enemies,
                bulletRunner
            };
        }

        case "cloaking-orb": {
            const enemies = getRandomSpawnLocations(15, gameField.top, Locations.CloakingOrb.maxBottom).map((location) => enemyFactory(enemy, location));

            // Frames 0, 1, 2 are when the orb is fully vibisble. This is the only time this enemy is allowed to fire.
            // After all, it's going to look pretty weird when bullets appear out of thin air.
            const bulletRunner = new BulletRunner(CGAColors.lightRed, () => appState().speedState.bullets.cloakingOrb, (tick) => fireDownAimed(tick, 5, [0, 1, 3]));

            return {
                enemies,
                bulletRunner
            };
        }

        case "fish": {
            const enemies = sevenSixSevenGridProvider().map((location) => enemyFactory(enemy, location));

            // Frames 0, 1, 2 are when the orb is fully vibisble. This is the only time this enemy is allowed to fire.
            // After all, it's going to look pretty weird when bullets appear out of thin air.
            const bulletRunner = new BulletRunner(CGAColors.lightGreen, () => appState().speedState.bullets.fish, (tick) => fireDownAimed(tick, 5, [0, 1]));

            return {
                enemies,
                bulletRunner,
            };
        }

        default:
            throw new Error(`Unknown enemy ${enemy}`);
    }
}
