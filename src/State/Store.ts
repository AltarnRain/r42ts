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
import speedReducer from "./Speed/SpeedReducer";

/**
 * Module:          Store
 * Responsibility:  Handles the redux store
 */

const allReducers = combineReducers({
    enemyLevelState: enemyLevelReducer,
    playerState: playerReducer,
    debuggingState: debuggingReducer,
    gameState: gameStateReducer,
    keyboardState: keyboardStateReducer,
    speedState: speedReducer,
});

// Create the store when this module is loaded.
const store = createReduxStore();

/**
 * Creates the store.
 * @returns {Store<ApplicationState>}. The redux store.
 */
export function createReduxStore(): Store<ApplicationState> {
    // Uncomment he linees below to return a store you can monotir with the Redux Chrome extention.
    // return createStore(
    //     allReducers,
    //     (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());

    return createStore(allReducers);
}

/**
 * Returns the ApplicationState
 * @returns {ApplicationState}. The application state.
 */
export function appState(): ApplicationState {
    return store.getState();
}

/**
 * Shorthand for store.Dispatch.
 * @param {Action} action. An action.
 */
export function dispatch(action: Action): void {
    store.dispatch(action);
}