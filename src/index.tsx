/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import MainMenu from "./UI/MainMenu";

/**
 * Module:          Index
 * Responsibility:  Entry point for the game
 */

if (window.location.search.indexOf("?") > -1) {
    // If the url contains ? we'll start in debug mode.
    import("./Debug").then((m) => m.start());
} else {
    // Otherwise load the UI.
    ReactDOM.render(<MainMenu />, document.getElementById("root"));
}