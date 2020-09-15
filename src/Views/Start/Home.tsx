/**
 * @author Anthony Reyes
 * @file Home.tsx
 * View for the start screen
 */

import React from 'react';
import './Home.css'
import { HomeI } from '../../types'

/**
 * 
 * @param props nav() is the navigation function given by the higher order component
 * 
 * nav takes no args in this component
 */
export const Home = (props: HomeI) => {
    const beginHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        props.nav()
    }
    return (
        <div className='Home-Wrapper'>
            <div className='Home-Container'>
                <>
                <span className='Header'>
                    <b>Welcome to trivia!</b>
                </span>
                </>
                <>
                <span className='Prompt1'>
                    You will be presented with 10 true or false questions
                </span>
                </>
                <>
                <span className='Prompt2'>
                    Can you score 100%?
                </span>
                </>
                <>
                <button className="begin-button" onClick={beginHandler}>
                    Begin
                </button>
                </>
            </div>
        </div>
    );
}