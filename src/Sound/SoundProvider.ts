/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { Howl } from "howler";
import { BackgroundSound } from "../Types";
import { getRandomArrayElement } from "../Utility/Array";
import { Sounds } from "./Sounds";

/**
 * Module:          SoundProvider
 * Responsibility:  Provides all game sounds.
 */

export namespace SoundProvider {
    /**
     * Howl objects for explosion.
     */
    const enemyExplosions = Sounds.EnemyExplosions.map((ex) => new Howl({ src: ex }));

    /**
     * Howl for the player bullet
     */
    const playerBullet = new Howl({ src: Sounds.Player.shoot });

    /**
     * Howl objects for phasers.
     */
    const phasers = Sounds.Phasers.map((p) => new Howl({ src: p }));

    /**
     * Sound for the player's explosion.
     */
    const playerExplosion = new Howl({ src: Sounds.PlayerExplosion });

    /**
     * Sound for a fast formation.
     */
    const playerFormationFast = new Howl({ src: Sounds.Player.formationfast });

    /**
     * Sound for a slow formation.
     */
    const playerFormationSlow = new Howl({ src: Sounds.Player.formationslow });

    /**
     * Sounds while travelin through a warp gate.
     */
    const warpGateTraveling = new Howl({ src: [Sounds.Player.warpgate], loop: true,
        sprite: {
            warp: [0, 950]
         }});

    const tjirping = Sounds.Tjirping.map((t) => new Howl({ src: t, loop: true }));
    const whoping = Sounds.Whoping.map((w) => new Howl({ src: w, loop: true }));
    const wizzing = Sounds.Wizzing.map((w) => new Howl({ src: w, loop: true }));

    let currentTjirp: Howl | undefined;
    let currentWhoping: Howl | undefined;
    let currentWizzing: Howl | undefined;

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
        warpGateTraveling.play("warp");
    }

    export function stopPlayingTravelingWarpGate(): void {
        warpGateTraveling.stop();
    }

    export function playTjirp(tjirp: number): void {

        if (currentTjirp) {
            currentTjirp.stop();
        }

        currentTjirp = tjirping[tjirp];
        currentTjirp.play();
    }

    export function playWizzing(wizz: number): void {

        if (currentWizzing) {
            currentWizzing.stop();
        }

        currentWizzing = wizzing[wizz];
        currentWizzing.play();
    }

    export function playWhop(whop: number): void {
        if (currentWhoping) {
            currentWhoping.stop();
        }

        currentWhoping = whoping[whop];
        currentWhoping.play();
    }

    export function playBackGround(sound: BackgroundSound, enemyCount: number): void {
        switch (sound) {
            case "tjirp":
                playTjirp(enemyCount);
                break;
            case "whiz":
                playWizzing(enemyCount);
                break;
            case "whop":
                playWhop(enemyCount);
                break;
        }
    }
}