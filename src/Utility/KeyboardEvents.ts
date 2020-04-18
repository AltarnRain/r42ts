import { dispatch } from "../State/Store";

/**
 * onKeyDown. Fired when a game control key is pushed down..
 * @param {KeyboardEvent} event. A keyboard event.
 */
function onKeyDown(event: KeyboardEvent): void {

    // Only dispatch if the key is a game control key.
    event.stopPropagation();
    event.preventDefault();

    dispatch<string>("keydown", event.code);
}

/**
 * onKeyUp. Fired when a game control key is let go.
 * @param {KeyboardEvent} event. A keyboard event.
 */
function onKeyUp(event: KeyboardEvent): void {

    // Only dispatch if the key is a game control key.
    event.stopPropagation();
    event.preventDefault();

    dispatch<string>("keyup", event.code);
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
