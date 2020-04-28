import Constants from "./Constants";

export interface PlayerImmortal {
    type: typeof Constants.playerMortality;
    payload: "mortal" | "immortal";
}

export interface RenderPhaser {
    type: typeof Constants.renderPhaser;
    render: boolean;
}

export interface Hitboxes {
    type: typeof Constants.hitboxes;
    show: boolean;
}

export type DebuggingTypes =
    PlayerImmortal |
    RenderPhaser |
    Hitboxes
    ;
