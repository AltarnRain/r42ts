/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { Howl } from "howler";
import Enemies from "../Enemies";
import { appState } from "../State/Store";
import { getRandomArrayElement } from "../Utility/Array";
import { Sounds } from "./Sounds";
import { SoundSprites } from "./SoundSprites";

/**
 * Module:          SoundPlayer
 * Responsibility:  Plays all Sounds.
 */

export namespace SoundPlayer {

    /**
     * Current running background sound.
     */
    let currentBackground: Howl | undefined;

    /**
     * Play the player bullet sound.
     */
    export function playerShoot(): void {
        Howls.playerBullet.play();
    }

    /**
     * Plays a random enemy explosion.
     */
    export function enemyExplosion(): void {
        getRandomArrayElement(Howls.enemyExplosions).play();
    }

    /**
     * Plays a random phaser.
     */
    export function phaser(): void {
        getRandomArrayElement(Howls.phasers).play();
    }

    /**
     * Plays the player explosion.
     */
    export function playerExplosion(): void {
        getRandomArrayElement(Howls.playerExplosions).play();
    }

    /**
     * Plays the fast formation sound.
     */
    export function playerFormationFast(): void {
        Howls.playerFormationFast.play();
    }

    /**
     * Plays the slow formation sound.
     */
    export function playPlayerFormationSlow(): void {
        Howls.playerFormationSlow.play();
    }

    /**
     * Plays the warp gate travel sound in a loop.
     */
    export function playTravelingWarpGate(): void {
        setEnemyLevelBackground([Howls.warpGateTraveling], 0);
    }

    /**
     * Stops the current playing background sound (if available).
     */
    export function stopBackground(): void {
        if (currentBackground) {
            currentBackground.stop();
            currentBackground = undefined;
        }

        Howls.music.stop();
    }

    /**
     * Stops the 'falling' sound from playing.
     */
    export function stopFalling(): void {
        Howls.falling.stop();
    }

    /**
     * Pauses warp level traveling sound. Used when the player dies.
     */
    export function pauseWarpLevelTravellingSound(): void {
        Howls.warpGateTraveling.pause();
    }

    /**
     * Plays the background sound for a specific enemy. Lots of enemies reuse background sound.
     * @param {Enemies} enemy. Enemy to play sound for.
     * @param {number} index. Index. Determines which sound to play. Usually linked to the number of enemies on screen.
     */
    export function playEnemyBackgroundSound(enemy: Enemies, enemyCount: number): void {
        switch (enemy) {
            case "bird-fire":
            case "bird":
            case "spinner":
            case "diabolo":
            case "diabolo-hard":
            case "bat":
                setEnemyLevelBackground(Howls.tjirping, enemyCount);
                break;
            case "orb":
            case "orb-up-down":
            case "cloaking-orb":
            case "robot":
            case "robots-random":
            case "crab":
            case "piston":
            case "boat":
                setEnemyLevelBackground(Howls.whoping, enemyCount);
                break;
            case "balloon":
                setEnemyLevelBackground(Howls.wizzing, enemyCount);
                break;
            case "asteroid-down":
            case "asteroid-diagonal":
            case "spacemonster-down":
            case "spacemonster-diagonal":
                if (!Howls.falling.playing()) {
                    Howls.falling.play();
                }
                break;
            case "devil":
            case "fish":
                // The devil and fish levels are odd ducks when it comes to background sound. They do not change
                // if the number of enemies diminishes.
                if (!Howls.music.playing()) {
                    Howls.music.play();
                }

                break;
            default:
                throw new Error("No sound available for enemy " + enemy);
        }
    }

