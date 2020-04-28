/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { Action, combineReducers, createStore, Store } from "redux";
import ApplicationState from "./ApplicationState";
import debuggingReducer from "./Debugging/DebuggingReducer";
import enemyLevelReducer from "./EnemyLevel/EnemyLevelReducer";
import gameStateReducer from "./Game/GameStateReducer";
import keyboardStateReducer from "./Keyboard/KeyboardStateReducer";
import playerReducer from "./Player/PlayerReducer";

/**
 * Module:          Store
 * Responsibility:  Handles the redux store
 */

const allReducers = combineReducers({
    enemyLevelState: enemyLevelReducer,
    playerState: playerReducer,
    debuggingState: debuggingReducer,
    gameState: gameStateReducer,
    keyboardState: keyboardStateReducer
});

const store = createReduxStore();

export function createReduxStore(): Store<ApplicationState> {
    return createStore(
        allReducers,
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());
}

/**
 * Returns the store
 * @returns {Store}. The redux store.
 */
export function appStore(): Store<ApplicationState> {
    return store;
}

/**
 * Returns the ApplicationState
 * @returns {ApplicationState}. The application state.
 */
export function appState(): ApplicationState {
    return appStore().getState();
}

export function dispatch(action: Action): void {
    store.dispatch(action);
}