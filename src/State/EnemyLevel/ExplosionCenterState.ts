import { GameRectangle } from "../../Models/GameRectangle";
export interface ExplosionCenterState {
    left: number;
    top: number;
    startTick: number;
    hitbox: GameRectangle;
}
