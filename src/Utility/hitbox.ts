import BaseGameObject from "../Base/BaseGameObject";
import GameLocation from "../Models/GameLocation";
export interface Hitbox {
    radius: number;
    location: GameLocation;
}

export interface ObjectHitbox {
    hitbox: Hitbox;
    object: BaseGameObject;
}