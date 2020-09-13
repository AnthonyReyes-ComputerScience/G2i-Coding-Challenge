import * as redux from 'redux'

export type SystemActionTypes = any;

export interface QuestionI {
    category: string,
    type: string,
    difficulty: string,
    question: string,
    correct_answer: string,
    incorrect_answers: string[],
    answered?: string
}

export interface SystemState {
    questions: QuestionI[],
    loading: boolean
}