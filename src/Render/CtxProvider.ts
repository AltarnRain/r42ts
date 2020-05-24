/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          CtxProvider
 * Responsibility:  Provides the 2d Canvas context
 */

let cachedCtx: CanvasRenderingContext2D;

/**
 * ctxProvider.
 * @returns {CanvasRenderingContext2D}. Returns a 2d canvas render context.
 */
export default function ctxProvider(): CanvasRenderingContext2D {
    if (!cachedCtx) {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        cachedCtx = canvas.getContext("2d") as CanvasRenderingContext2D;
    }

    return cachedCtx;
}