/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { Howl } from "howler";
import { getRandomArrayElement } from "../Utility/Array";
import { Sounds } from "./Sounds";

/**
 * Module:          SoundPlayer
 * Responsibility:  Plays all Sounds.
 */

export namespace SoundPlayer {
    /**
     * Howl objects for explosion.
     */
    const enemyExplosions = Sounds.EnemyExplosions.map((ex) => new Howl({ src: ex.data }));

    /**
     * Howl for the player bullet
     */
    const playerBullet = new Howl({ src: Sounds.Player.shoot.data });

    /**
     * Howl objects for phasers.
     */
    const phasers = Sounds.Phasers.map((p) => new Howl({ src: p.data }));

    /**
     * Sound for the player's explosion.
     */
    const playerExplosion = new Howl({ src: Sounds.Player.explosion.data });

    /**
     * Sound for a fast formation.
     */
    const playerFormationFast = new Howl({ src: Sounds.Player.formationfast.data });

    /**
     * Sound for a slow formation.
     */
    const playerFormationSlow = new Howl({ src: Sounds.Player.formationslow.data });

    /**
     * Sounds while travelin through a warp gate.
     */
    const warpGateTraveling = new Howl({
        src: [Sounds.Player.warpgate.data], loop: true,
        sprite: {
            sound: [60, Sounds.Player.warpgate.duration - 100]
        }
    });

    /**
     * Sounds for birds, spinners, diabolo's, etc.
     */
    const tjirping = Sounds.Tjirping.map((t) => new Howl({ src: t.data, loop: true, sprite: { sound: [60, t.duration - 60] } }));

    /**
     * Sounds for orbs, robots, etc.
     */
    const whoping = Sounds.Whoping.map((w) => new Howl({ src: w.data, loop: true, sprite: { sound: [60, w.duration - 60] } }));

    /**
     * Sounds for balloons, bats, etc.
     */
    const wizzing = Sounds.Wizzing.map((w) => new Howl({ src: w.data, loop: true, sprite: { sound: [60, w.duration - 60] } }));

    /**
     * Current running background sound.
     */
    let currentBackground: Howl | undefined;

    /**
     * Play the player bullet sound.
     */
    export function playPlayerShoot(): void {
        playerBullet.play();
    }

    /**
     * Plays a random enemy explosion.
     */
    export function playEnemyExplosion(): void {
        const explosion = getRandomArrayElement(enemyExplosions);
        explosion.play();
    }

    /**
     * Plays a random phaser.
     */
    export function playPhaser(): void {
        const phaser = getRandomArrayElement(phasers);
        phaser.play();
    }

    /**
     * Plays the player explosion.
     */
    export function playPlayerExplosion(): void {
        playerExplosion.play();
    }

    /**
     * Plays the fast formation sound.
     */
    export function playPlayerFormationFast(): void {
        playerFormationFast.play();
    }

    /**
     * Plays the slow formation sound.
     */
    export function playPlayerFormationSlow(): void {
        playerFormationSlow.play();
    }

    /**
     * Plays the warp gate travel sound in a loop.
     */
    export function playTravelingWarpGate(): void {
        warpGateTraveling.play("sound");
    }

    /**
     * Stops playing the warpgate loop.
     */
    export function stopPlayingTravelingWarpGate(): void {
        warpGateTraveling.stop();
    }

    /**
     * Stops the current playing background sound (if available).
     */
    export function stopBackgroundPlaying(): void {
        if (currentBackground) {
            currentBackground.stop();
        }
    }

    /**
     * Play a tjirp in a loop.
     * @param {number} index. Index of the sound in the tjirping array.
     */
    export function playTjirp(index: number): void {
        playBackground(tjirping, index);
    }

    /**
     * Play a wizzing in a loop.
     * @param {number} index. Index of the sound in the wizzing array.
     */
    export function playWizzing(index: number): void {
        playBackground(wizzing, index);
    }

    /**
     * Play a whop in a loop.
     * @param {number} index. Index of the sound in the whop array.
     */
    export function playWhop(index: number): void {
        playBackground(whoping, index);
    }

    /**
     * Picks a background sound from the passed array. If the index is to high, the last
     * sound in the array will be used.
     * @param {Howl[]} sounds. Array of Howls.
     * @param {number} index. Index of the sound.
     */
    function playBackground(sounds: Howl[], index: number): void {
        if (currentBackground) {
            currentBackground.stop();
        }

        if (index > sounds.length - 1) {
            currentBackground = sounds[sounds.length - 1];
        } else {
            currentBackground = sounds[index];
        }

        currentBackground.play("sound");
    }
}