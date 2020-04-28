/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { Action, combineReducers, createStore, Store } from "redux";
import ActionPayload from "./ActionPayLoad";
import ApplicationState from "./Definition/ApplicationState";
import enemyLevelReducer from "./Definition/EnemyLevel/EnemyLevelReducer";
import GameActions from "./GameActions";
import debuggingReducer from "./Reducers/DebuggingReducer";
import gameStateReducer from "./Reducers/GameStateReducer";
import keyboardStateReducer from "./Reducers/KeyboardStateReducer";
import playerReducer from "./Reducers/PlayerReducer";

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

/**
 * Typed dispatch function. Use the generic to add payload type checking.
 * @param {GameActions} type. Predefinted game actions.
 * @param {T} payload. An optional payload.
 */
export function dispatch<T>(type: GameActions, payload?: T): void {
    store.dispatch({ type, payload });
}

export function dispatch2(action: any): void {
    store.dispatch(action);
}