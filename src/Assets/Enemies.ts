/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Enemies
 * Responsibility:  A single object that contains the enemies by name
 */

import { Asset } from "../Interfaces/Asset";
import Dictionary from "../Interfaces/Dictionary";
import BirdAsset from "./Enemies/BirdAsset";

const Enemies: Dictionary<Asset> = {
    Bird: BirdAsset
};

export default Enemies;