import React from 'react';
import './Home.css'

export interface HomeI {
    nav: () => void
}

export const Home = (props: HomeI) => {
    const beginHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        props.nav()
    }
    return (
        <div className='Home-Wrapper'>
            <span className='Header'>
                <b>Welcome to trivia!</b>
            </span>
            <span className='Prompt1'>
                You will be presented with 10 true or false questions
            </span>
            <span className='Prompt2'>
                Can you score 100%?
            </span>
            <button className="begin-button" onClick={beginHandler}>
                Begin
            </button>
        </div>
    );
}