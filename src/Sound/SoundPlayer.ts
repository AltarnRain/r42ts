/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { Howl } from "howler";
import { appState } from "../State/Store";
import { Enemies } from "../Types";
import { getRandomArrayElement } from "../Utility/Array";
import { Sounds } from "./Sounds";

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
        setBackground([Howls.warpGateTraveling], 0);
    }

    /**
     * Plays the warp gate travel sound in a loop.
     */
    function playFalling(): void {
        setBackground([Howls.falling], 0);
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
     * Plays the background sound for a specific enemy. Lots of enemies reuse background sound.
     * @param {Enemies} enemy. Enemy to play sound for.
     * @param {number} index. Index. Determines which sound to play. Usually linked to the number of enemies on screen.
     */
    export function playEnemyBackgroundSound(enemy: Enemies, index: number): void {
        switch (enemy) {
            case "bird-fire":
            case "bird":
            case "spinner":
            case "diabolo":
            case "bat":
                setBackground(Howls.tjirping, index);
                break;
            case "orb":
            case "orb-up-down":
            case "cloaking-orb":
            case "robot":
            case "robots-random":
            case "crab":
            case "piston":
            case "boat":
                setBackground(Howls.whoping, index);
                break;
            case "balloon":
                setBackground(Howls.wizzing, index);
                break;
            case "asteroid-down":
            case "asteroid-diagonal":
            case "spacemonster-down":
            case "spacemonster-diagonal":
                playFalling();
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
     * Picks a background sound from the passed array. If the index is to high, the last
     * sound in the array will be used.
     * @param {Howl[]} sounds. Array of Howls.
     * @param {number} index. Index of the sound.
     */
    function setBackground(sounds: Howl[], index: number): void {
        if (currentBackground) {
            currentBackground.stop();
        }

        if (index > sounds.length - 1) {
            currentBackground = sounds[sounds.length - 1];
        } else {
            currentBackground = sounds[index];
        }
    }

    /**
     * Ensures the background sound is playing. Doesn't do anything if there is no background sound
     * or if the background sound is already playing.
     */
    export function ensureBackground(): void {

        if (appState().gameState.pause) {
            currentBackground?.pause();
            return;
        }

        if (currentBackground && !currentBackground.playing()) {
            currentBackground.play();
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
    export const enemyExplosions = Sounds.EnemyExplosions.map((ex) => new Howl({ src: ex }));

    /**
     * Howl for the player bullet
     */
    export const playerBullet = new Howl({ src: Sounds.Player.shoot });

    /**
     * Howl objects for phasers.
     */
    export const phasers = Sounds.Phasers.map((p) => new Howl({ src: p }));

    /**
     * Sound for the player's explosion.
     */
    export const playerExplosions = Sounds.PlayerExplosions.map((x) => new Howl({ src: x }));

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
    export const warpGateTraveling = new Howl({ src: [Sounds.Player.warpgate]});

    /**
     * Sound played the player reached the end of a warp level.
     */
    export const warpLevelEnd = new Howl({ src: [Sounds.Player.warplevelend] });

    /**
     * Sounds while travelin through a warp gate.
     */
    export const falling = new Howl({ src: [Sounds.Falling.falling]});

    /**
     * Sounds for birds, spinners, diabolo's, etc.
     */
    export const tjirping = Sounds.Tjirping.map((t) => new Howl({ src: t}));

    /**
     * Sounds for orbs, robots, etc.
     */
    export const whoping = Sounds.Whoping.map((w) => new Howl({ src: w}));

    /**
     * Sounds for balloons, bats, etc.
     */
    export const wizzing = Sounds.Wizzing.map((w) => new Howl({ src: w}));

    /**
     * Music. Player on round 13 and round 42.
     */
    export const music = new Howl({ src: Sounds.Music.music});
}