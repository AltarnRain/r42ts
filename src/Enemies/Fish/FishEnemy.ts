/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import Mutators from "../../Utility/FrameMutators";
import DirectionFrameEnemy from "../DirectionFrameEnemy";
import { getFishFireFrame } from "./GetFishOffsetFrames";

/**
 * Module:          FishEnemy
 * Responsibility:  Handle the fish enemy. This enemy is unique in that it has a specific frame it uses when it firs bullets.
 */

export class FishEnemy extends DirectionFrameEnemy {

    public beforeDispatch(): void {
        super.beforeDispatch();

        // If the fish is moving up or down it is attacking or recovering.
        // Regardless, it should show it fire frame.
        if (this.locationDirectionProvider.isAttacking()) {
            const fishFireFrame = getFishFireFrame();
            Mutators.Frame.convertHexToCGA(fishFireFrame);
            this.currentFrame = fishFireFrame;
        } else {
            const nextFrame = this.frameProvider.getCurrentFrame();
            Mutators.Frame.convertHexToCGA(nextFrame);
            this.currentFrame = nextFrame;
        }
    }

    /**
     * Called when a frame change is required. The Devil frames are all colored at initialisation so we can keep this simple.
     */
    protected onFrameChange(): void {
        // Cannot use the frame provider directly for this enemy.
        // We'll set the frame in the beforeDispatch method.
    }
}