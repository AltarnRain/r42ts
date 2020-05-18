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

    const tjirping = Sounds.Tjirping.map((t) => new Howl({ src: t.data, loop: true, sprite: { sound: [60, t.duration - 60] } }));
    const whoping = Sounds.Whoping.map((w) => new Howl({ src: w.data, loop: true, sprite: { sound: [60, w.duration - 60] } }));
    const whizzing = Sounds.Wizzing.map((w) => new Howl({ src: w.data, loop: true, sprite: { sound: [60, w.duration - 60] } }));

    let currentBackground: Howl | undefined;

    export function playPlayerShoot(): void {
        playerBullet.play();
    }

    export function playEnemyExplosion(): void {
        const explosion = getRandomArrayElement(enemyExplosions);
        explosion.play();
    }

    export function playPhaser(): void {
        const phaser = getRandomArrayElement(phasers);
        phaser.play();
    }

    export function playPlayerExplosion(): void {
        playerExplosion.play();
    }

    export function playPlayerFormationFast(): void {
        playerFormationFast.play();
    }

    export function playPlayerFormationSlow(): void {
        playerFormationSlow.play();
    }

    export function playTravelingWarpGate(): void {
        warpGateTraveling.play("sound");
    }

    export function stopPlayingTravelingWarpGate(): void {
        warpGateTraveling.stop();
    }

    export function playTjirp(index: number): void {
        playBackground(tjirping, index);
    }

    export function playWizzing(index: number): void {
        playBackground(whizzing, index);

    }

    export function playWhop(index: number): void {
        playBackground(whoping, index);

    }

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