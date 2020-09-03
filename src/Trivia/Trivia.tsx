import React from 'react';
import './Trivia.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HomeI, Home} from "../Views/Start/Home"
import { QuizI, Quiz} from "../Views/Quiz/Quiz"
import { ResultsI, Results } from '../Views/Results/Results';
import { NotFoundI, NotFound } from '../Views/NotFound/NotFound'


function Trivia() {
  return (
    <div className="Trivia-Wrapper">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/in-game">
            <Quiz />
          </Route>
          <Route exact path="/results">
            <Results />
          </Route>
          <Route path="*">
            <NotFound/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default Trivia;
