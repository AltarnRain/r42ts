/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          LevelReducer
 * Responsibility:  Provuders level state
 */

import produce from "immer";
import Enemies from "../../Assets/Enemies";
import Levels from "../../Assets/Levels/Levels";
import Enemy from "../../Models/Enemy";
import ActionPayload from "../Definitions/ActionPayload";
import LevelState from "../Definitions/LevelState";

export default function levelReducer(state: LevelState = initialize(), action: ActionPayload): LevelState {

    return produce(state, (draft) => {
        switch (action.type) {

        }
    });
}

function initialize(): LevelState {
    const level = Levels.level1;
    const enemies: Enemy[] = [];

    for (let index = 0; index < level.numberOfEnemies; index++) {

        const x = Math.ceil(Math.random() * 160);
        const y = Math.ceil(Math.random() * 20);

        const enemy: Enemy = {
            ...Enemies[level.enemy],
            location: {
                left: x,
                top: y
            },
        };

        enemies.push(enemy);
    }

    return {
        enemies,
        playerLocation: {
            left: 80,
            top: 100,
        }
    };
}