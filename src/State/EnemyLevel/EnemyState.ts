import Explosion from "../../Models/Explosion";
import { GameLocation } from "../../Models/GameLocation";
import { GameRectangle } from "../../Models/GameRectangle";
import { Frame } from "../../Types";

export interface EnemyState {
    enemyId: number;
    coloredExplosion: Explosion;
    offsetLeft: number;
    offsetTop: number;
    currentFrame?: Frame;
    hitpoints: number;
    hitbox: GameRectangle;
    centerLocation: GameLocation;
    points: number;
    lastFiretick?: number;
}