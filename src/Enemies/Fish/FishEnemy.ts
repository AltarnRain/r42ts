/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import GameLocation from "../../Models/GameLocation";
import dimensionProvider from "../../Providers/DimensionProvider";
import Mutators from "../../Utility/FrameMutators";
import DirectionFrameEnemy from "../DirectionFrameEnemy";
import { getFishFireFrame } from "./GetFishOffsetFrames";

/**
 * Module:          FishEnemy
 * Responsibility:  Handle the fish enemy. This enemy is unique in that it has a specific frame it uses when it firs bullets.
 */

const {
    pixelSize,
} = dimensionProvider();

const nozzleLeftOffset = pixelSize * -2.5;
const nozzzleTopOffset = pixelSize * -6;

export class FishEnemy extends DirectionFrameEnemy {

    public alterState(): void {
        super.alterState();

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

    /**
     * Returns the nozzle location for the fish enemey. This enemy doesn't fire
     * its bullets from its' 'bottom', instead it fires them from its life size rought from the middle
     * of the frame.
     * @returns {GameLocation | undefined}. The nozzle location if one could be determined.
     */
    protected getNozzleLocation(): GameLocation | undefined {

        // Get the offical nozzle location.
        const nozzleLocation = super.getNozzleLocation();

        // If defined, adjust it for the fish enemy so its bullets appear on its left side.
        if (nozzleLocation !== undefined) {
            nozzleLocation.left += nozzleLeftOffset;
            nozzleLocation.top += nozzzleTopOffset;
        }

        return nozzleLocation;
    }
}