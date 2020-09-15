/**
 * @author Anthony Reyes
 * @file NotFound.tsx
 * Made to catch all bad URLs and future API 404s when expanding.
 */

import React from 'react';
import './NotFound.css'

export const NotFound = () => {
    return (
        <div className='Not-Found'>
            <a href='./' className='link-to-home'><b>Sorry Something went wrong :( Please click here.</b></a>
        </div>
    );
}