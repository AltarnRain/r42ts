/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Store
 * Responsibility:  Sets up and prodvides the applicatino store.
 */

import { combineReducers, createStore, ReducersMapObject, Store } from "redux";
import AppState from "./AppState";
import ActionPayload from "./Definitions/ActionPayload";
import keyboardReducer from "./Reducers/KeyboardReducer";
import levelReducer from "./Reducers/LevelReducer";

/**
 * All reducer that build the application state.
 */
const reducers: ReducersMapObject<AppState, ActionPayload> = {
    keyboardState: keyboardReducer,
    levelState: levelReducer,
};

const allReducers = combineReducers(reducers);

const store = createStore<AppState, ActionPayload, AppState, AppState>(allReducers);

/**
 * Returns the store
 * @returns {Store}. The redux store.
 */
export const appStore = (): Store<AppState, ActionPayload> => {
    return store;
};

/**
 * Returns the State
 * @returns {AppState}. The application state.
 */
export const appState = (): AppState => {
    return appStore().getState();
};