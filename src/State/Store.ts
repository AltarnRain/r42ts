import { combineReducers, createStore, ReducersMapObject, Store } from "redux";
import ActionPayload from "./ActionPayLoad";
import ApplicationState from "./Definition/ApplicationState";
import LevelState from "./Definition/LevelState";
import GameActions from "./GameActions";
import debuggingReducer from "./Reducers/DebuggingReducer";
import { gameStateReducer } from "./Reducers/GameStateReducer";
import { levelReducer } from "./Reducers/LevelReducer";
import playerReducer from "./Reducers/PlayerReducer";

/**
 * All reducer that build the application state.
 */
const reducers: ReducersMapObject<ApplicationState, ActionPayload<any>> = {
    levelState: levelReducer,
    playerState: playerReducer,
    debuggingState: debuggingReducer,
    gameState: gameStateReducer,
};

const allReducers = combineReducers(reducers);

const store = createStore<ApplicationState, ActionPayload<any>, LevelState, LevelState>(allReducers);

/**
 * Returns the store
 * @returns {Store}. The redux store.
 */
export function appStore(): Store<ApplicationState, ActionPayload<any>> {
    return store;
}

/**
 * Returns the State
 * @returns {AppState}. The application state.
 */
export function appState(): ApplicationState {
    return appStore().getState();
}

export function dispatch<T>(type: GameActions, payload?: T): void {
    store.dispatch({type, payload });
}