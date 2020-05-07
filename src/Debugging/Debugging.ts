import ctxProvider from "../Providers/CtxProvider";
import dimensionProvider from "../Providers/DimensionProvider";
import { appState } from "../State/Store";
import { GameRectangle } from "../Models/GameRectangle";

const {
    pixelSize,
    fullGameWidth,
    fullGameHeight
} = dimensionProvider();

export function DEBUGGING_renderHitboxes() {
    const { playerState, enemyLevelState } = appState();
    const hitboxes = enemyLevelState.enemyState.map((e) => e.hitbox);

    // Add player if defined.
    if (playerState.hitbox) {
        hitboxes.push(playerState.hitbox);
    }

    // Add bullet if defined.
    if (playerState.bulletState?.hitbox) {
        hitboxes.push(playerState.bulletState.hitbox);
    }

    enemyLevelState.bullets.forEach((b) => hitboxes.push(b.hitbox));
    enemyLevelState.shrapnell.forEach((b) => hitboxes.push(b.hitbox));

    // Draw a circle around each object using the
    // coordiates and radius of the hitbox.
    for (const hitbox of hitboxes) {

        if (hitbox !== undefined) {
            DEBUGGING_drawGameRect(hitbox, "white");
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
export function DEBUGGING_drawGrid(gridDetail: number): void {

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