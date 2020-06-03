import CGAColors from "../Constants/CGAColors";
import GameRectangle from "../Models/GameRectangle";
import dimensionProvider from "../Providers/DimensionProvider";
import ctxProvider from "../Render/CtxProvider";
import { appState } from "../State/Store";

const {
    pixelSize,
    fullGameWidth,
    fullGameHeight
} = dimensionProvider();

export function DEBUGGING_renderHitboxes() {
    const { playerState, enemyLevelState } = appState();
    const hitboxes = enemyLevelState.enemies.map((e) => e.hitbox);

    // Add player if defined.
    if (playerState.hitboxes) {
        hitboxes.push(playerState.hitboxes.bottom);
        hitboxes.push(playerState.hitboxes.middle);
    }

    // Add bullet if defined.
    if (playerState.bulletState?.hitbox) {
        hitboxes.push(playerState.bulletState.hitbox);
    }

    enemyLevelState.bullets.forEach((b) => hitboxes.push(b.hitbox));
    enemyLevelState.shrapnells.forEach((b) => hitboxes.push(b.hitbox));

    // Draw a circle around each object using the
    // coordiates and radius of the hitbox.
    for (const hitbox of hitboxes) {

        if (hitbox !== undefined) {
            DEBUGGING_drawGameRect(hitbox, CGAColors.lightRed);
        }
    }
}

export function DEBUGGING_drawGameRect(hitbox: GameRectangle, color: string, lineWith: number = 2) {
    const ctx = ctxProvider();
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.rect(hitbox.left, hitbox.top, hitbox.right - hitbox.left, hitbox.bottom - hitbox.top);
    ctx.lineWidth = lineWith;
    ctx.stroke();
    ctx.closePath();
}

/**
 * Debugggin function. Draws a grid in the screen for animation alignment.
 */
export function DEBUGGING_drawGrid(gridDetail?: number): void {

    if (gridDetail === undefined) {
        gridDetail = 1;
    }

    const ctx = ctxProvider();
    for (let r = 0; r < 120; r += 1) {
        ctx.beginPath();
        const y = r * pixelSize * gridDetail;
        ctx.lineTo(0, y);
        ctx.lineTo(fullGameWidth, y);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "white";
        ctx.stroke();
        ctx.closePath();
    }

    for (let r = 0; r < 160; r += 1) {
        ctx.beginPath();
        const x = r * pixelSize * gridDetail;
        ctx.lineTo(x, 0);
        ctx.lineTo(x, fullGameHeight);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "white";
        ctx.stroke();
        ctx.closePath();
    }
}