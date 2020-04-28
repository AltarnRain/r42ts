import Constants from "./Constants";
import { Hitboxes, PlayerImmortal as PlayerMortality, RenderPhaser } from "./Types";

export function playerMortality(mortality: "mortal" | "immortal"): PlayerMortality {
    return {
        type: Constants.playerMortality,
        payload: mortality,
    };
}

export function renderPhaserOn(render: boolean): RenderPhaser {
    return {
        type: Constants.renderPhaser,
        render
    };
}

export function hitboxesOn(show: boolean): Hitboxes {
    return {
        type: Constants.hitboxes,
        show
    };
}