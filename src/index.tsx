import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Trivia from './Trivia/Trivia';
import { Provider } from 'react-redux'
import store from './redux/store'


ReactDOM.render(
  <Provider store={store}>
    <Trivia />
  </Provider>,
  document.getElementById('root')
);
