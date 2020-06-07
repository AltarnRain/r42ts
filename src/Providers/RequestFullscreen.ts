/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          RequestFullScreneProvider
 * Responsibility:  Provides a the right function to request a go-to fullscreen for an elemeny
 */

export default function requestFullScreneProvider(element: any): () => void {
    if (typeof element.requestFullscreen === "function") {
        return element.requestFullscreen();
    } else if (typeof element.webkitRequestFullScreen === "function") {
        return element.webkitRequestFullScreen();
    } else {
        throw new Error("Could not find a function for request full screen");
    }
}
