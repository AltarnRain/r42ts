import { GameRectangle } from "../../Models/GameRectangle";
import { Frame } from "../../Types";
export interface ParticleState {
    frame: Frame;
    hitbox: GameRectangle;
    speed: number;
    angle: number;
    acceletation: number;
    left: number;
    top: number;
}
