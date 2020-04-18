import produce from "immer";
import ActionPayload from "../ActionPayLoad";
import LevelState from "../Definition/LevelState";

export function levelReducer(state: LevelState = initState(), action: ActionPayload<any>): LevelState {

    return produce(state, (draft) => {
        switch (action.type) {
            case "removeEnemy":
                draft.enemies = draft.enemies.filter((e) => e !== action.payload);
                break;
            case "pauseOn":
                draft.pause = true;
                break;
            case "pauseOff":
                draft.pause = false;
                break;
            case "addExplosionCenter":
                draft.explosionCenters.push(action.payload);
                break;
            case "removeExplosionCenter":
                draft.explosionCenters = draft.explosionCenters.filter((e) => e !== action.payload);
                break;
            case "addParticles":
                draft.particles.push(...action.payload);
                break;
            case "removeParticle":
                draft.particles = draft.particles.filter((p) => p !== action.payload);
                break;
            case "phaserOnScreen":
                draft.phaserOnScreen = true;
                break;
            case "phaserOffScreen":
                draft.phaserOnScreen = false;
                break;
            case "resetLevelState":
                draft = initState();
                break;
            case "setEnemies":
                draft.enemies = action.payload;
                draft.totalNumberOfEnemies = action.payload.length;
                break;
        }
    });
}

function initState(): LevelState {
    return {
        enemies: [],
        pause: false,
        explosionCenters: [],
        particles: [],
        phaserOnScreen: false,
        totalNumberOfEnemies: 0,
    };
}
