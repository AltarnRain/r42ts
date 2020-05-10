import BaseLocationProvider from "../../Base/BaseLocationProvider";
import { getAngles } from "../../Constants/Angles";
import { getRandomArrayElement } from "../../Utility/Array";
import { getLocation } from "../../Utility/Location";
import dimensionProvider from "../DimensionProvider";

const {
    gameField
} = dimensionProvider();

export default class Wobble extends BaseLocationProvider {

    private angleSwitchTimeout: number;

    private lastTick: number = 0;
    private angles: number[];

    constructor(left: number, top: number, speed: number, angle: number, width: number, height: number, angleSwitchTimeout: number) {
        super(left, top, speed, angle, width, height);

        this.angleSwitchTimeout = angleSwitchTimeout;

        this.angles = getAngles();
    }

    public updateState(tick: number): void {

        if (tick > this.angleSwitchTimeout + this.lastTick) {
            this.angle = getRandomArrayElement(this.angles);
            this.lastTick = tick;
        }

        const newLocation = getLocation(this.left, this.top, this.angle, this.speed);

        if (newLocation.left <= gameField.left || newLocation.left + this.width >= gameField.right) {
            this.angle = 180 - this.angle;
        }

        if (newLocation.top <= gameField.top || newLocation.top >= gameField.bottom - this.height) {
            this.angle *= -1;
        }

        const nextLocation = getLocation(this.left, this.top, this.angle, this.speed);
        this.left = nextLocation.left;
        this.top = nextLocation.top;
    }
}