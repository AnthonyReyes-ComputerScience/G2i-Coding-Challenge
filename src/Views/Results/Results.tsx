/**
 * @author Anthony Reyes
 * @file Result.tsx
 * View for the Result screen  
 */

import React from 'react';
import { QuestionI, ResultsI } from '../../types';
import "./Results.css";
import { ResultCard } from '../../components/ResultCard';

export const Results = (props: ResultsI) => {
    const isCorrectAnswer = (correct: string, answer: string) => correct === answer;
    const isCorrect = (question: QuestionI) => { 
        if (question.answered)
            { return isCorrectAnswer(question.correct_answer, question.answered)
        }
    };

    const totalCorrect = props.questions.filter((question: QuestionI) => isCorrect(question)).length
    return (
        <div className='Results-Wrapper'>
            <span className='Results-Header'><h1><b>Results</b></h1></span>
            <div className='Result-Cards-Wrapper'>
                <span className='Score-Span'>{"You Scored: "} {totalCorrect}/{props.questions.length} </span>
                {props.questions.map((question: QuestionI, i: number)=>{
                    return (
                        <ResultCard Question={question} QuestionNumber={i} key={i}/>
                    )
                })}
                <button className='play-again' onClick={props.nav}> Play again? </button>
            </div>
        </div>
    );
}