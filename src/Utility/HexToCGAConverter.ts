import CGAColors from "../Constants/CGAColors";

/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          HexToCGAConverter.
 * Responsibility:  Convert raster (hex) color to a CGA color
 */

const HexToCGAConverter = (hex: string): string => {
    switch (hex) {
        case "0":
            return CGAColors.black;
        case "1":
            return CGAColors.blue;
        case "2":
            return CGAColors.green;
        case "3":
            return CGAColors.cyan;
        case "4":
            return CGAColors.red;
        case "5":
            return CGAColors.magenta;
        case "6":
            return CGAColors.brown;
        case "7":
            return CGAColors.lightGray;
        case "8":
            return CGAColors.darkGray;
        case "9":
            return CGAColors.lightBlue;
        case "A":
            return CGAColors.lightGreen;
        case "B":
            return CGAColors.lightCyan;
        case "C":
            return CGAColors.lightRed;
        case "D":
            return CGAColors.lightMagenta;
        case "E":
            return CGAColors.yellow;
        case "F":
            return CGAColors.white;
        default:
            return "";
    }
};

export default HexToCGAConverter;
