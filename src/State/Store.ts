/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { combineReducers, createStore, ReducersMapObject, Store } from "redux";
import ActionPayload from "./ActionPayLoad";
import ApplicationState from "./Definition/ApplicationState";
import EnemyLevelState from "./Definition/EnemyLevelState";
import GameActions from "./GameActions";
import debuggingReducer from "./Reducers/DebuggingReducer";
import enemyLevelReducer from "./Reducers/EnemyLevelReducer";
import gameStateReducer from "./Reducers/GameStateReducer";
import keyboardStateReducer from "./Reducers/KeyboardStateReducer";
import playerReducer from "./Reducers/PlayerReducer";

/**
 * Module:          Store
 * Responsibility:  Handles the redux store
 */

/**
 * All reducer that build the application state.
 */
const reducers: ReducersMapObject<ApplicationState, ActionPayload<any>> = {
    enemyLevelState: enemyLevelReducer,
    playerState: playerReducer,
    debuggingState: debuggingReducer,
    gameState: gameStateReducer,
    keyboardState: keyboardStateReducer
};

const allReducers = combineReducers(reducers);

const store = createReduxStore();

export function createReduxStore(): Store<ApplicationState, ActionPayload<any>> {
    return createStore<ApplicationState, ActionPayload<any>, EnemyLevelState, EnemyLevelState>(
        allReducers,
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());
}

/**
 * Returns the store
 * @returns {Store}. The redux store.
 */
export function appStore(): Store<ApplicationState, ActionPayload<any>> {
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