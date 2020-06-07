/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import "react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import debug from "./Debugging/Debug";
import Main from "./UI/Main";

/**
 * Module:          Index
 * Responsibility:  Entry point for the game
 */

// The first thing we do before we load ANYTIHNG. Is calculate the FPS of the requestAnimationFrame function.
// We need to FPS to determine the speeds of objects.
// Also, I could have done this within the game itself but I am wary of making methods async at this point.
Promise.all([calcFPS(), calcFPS(), calcFPS()]).then((fps) => {
    const maxFps = [fps[0], fps[1], fps[2]].reduce((a, b) => a > b ? a : b);

    // Ensure the query is one of my own debug statements.
    if (window.location.search.indexOf("?playground") > -1 ||
        window.location.search.indexOf("?canvas") > -1 ||
        window.location.search.indexOf("?sound") > -1) {
        // If the url contains ? we'll start in debug mode.
        // This is done using dynamic module loading because the second the game
        // starts it sets all its constants and the screensize is fixed. We do
        // not want this.
        debug(maxFps);
    } else {
        // Otherwise load the UI.
        ReactDOM.render(<Main fps={maxFps} />, document.getElementById("root"));
    }
});

/**
 * Calculates the fps managed.
 */
function calcFPS(): Promise<number> {
    return new Promise((resolve) => {
        function checker(): void {
            if (index--) {
                window.requestAnimationFrame(checker);
            } else {
                const result = count * 1000 / (performance.now() - start);
                resolve(result);
            }
        }

        let index = 60;
        const count = 60;
        const start = performance.now();

        checker();
    });
}