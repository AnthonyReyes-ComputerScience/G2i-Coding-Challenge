/**
 * @author Anthony Reyes
 * @file actions.tsx
 * 
 * Actions:
 * FETCH_QUESTIONS
 * ANSWER_QUESTION
 */

import { SystemActionTypes, QuestionI, APIAttributesI, FETCH_QUESTIONS, ANSWER_QUESTION} from '../types';
import { Dispatch } from 'react';
import axios from 'axios'

/**
 * @name constructURLConstructs 
 * @param fetchRequest 
 * @description Constructs URL for API request
 */
const constructURL = (fetchRequest: APIAttributesI) => {
    // https://opentdb.com/api.php?amount=10&category=14&difficulty=medium&type=multiple
    // BASE GIVEN https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean
    const amount = fetchRequest.amount ? "amount=" + fetchRequest.amount : 'amount=10';
    const category = fetchRequest.category ? "&category=" + fetchRequest.category : '';
    const difficulty = fetchRequest.difficulty ? "&difficulty=" + fetchRequest.difficulty : '';
    const type = fetchRequest.type ? "&type=" + fetchRequest.type : ''
    const URL = `https://opentdb.com/api.php?${amount}${category}${difficulty}${type}`
    // console.log(URL);
    return URL
}

/**
 * Action to dispatch FETCH_QUESTIONS
 * @param questions 
 */
export const fetchedQuestions = (questions: QuestionI[]): SystemActionTypes => {
    return {
        type: FETCH_QUESTIONS,
        questions
    }
}

/**
 * Action to dispatch ANSWER_QUESTION
 * @param questionNumber
 * @param answer 
 */
export const answerQuestion = (questionNumber: number, answer: string): SystemActionTypes => {
    return {
        type: ANSWER_QUESTION,
        questionNumber,
        answer
    }
}

/**
 * Action generator to dispatch FETCH_QUESTIONS (Thunk)
 * @param fetchRequest - Type APIAttributesI
 * @param cb - used to update state after the questions are fetched
 */
export const fetchQuestions = (fetchRequest: APIAttributesI, cb: () => void) => {
    return (dispatch: Dispatch < any >) => {
        axios.get(constructURL(fetchRequest)).then((res: any) => {
            // console.log(res);
            // catch failed response and redirect to notFound
            // Wont implement now because it works with the static API
            dispatch(fetchedQuestions(res.data.results))
            cb();
        })
    }
}