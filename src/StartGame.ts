import GameLoop from "./GameLoop";
import GameResultModel from "./Models/GameResultModel";
import dimensionProvider from "./Providers/DimensionProvider";

/**
 * startGame. Initializes the canvas dimensions, then starts the game.
 * @param {boolean} fullscreen. When true, the canvas's style properties will be set to utilize fullscreen dimensions.
 * @param {(result: GameResultModel) => void} gameOverCallback. Callback used by the GameLoop module to trigger a game over event in the UI,
 */
export function startGame(fullscreen: boolean, gameOverCallback: (result: GameResultModel) => void): void {

    setCanvasDimensions(fullscreen);

    // Ok, screen's setup let start the game!
    GameLoop.start(gameOverCallback);
}

/**
 * setCanvasDimensions. Set the canvas width and height to the optimal size for the game.
 * If the game is running fullscreen the canvas's style properties will be used to stretch the image
 * to take up as much space as possible while maintaining aspect ratio,
 * @param {boolean} fullscreen. When true, canvas will be stretched to take up as much space as it can.
 */
function setCanvasDimensions(fullscreen: boolean): void {
    // Set canvas dimensions.
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (canvas) {
        // Initialize the dimentions of the canvas.
        canvas.width = dimensionProvider().fullGameWidth;
        canvas.height = dimensionProvider().fullGameHeight;

        // Initialize windows mode by default.
        let left = `${dimensionProvider().canvasLeft}px`;
        let top = `${dimensionProvider().canvasTop}px`;
        let width = `${canvas.width}px`;
        let height = `${canvas.height}px`;

        if (fullscreen) {
            // Ok, the game is running in full screen. We'll set the canvas's style properties
            // to optimize the available game. This will make things a bit fuzzy but the
            // game completely relies on dimensions being an integer.
            const resizeFactor = dimensionProvider().fullGameHeight / screen.height;

            // Let do this on the assumtion someone is using a wide screen monitor so the width will
            // be more than the height.
            top = "0";

            // We'll use the available height.
            height = screen.height.toString() + "px";

            // Now we'll calculate how much the width can be while maintaining
            // the aspect ratio.
            const fullscreenWidth = (screen.width * resizeFactor);
            width = fullscreenWidth.toString() + "px";

            left = ((screen.width - fullscreenWidth) / 2).toString() + "px";

        }

        canvas.style.left = left;
        canvas.style.top = top;
        canvas.style.width = width;
        canvas.style.height = height;
    }
}