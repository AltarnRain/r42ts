import { appState, dispatch } from "../State/Store";

type GameKeys =
    "ArrowUp" |
    "ArrowDown" |
    "ArrowLeft" |
    "ArrowRight" |
    "Backspace" |
    "F1" |
    "F2" |
    "Space";

export const allGameKeys: GameKeys[] = [
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "Backspace",
    "F1",
    "F2",
    "Space",
];

/**
 * onKeyDown. Fired when a game control key is pushed down..
 * @param {KeyboardEvent} event. A keyboard event.
 */
function onKeyDown(event: KeyboardEvent): void {

    const { gameState } = appState();
    if (gameState.showingLevelBanner === false && allGameKeys.find((k) => k === event.code)) {
        // Only dispatch if the key is a game control key.
        event.stopPropagation();
        event.preventDefault();

        dispatch<string>("keydown", event.code);
    }
}

/**
 * onKeyUp. Fired when a game control key is let go.
 * @param {KeyboardEvent} event. A keyboard event.
 */
function onKeyUp(event: KeyboardEvent): void {

    if (allGameKeys.find((k) => k === event.code)) {
        // Only dispatch if the key is a game control key.
        event.stopPropagation();
        event.preventDefault();

        dispatch<string>("keyup", event.code);
    }
}

/**
 * Adds event listeners for keyup and keydown.
 */
export function registerListeners(): void {
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("keydown", onKeyDown);
}

/**
 * Removes the event listeners
 */
export function unregisterListeners(): void {
    window.removeEventListener("keyup", onKeyUp);
    window.removeEventListener("keydown", onKeyDown);
}
