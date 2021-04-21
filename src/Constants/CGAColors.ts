/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          CGA Colors
 * Responsibility:  Contains color for the CGA 16 color pallet.
 */

const CGAColors = {             // Color hex code. Used to set the color of assets.
    black: "#000000",           // 0
    blue: "#0000AA",            // 1
    green: "#00AA00",           // 2
    cyan: "#00AAAA",            // 3
    red: "#AA0000",             // 4
    magenta: "#AA00AA",         // 5
    brown: "#AA5500",           // 6
    lightGray: "#AAAAAA",       // 7
    darkGray: "#555555",        // 8
    lightBlue: "#5555FF",       // 9
    lightGreen: "#55FF55",      // A
    lightCyan: "#55FFFF",       // B
    lightRed: "#FF5555",        // C
    lightMagenta: "#FF55FF",    // D
    yellow: "#FFFF55",          // E
    white: "#FFFFFF",           // F
    // Varies                   // V. Special color that flags a pixel as varies in color.
};

export const validColors = Object.keys(CGAColors).map((key) => (CGAColors as any)[key]);

export default CGAColors;