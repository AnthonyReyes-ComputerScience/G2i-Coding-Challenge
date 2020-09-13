import React from 'react';
import { QuestionI } from '../../types';
import {decode} from '../Quiz/Quiz';

export interface ResultsI {
    nav: (action: any) => void
    questions: QuestionI[]
}

export const Results = (props: ResultsI) => {

    return (
        <div>
            {props.questions.map((question: QuestionI, i: number)=>{
                return (
                <div>
                    <div>
                        {i}.
                        {decode(question.question)}
                    </div>
                    <div>
                        + {decode(question.correct_answer)}
                        {question.incorrect_answers.map((ia: string)=>{return(
                            <div>{ia}</div>
                        )})}
                            <div>ANSWERED {question.answered}</div>
                    </div>
                </div>)
            })}
        </div>
    );
}