import { SystemState, SystemActionTypes, QuestionI } from '../types';
import { APIAttributesI } from "../Trivia/Trivia"
import { Dispatch } from 'react';
import axios from 'axios'

export const FETCH_QUESTIONS = 'FETCH_QUESTIONS';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';

const testQuestion = {
    category: "Entertainment: Video Games",
    type: "boolean",
    difficulty: "hard",
    question: "Unturned originally started as a Roblox game.",
    correct_answer: "True",
    incorrect_answers: [
        "False"
    ]
}

// FIX TYPING TO FETCH REQUEST
export const fetchedQuestions = (questions: QuestionI[]): SystemActionTypes => {
    console.log(questions);
    return {
        type: FETCH_QUESTIONS,
        questions
    }
}

const constructURL = (fetchRequest: APIAttributesI) => {
    console.log(fetchRequest)
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

export const fetchQuestions = (fetchRequest: APIAttributesI, cb: () => void): SystemActionTypes => {
    return (dispatch: Dispatch < any >) => {
        // const fakeResponse: QuestionI[] = [testQuestion, testQuestion];
        // console.log("Pre Dispatch", fakeResponse);
        // dispatch(fetchedQuestions(fakeResponse));
        axios.get(constructURL(fetchRequest)).then((res: any) => {
            console.log(res);
            // catch failed response and redirect to notFound
            dispatch(fetchedQuestions(res.data.results))
            cb();
        })
        // dispatch(fetchedQuestions(fakeResponse));
    }
}

export const answerQuestion = (questionNumber: number, answer: string ) => {
    return {
        type: ANSWER_QUESTION,
        questionNumber,
        answer
    }
}