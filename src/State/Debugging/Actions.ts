import { PlayerImmortal, PlayerMortal, RenderPhaserOn, RenderPhaserOff, HitboxesOn, HitboxesOff } from "./Types";
import Constants from "./Constants";

export function playerImmortal(): PlayerImmortal {
    return {
        type: Constants.playerImmortal,
    };
}

export function playerMortal(): PlayerMortal {
    return {
        type: Constants.playerMortal,
    };
}

export function renderPhaserOn(): RenderPhaserOn {
    return {
        type: Constants.renderPhaserOn,
    };
}

export function renderPhaserOff(): RenderPhaserOff {
    return {
        type: Constants.renderPhaserOff
    };
}

export function hitboxesOn(): HitboxesOn {
    return {
        type: Constants.hitboxesOn,
    };
}

export function hitboxesOff(): HitboxesOff {
    return {
        type: Constants.hitboxesOff,
    };
}