import React, { useState } from 'react';
import './Trivia.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Home} from "../Views/Start/Home"
import {Quiz} from "../Views/Quiz/Quiz"
import {Results } from '../Views/Results/Results';
import {NotFound } from '../Views/NotFound/NotFound'
import { connect, ConnectedProps } from 'react-redux'
import * as actionDispatcher from "../redux/actions"

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
}

export interface APIAttributesI {
  amount: number,
  category?: string,
  difficulty?: string,
  type?: string
}

const Trivia = (props: Props) => {
  const [playState, setPlayState] = useState({
    screen: "home",
    questionNumber: 0
  });

  // Structured for Scalability
  const amount:number = 10;
  const category = undefined;
  const difficulty = "hard";
  const type = "boolean";
  let APIAttributes: APIAttributesI = {
    amount,
    category,
    difficulty,
    type,
  }

  /**
   * @param action answers or other actions. can be filtered later if added
   * @todo question nav
   */
  const navigationHandler = async (action: any = null) => {
      switch (playState.screen) {
        case "home": {
          // Navigation to quiz
          console.log("entering nav");
          const playingCallback = () => setPlayState((prev) => ({ ...prev, questionNumber: 0, screen: "playing" }))

          await props.fetchQuestions(APIAttributes, playingCallback)
          console.log("after fetch line");
          return;
        }
        case "playing": {
          props.questionAnswered(playState.questionNumber, action);

          if ((playState.questionNumber + 1 < props.questions.length)){
            setPlayState((prev) => ({ ...prev, questionNumber: playState.questionNumber + 1}))
          }
          else{
            setPlayState((prev) => ({...prev, screen: "results"}))
          }
          console.log(props.questions);
          return;
        }
        case "results": {
          setPlayState(({ screen: "home", questionNumber: 0 }))
        }
      }
  }

  return (
    <div className="Trivia-Wrapper">
      <Router>
        <Switch>
          <Route exact path="/">
            {playState.screen === "home" && <Home nav={navigationHandler}/>}
            {playState.screen === "playing" && <Quiz nav={navigationHandler} questions={props.questions} questionNumber={playState.questionNumber}/>}
            {playState.screen === "results" && <Results nav={navigationHandler} questions={props.questions} />}
          </Route>
          <Route path="*">
            <NotFound/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

//TYPE THIS
const mapDispatchToProps = (dispatch: any) => {
  return ({
    questionAnswered: (questionNumber: number, answer: string) => dispatch(actionDispatcher.answerQuestion(questionNumber, answer)),
    fetchQuestions: (attributes: APIAttributesI, cb: () => void) => dispatch(actionDispatcher.fetchQuestions(attributes, cb))
  })
}

const mapStateToProps = (state: any) => {
  return ({
    questions: state.questions, 
    loading: state.loading
  })
}

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Trivia);
