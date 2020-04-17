import produce from "immer";
import ActionPayload from "../ActionPayLoad";
import LevelState from "../Definition/LevelState";
import GameActions from "../GameActions";

export function levelReducer(state: LevelState = initState(), action: ActionPayload<any>): LevelState {

    return produce(state, (draft) => {
        switch (action.type) {
            case GameActions.addEnemy:
                draft.enemies.push(action.payload);
                break;
            case GameActions.removeEnemy:
                draft.enemies = draft.enemies.filter((e) => e !== action.payload);
                break;
            case GameActions.pauseOn:
                draft.pause = true;
                break;
            case GameActions.pauseOff:
                draft.pause = false;
                break;
            case GameActions.addExplosionCenter:
                draft.explosionCenters.push(action.payload);
                break;
            case GameActions.removeExplosionCenter:
                draft.explosionCenters = draft.explosionCenters.filter((e) => e !== action.payload);
                break;
            case GameActions.addParticle:
                draft.particles.push(action.payload);
                break;
            case GameActions.removeParticle:
                draft.particles = draft.particles.filter((p) => p !== action.payload);
                break;
            case GameActions.phaserOnScreen:
                draft.phaserOnScreen = true;
                break;
            case GameActions.phaserOffScreen:
                draft.phaserOnScreen = false;
                break;
            case GameActions.numberOfEnemies:
                draft.numberOfEnemies = action.payload;
                break;
            case GameActions.level:
                draft.level = action.payload;
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
        numberOfEnemies: 0,
        level: 1,
    };
}
