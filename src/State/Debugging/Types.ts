import Constants from "./Constants";

export interface PlayerImmortal {
    type: typeof Constants.playerImmortal;
}

export interface PlayerMortal {
    type: typeof Constants.playerMortal;
}

export interface RenderPhaserOn {
    type: typeof Constants.renderPhaserOn;
}

export interface RenderPhaserOff {
    type: typeof Constants.renderPhaserOff;
}

export interface HitboxesOn {
    type: typeof Constants.hitboxesOn;
}

export interface HitboxesOff {
    type: typeof Constants.hitboxesOff;
}

export type DebuggingTypes =
    PlayerImmortal |
    PlayerMortal |
    RenderPhaserOn |
    RenderPhaserOff |
    HitboxesOn |
    HitboxesOff
    ;
