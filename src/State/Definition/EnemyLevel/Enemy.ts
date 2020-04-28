import { BaseEnemy } from "../../../Base/BaseEnemy";
export interface Enemy {
    ship: BaseEnemy;
    lastFireTick: number;
}
