/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Index
 * Responsibility:  Entry point for the game
 */

import BirdEnemy from "./Enemies/Bird/Bird";
import { registerListeners } from "./Handlers/KeyboardStateHandler/KeyboardStateHandler";
import GameLocation from "./Models/GameLocation";
import { Level, Lives, Phasers, Runner, ScoreBoard } from "./Modules";
import PlayerFormationParticle from "./Particles/PlayerFormationParticle";
import { PlayerFormationFrames } from "./Player/PlayerFrames";
import DimensionProvider from "./Providers/DimensionProvider";

const mouseCursorLocation: GameLocation = { left: 0, top: 0};

window.onload = () => {

    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (canvas) {
        // Initialize the dimentions of the canvas.
        canvas.width = DimensionProvider().fullWidth;
        canvas.height = DimensionProvider().fullHeight;

        switch (window.location.search.replace("?", "")) {
            case "playground": {

                registerListeners();

                const p = new PlayerFormationParticle({top: 500, left: 500}, mouseCursorLocation, PlayerFormationFrames.F0, 5);

                window.addEventListener("mousemove", (e: MouseEvent) => {
                    p.setUpdatedTargetLocation({left: e.offsetX, top: e.offsetY });
                });

                Runner.register(p);

                for (let i = 0; i < 0; i++) {
                    const bird = new BirdEnemy();
                    Runner.register(bird);
                }

                // Register the onPLayerDeath callback in the runner.
                // Runner.registerOnPlayerDeath(PlayerManager.onPlayerDeath);

                // PlayerManager.begin();

                Lives.setLives(2);
                Phasers.setPhasers(10);

                (window as any).r42 = {
                    updateScore: (n: number) => ScoreBoard.updateScore(n),
                    addToScore: (n: number) => ScoreBoard.addToScore(n),
                    setLives: (n: number) => Lives.setLives(n),
                    addLife: () => Lives.addLife(),
                    setLevel: (n: number) => Level.setLevel(n),
                    addLevel: () => Level.addLevel(),
                    addPhaser: () => Phasers.addPhaser(),
                    setPhasers: (n: number) => Phasers.setPhasers(n),
                    removePhaser: () => Phasers.reduceByOneCharge(),
                    setSpeed: (n: number) => Runner.setEnemySpeed(n),
                    toggleHitboxes: () => Runner.toggleHitboxes(),
                    addBirds: (n: number) => {
                        for (let i = 0; i < n; i++) {
                            const bird = new BirdEnemy();
                            Runner.register(bird);
                        }
                    },
                    togglePlayerImmortality: () => Runner.togglePlayerImmortality(),
                    toggleRenderPhaser: () => Runner.toggleRenderPhaser(),
                };

                Runner.start();
                // Runner.toggleHitboxes();
                // Runner.togglePlayerImmortality();
                // Runner.toggleRenderPhaser();
                break;
            }

            default:
            // StartGame();
        }
    }
};