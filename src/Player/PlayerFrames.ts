/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import Frame from "../Types/Frame";
import Mutators from "../Utility/FrameMutators";

/**
 * Module:          PlayerFrames
 * Responsibility:  Contains player related frames
 */

export function getPlayerFrame(): Frame {

    const playerFrame: Frame = [
        ["0", "0", "B", "B", "0", "0"],
        ["A", "B", "F", "F", "B", "A"],
        ["B", "F", "0", "0", "F", "B"],
    ];

    Mutators.Frame.convertHexToCGA(playerFrame);

    return playerFrame;
}

export function getPlayerFormationFrames(): Frame[] {
    const playerFormationFrames: Frame[] = [
        [["B", "B"]],  // nozzle tip
        [["F", "F"]],  // nozle bottom
        [              // left wing
            ["A", "B"],
            ["B", "F"],
        ],
        [              // right wing
            ["B", "A"],
            ["F", "B"]
        ],
    ];

    playerFormationFrames.forEach((pf) => Mutators.Frame.convertHexToCGA(pf));

    return playerFormationFrames;
}