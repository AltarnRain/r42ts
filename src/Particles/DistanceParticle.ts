/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import GameLocation from "../Models/GameLocation";
import { Frame } from "../Types/Types";
import { convertFrameColor } from "../Utility/Frame";
import { calculateDistance } from "../Utility/Location";
import Particle from "./Particle";

/**
 * Module:          DestinationParticle
 * Responsibility:  A particle that travels a distance and then stops being drawn.
 */

export default class DistanceParticle extends Particle {
    private startPosition: GameLocation;
    private distance: number;

    /**
     * Construct the distance particle.
     */
    constructor(frame: Frame, angle: number, speed: number, acceleration: number, location: GameLocation, distance: number) {
        super(frame, angle, speed, acceleration, location);

        this.startPosition = {...location};

        this.distance = distance;

        convertFrameColor(this.currentFrame);
    }

    /**
     * traveling
     * @returns {boolean}. Returns true if the particle has not yet reached its destination.
     */
    public traveling(): boolean {
        return calculateDistance(this.startPosition, this.location) < this.distance;
    }
}