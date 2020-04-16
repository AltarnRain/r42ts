import { combineReducers, createStore, ReducersMapObject, Store } from "redux";
import ActionPayload from "./ActionPayLoad";
import GameState from "./Definition/GameState";
import LevelState from "./Definition/LevelState";
import debuggingReducer from "./Reducers/DebuggingReducer";
import { levelReducer } from "./Reducers/LevelReducer";
import playerReducer from "./Reducers/PlayerReducer";

/**
 * All reducer that build the application state.
 */
const reducers: ReducersMapObject<GameState, ActionPayload<any>> = {
    level: levelReducer,
    player: playerReducer,
    debugging: debuggingReducer,
};

const allReducers = combineReducers(reducers);

const store = createStore<GameState, ActionPayload<any>, LevelState, LevelState>(allReducers);

/**
 * Returns the store
 * @returns {Store}. The redux store.
 */
export const appStore = (): Store<GameState, ActionPayload<any>> => {
    return store;
};

/**
 * Returns the State
 * @returns {AppState}. The application state.
 */
export const appState = (): GameState => {
    return appStore().getState();
};