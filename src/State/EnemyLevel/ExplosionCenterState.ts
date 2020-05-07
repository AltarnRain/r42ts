import { GameRectangle } from "../../Models/GameRectangle";
import { Frame } from "../../Types";
export interface ExplosionCenterState {
    /**
     * Left position on screen in real pixels.
     * @type {number}
     * @memberof ExplosionCenterState
     */
    left: number;

    /**
     * Top position on screen in real pixels.
     * @type {number}
     * @memberof ExplosionCenterState
     */
    top: number;

    /**
     * Tick when the explosion center first appeared.
     * @type {number}
     * @memberof ExplosionCenterState
     */
    startTick: number;

    /**
     * Hitbox of the explosion. Explosion center's can kill the player.
     * @type {GameRectangle}
     * @memberof ExplosionCenterState
     */
    hitbox: GameRectangle;

    /**
     * Frame of the explision coloured in.
     * @type {Frame}
     * @memberof ExplosionCenterState
     */
    coloredFrame: Frame;

    /**
     * Time the explosion remains on the screen.
     * @type {number}
     * @memberof ExplosionData
     */
    explosionCenterDelay: number;
}
