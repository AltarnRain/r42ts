/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Modules
 * Responsibility:  Export modules with aliases.
 */

import * as statusBar from "./GameScreen/StatusBar";
import * as playerMovementHandler from "./Handlers/PlayerMovementHandler";
import * as gameLoop from "./Main/GameLoop";
import * as runner from "./Main/Runner";
import * as playerFormation from "./Player/PlayerFormation";

export { runner as Runner };
export { gameLoop as GameLoop };
export { playerMovementHandler as PlayerMovementHandler };
export { playerFormation as PlayerFormation };
export { statusBar as StatusBar };
