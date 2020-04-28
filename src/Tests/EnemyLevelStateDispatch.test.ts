/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { createReduxStore } from "../State/Store";

/**
 * Module:          EnemeyLevelStateDispatchesTest
 * Responsibility:  Tests and fixates dispatches to the enemy level state. This means we go full circle and can
 *                  actually verify a dispatch changes the store exactly as we expect.
 */

describe("EnemeyLevelState Dispatches Test", () => {
    test("add and remove ExplosionCenter", () => {
        const store = createReduxStore();
        const payload = new TestClass();

        const count1 = store.getState().enemyLevelState.explosionCenters.length;

        store.dispatch({ type: "addExplosionCenter", payload });

        const count2 = store.getState().enemyLevelState.explosionCenters.length;

        store.dispatch({ type: "removeExplosionCenter", payload });

        const count3 = store.getState().enemyLevelState.explosionCenters.length;

        expect(count1).toBe(0);
        expect(count2).toBe(1);
        expect(count3).toBe(0);
    });

    test("add and remove enemies", () => {
        // Arrange
        const store = createReduxStore();
        const payload = [new TestClass()];
        const count1 = store.getState().enemyLevelState.enemies.length;

        // Act
        store.dispatch({ type: "setEnemies", payload });
        const count2 = store.getState().enemyLevelState.enemies.length;

        store.dispatch({ type: "removeEnemy", payload: payload[0] });
        const count3 = store.getState().enemyLevelState.enemies.length;

        // Assert
        expect(count1).toBe(0);
        expect(count2).toBe(1);
        expect(count3).toBe(0);
    });

    test("add and remove single particle", () => {
        const store = createReduxStore();
        const payload = new TestClass();

        const count1 = store.getState().enemyLevelState.particles.length;

        store.dispatch({ type: "addParticle", payload });

        const count2 = store.getState().enemyLevelState.particles.length;

        store.dispatch({ type: "removeParticle", payload });

        const count3 = store.getState().enemyLevelState.particles.length;

        expect(count1).toBe(0);
        expect(count2).toBe(1);
        expect(count3).toBe(0);
    });

    test("add particles", () => {
        const store = createReduxStore();
        const payload = [new TestClass(), new TestClass()];

        const count1 = store.getState().enemyLevelState.particles.length;

        store.dispatch({ type: "addParticles", payload });

        const count2 = store.getState().enemyLevelState.particles.length;

        expect(count1).toBe(0);
        expect(count2).toBe(2);
    });

    test("set phaser locations", () => {
        const store = createReduxStore();
        const payload = [new TestClass(), new TestClass()];

        const count1 = store.getState().enemyLevelState.phaserLocations.length;

        store.dispatch({ type: "setPhaserLocations", payload });
        const count2 = store.getState().enemyLevelState.phaserLocations.length;

        store.dispatch({ type: "clearPhaserLocations" });
        const count3 = store.getState().enemyLevelState.phaserLocations.length;

        expect(count1).toBe(0);
        expect(count2).toBe(2);
        expect(count3).toBe(0);
    });

    test("set fire interval", () => {
        // Arrange
        const store = createReduxStore();
        const oldState = store.getState().enemyLevelState.fireInterval;

        // Act
        store.dispatch({ type: "setFireInterval", payload: 200 });

        // Assert
        const newState = store.getState().enemyLevelState.fireInterval;
        expect(oldState).not.toBe(newState);
        expect(newState).toBe(200);
    });

    test("set enemy fire tick", () => {
        const store = createReduxStore();

        const enemies = [new Enemy()];
        store.dispatch({ type: "setEnemies", payload: enemies });

        // Act
        store.dispatch({ type: "setEnemyFireTick", payload: {ship: enemies[0], tick: 100 }});

        // Assert
        expect(enemies[0].lastFireTick).toBe(100);
    });
});

// Need a test class.
// tslint:disable-next-line: max-classes-per-file
class TestClass {
}

// Test class
// tslint:disable-next-line: max-classes-per-file
class Enemy {
    public lastFireTick: number = 0;
}