    /**
     * Picks a background sound from the passed array.
     * @param {Howl[]} sounds. Array of Howls.
     * @param {number} enemyCount. Number of enemies currently on screen.
     */
    function setEnemyLevelBackground(sounds: Howl[], enemyCount: number): void {
        if (currentBackground) {
            currentBackground.stop();
        }

        const {
            enemyLevelState: { totalNumberOfEnemies }
        } = appState();

        const killedEnemies = totalNumberOfEnemies - enemyCount;
        const soundIndex = sounds.length - killedEnemies - 1;

        const sound = sounds[soundIndex];

        if (sound === undefined) {
            throw new Error("No sound");
        }

        currentBackground = sound;
    }

    /**
     * Ensures the background sound is playing for a level with enemies.
     * @param {boolean} pause. When true, pauses the current background sound.
     */
    export function ensureBackground(pause: boolean): void {

        if (pause) {
            currentBackground?.pause();
            return;
        }

        if (!currentBackground?.playing()) {
            currentBackground?.play("play");
        }
    }

    /**
     * Ensures the warp level traveling sound is playing.
     * @param {boolean} pause. When true, pauses the warp level travelling sound howl.
     */
    export function ensureWarpLevelBackground(pause: boolean): void {

        if (pause) {
            Howls.warpGateTraveling.pause();
            return;
        }

        if (!Howls.warpGateTraveling.playing()) {
            Howls.warpGateTraveling.play();
        }
    }

    /**
     * Plays the victoty sound when the player reaches the end of the warp gate.
     */
    export function warpLeveEnd(): void {
        Howls.warpLevelEnd.play();
    }
}

/**
 * Contains all Howl objects.
 */
namespace Howls {

    /**
     * Howl objects for explosion.
     */
    export const enemyExplosions = Sounds.EnemyExplosions.map((src) => new Howl({ src }));

    /**
     * Howl for the player bullet
     */
    export const playerBullet = new Howl({ src: Sounds.Player.shoot });

    /**
     * Howl objects for phasers.
     */
    export const phasers = Sounds.Phasers.map((src) => new Howl({ src }));

    /**
     * Sound for the player's explosion.
     */
    export const playerExplosions = Sounds.PlayerExplosions.map((src) => new Howl({ src }));

    /**
     * Sound for a fast formation.
     */
    export const playerFormationFast = new Howl({ src: Sounds.Player.formationfast });

    /**
     * Sound for a slow formation.
     */
    export const playerFormationSlow = new Howl({ src: Sounds.Player.formationslow });

    /**
     * Sounds while travelin through a warp gate.
     */
    export const warpGateTraveling = new Howl({ src: Sounds.Player.warpgate, loop: true });

    /**
     * Sound played the player reached the end of a warp level.
     */
    export const warpLevelEnd = new Howl({ src: [Sounds.Player.warplevelend] });

    /**
     * Sound while playing an astreroid or space monster level.
     */
    export const falling = new Howl({ src: Sounds.Falling.falling, loop: true });

    /**
     * Sounds for birds, spinners, diabolo's, etc.
     */
    export const tjirping = Sounds.Tjirping.map((src, index) => createSpriteHowl(src, index, SoundSprites.Tjirping));

    /**
     * Sounds for orbs, robots, etc.
     */
    export const whoping = Sounds.Whoping.map((src, index) => createSpriteHowl(src, index, SoundSprites.Whoping));

    /**
     * Sounds for balloons, bats, etc.
     */
    export const wizzing = Sounds.Wizzing.map((src, index) => createSpriteHowl(src, index, SoundSprites.Wizzing));

    /**
     * Music. Player on round 13 and round 42.
     */
    export const music = new Howl({ src: Sounds.Music.music });
}

/**
 * Create Sprite Howl.
 * @param {string} src. Base 64 incoded ogg.
 * @param {number} index. Index of the howl.
 * @param {SoundSprite[][]} sprites. An array with SoundSprite arrays.
 */
function createSpriteHowl(src: string, index: number, sprites: number[][]): Howl {

    const sprite = sprites[index];
    return new Howl({
        src,
        sprite: {
            play: [sprite[0], sprite[1]],
        },
        loop: true
    });
}