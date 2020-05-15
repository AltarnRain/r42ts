/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { Locations } from "../../Constants/Constants";
import { GameLocation } from "../../Models/GameLocation";
import dimensionProvider from "../../Providers/DimensionProvider";
import { randomNumberInRange } from "../../Utility/Lib";
import { getRandomLocation } from "../../Utility/Location";

/**
 * Module:          GetCloakingOrbSpawnLocations
 * Responsibility:  Returns locations for cloaking orbs to spawn.
 */

const {
    gameField,
    pixelSize
} = dimensionProvider();

export default function GetCloakingOrbSpawnLocations(): GameLocation[] {
    const locations: GameLocation[] = [];
    const outerLeft = gameField.left;
    const right = gameField.right - pixelSize * 3;

    for (let i = 0; i < 1; i++) {
        const newLocation = getRandomLocation(right, outerLeft, Locations.CloakingOrb.maxBottom, gameField.top);
        locations.push(newLocation);
    }

    return locations;
}