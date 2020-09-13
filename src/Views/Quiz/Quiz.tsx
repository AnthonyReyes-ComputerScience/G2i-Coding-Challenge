import React, { useState } from 'react';
import { QuestionI } from '../../types';
import './Quiz.css'
import { report } from 'process';

export const decode = (html: string) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

export interface QuizI {
    nav: (action: any) => void,
    questions: QuestionI[],
    questionNumber: number
}

/**
 * @description Fisher-Yates shuffle algorithm
 * @param arr any array
 * @private i = curent index, t = temporary index, ri = random index
 * added function for possible multiple choice (going to implement in the future)
 */
const shuffle = (arr: any[]) => {
    var i = arr.length, t, ri;
    while (0 !== i) {
        ri = Math.floor(Math.random() * i);
        i -= 1;
        test = arr[i];
        arr[i] = arr[ri];
        arr[ri] = t;
    }
    return arr;
}


export const Quiz = (props: QuizI) => {
    const [cardState,  cardSetState] = useState({
        cardClicked: false,
        answer: null
    })
    
    const {category, question, correct_answer, incorrect_answers, type} = props.questions[props.questionNumber];
    const footer: string = (props.questionNumber + 1).toString() + " of " + props.questions.length.toString()
    const PreClickBox = (<div className="Question-Box-PreClick" onClick={(e)=>{cardSetState((prev) => ({...prev, cardClicked:true}))}}> 
                            <span className="Question-Content">{decode(question)}</span> 
                         </div>)
    
    const PostClickBox = () => { 
        let allAnswers = []
        let listType: string;
        let buttonType: string;
        // Format Question Box for question types
        if(type === "boolean"){
            allAnswers = ["True", "False"];
            listType = "Answers-List-Bool";
            buttonType = "Boolean-Button";
        }
        else{
            allAnswers = shuffle([correct_answer, ...incorrect_answers]);
            listType = "Answers-List-Multi"
            buttonType = "Multi-Button"
        }

        return (
            <div className="Question-Box"> 
                <span className="Question-Content">{decode(question)}</span> 
                <div className={listType}>
                    {allAnswers.map((answer:string, i: number) => {return (
                        <button className={buttonType} key={i} onClick={(e) => reportAnswer(e)}>
                            {answer}
                        </button>
                    )})}
                </div>
                <button className='Next-Button' 
                        onClick={() => {
                            props.nav(cardState.answer);
                            cardSetState((prev) => ({ ...prev, answer: null, cardClicked: false }));
                        }} 
                        disabled={cardState.answer === null}> 
                    {(props.questionNumber + 1 === props.questions.length) || 'Next Question'}
                    {(props.questionNumber + 1 !== props.questions.length) || 'Results'}
                </button>
            </div>)}
    const reportAnswer = (e: any) => {
        e.persist()
        // console.log(e.target.childNodes[0]);
        cardSetState((prev)=>({...prev, answer: e.target.childNodes[0].data}))
    }
    return (
        <div className="Quiz-Wrapper">
            <div className="Question-Header-Wapper">
                <span className="Question-Header">{category}</span>
            </div>
                {cardState.cardClicked || PreClickBox}
                {!cardState.cardClicked || PostClickBox()}
            <div className="Question-Number-Wrapper">
                <span className="Question-Number">{footer}</span>
            </div>
        </div>
    );
}
