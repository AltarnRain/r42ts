import { GameRectangle } from "../../Models/GameRectangle";
import { Frame } from "../../Types";
export interface ExplosionCenterState {
    left: number;
    top: number;
    startTick: number;
    hitbox: GameRectangle;
    coloredFrame: Frame;
}
