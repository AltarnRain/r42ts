/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Modules
 * Responsibility:  Export modules with aliases.
 */

import * as level from "./GameScreen/Level";
import * as lives from "./GameScreen/Lives";
import * as phaser from "./GameScreen/Phasers/Phasers";
import * as scoreBord from "./GameScreen/ScoreBoard";
import * as runner from "./Main/Runner";
import * as playerManager from "./Player/PlayerManager";

export { runner as Runner };
export { lives as Lives };
export { scoreBord as ScoreBoard };
export { level as Level };
export { phaser as Phasers };
export { playerManager as PlayerManager };
