/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseLevel from "../Base/BaseLevel";

/**
 * Module:          Level 00
 * Responsibility:  Define the playground level.
 */


/**
 * Sets up level 00. Play ground level.
 */
export default class Level00 extends BaseLevel {

    constructor(stateManager: any, levelWon: () => boolean) {
        super(stateManager, levelWon);
    }

    public start(): void {
        super.start();

        this.begin([]);
    }
}
