/**
 * @author Anthony Reyes
 * @file ResultCard.tsx
 * 
 * A component that handles the individual question results
 * and feedback (flipping the card)
 */

import React, {useState} from 'react';
import { QuestionI, ResultCardI} from '../types'
import {decode} from '../Views/Quiz/Quiz'

export const ResultCard = (props: ResultCardI) =>
{  
    const [cardState, setCardState] = useState({
        toggleFlip: false,
    });
    const resultDisplay = (question: QuestionI, questionNumber: number) => {
        let tag: string = '';
        const isCorrect = (correct: string, answer: string) => correct === answer;
        if (question.answered) {
            if (isCorrect(question.correct_answer, question.answered)) {
                tag = 'correct';
            }
            else {
                tag = 'incorrect';
            }
        }
        else {
            console.error("Error, Question left unanswered unintentionally. Apologies if you see this!");
        }
        return (
            <div className={'Result-Question-' + tag} key={questionNumber}>
                <span className='Result-Q-Content'>
                    {(questionNumber).toString() + '. '}
                    {decode(question.question)}
                </span>
                <div className='user-answered'>Answered: {question.answered}</div>

            </div>
        );
    }
    const resultFeedback = (question: QuestionI, questionNumber: number) => {
        return (
            <div className='Result-Feedback' key={props.QuestionNumber}>
                <span className='Result-Q-Content'>
                    {(questionNumber).toString() + '. '}
                    {decode(question.question)}
                </span>
                <div className='user-answered'>Answered: {question.answered}</div>
                <div className='correct-answer'>{decode(props.Question.correct_answer)} </div>
                {props.Question.incorrect_answers.map((ia: string, z: number) => {
                    return (
                        <div key={z} className='incorrect-answer'>{ia}</div>
                    )
                })}
            </div>
        )
    }
    return (
        <div key={props.QuestionNumber} className='question-result-card'
            onClick={()=>{setCardState((prev)=>({...prev, toggleFlip: !cardState.toggleFlip}))}}>
            {cardState.toggleFlip || resultDisplay(props.Question, props.QuestionNumber + 1)}
            {!cardState.toggleFlip || resultFeedback(props.Question, props.QuestionNumber + 1)}
        </div>
    );

}