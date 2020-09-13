import { SystemState, SystemActionTypes, QuestionI } from '../types'
import { FETCH_QUESTIONS, ANSWER_QUESTION } from './actions'
import {initialState} from './store'
import { combineReducers } from 'redux';


/**
 * 
 * @param state the Store given to the system Reducer 
 * @param action dispatch
 */
const systemReducer = (state: SystemState = initialState, action: SystemActionTypes): SystemState => {
    console.log(action, state);
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