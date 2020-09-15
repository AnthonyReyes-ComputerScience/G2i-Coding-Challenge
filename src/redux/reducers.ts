/**
 * @author Anthony Reyes
 * @file Reducers.tsx
 * System Reducer
 * 
 * Only a single reducer being exported by default
 */

import { SystemState, SystemActionTypes, ANSWER_QUESTION, FETCH_QUESTIONS } from '../types'
import {initialState} from './store'

/**
 * 
 * @param state the Store given to the system Reducer 
 * @param action dispatch
 * 
 * actions:
 * FETCH_QUESTIONS
 * ANSWER_QUESTION
 */
const systemReducer = (state: SystemState = initialState, action: SystemActionTypes): SystemState => {
    // console.log(action, state);
    const newState: SystemState = {...state}
    switch (action.type) {
        case FETCH_QUESTIONS: {
            return {
                ...newState,
                questions: action.questions
            }
        }
        case ANSWER_QUESTION: {
            newState.questions[action.questionNumber].answered = action.answer;
            return {
                ...newState
            }
        }
        default:
            return newState
    }
}

export default systemReducer