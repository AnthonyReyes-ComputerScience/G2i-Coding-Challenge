/**
 * @author Anthony Reyes
 * @file store.tsx
 * Centralized store for App
 */

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import {SystemState} from '../types'
import rootReducer from './reducers'

export const initialState: SystemState = {
    questions: [], 
    loading: false
}

const middleware = [thunk];

const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));

export default store;
