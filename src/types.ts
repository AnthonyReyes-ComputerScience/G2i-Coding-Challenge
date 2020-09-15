/**
 * @author Anthony Reyes
 * @file types.ts
 * Provide types
 */

/* Types for System Actions */
export const FETCH_QUESTIONS = 'FETCH_QUESTIONS';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';

export interface Fetch_QuestionsI {
    type: typeof FETCH_QUESTIONS,
    questions: QuestionI[]
} 

export interface Answer_QuestionI {
    type: typeof ANSWER_QUESTION,
    questionNumber: number,
    answer: string
}

export type SystemActionTypes = Fetch_QuestionsI | Answer_QuestionI;

export interface SystemState {
    questions: QuestionI[],
    loading: boolean
}
/*--------------------------*/

/* General Types */ 
export interface APIAttributesI {
    amount: number,
    category?: string,
    difficulty?: string,
    type?: string
}

export interface QuestionI {
    category: string,
    type: string,
    difficulty: string,
    question: string,
    correct_answer: string,
    incorrect_answers: string[],
    answered?: string
}
/*----------------*/

/* Simple Component Types */
export interface ResultCardI {
    Question: QuestionI,
    QuestionNumber: number
}
/*------------------------*/

/* Types for View Components */
export interface HomeI {
    nav: () => void
}

export interface QuizI {
    nav: (action: any) => void,
    questions: QuestionI[],
    questionNumber: number
}

export interface ResultsI {
    nav: (action: any) => void
    questions: QuestionI[]
}
/*--------------------------*/