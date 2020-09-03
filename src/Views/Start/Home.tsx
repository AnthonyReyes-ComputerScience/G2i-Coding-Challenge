import React from 'react';
import './Home.css'

export interface HomeI {

}

export const Home = (props: any) => {

    return (
        <div className='Home-Wrapper'>
            <span>
                Welcome to trivia!
            </span>
            <span>
                You will be presented with 10 true or false questions
            </span>
            <span>
                Can you score 100%?
            </span>
        </div>
    );
}