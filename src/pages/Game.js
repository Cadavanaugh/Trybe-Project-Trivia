import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTokenAction } from '../actions';
import Header from '../components/Header';
import Question from '../components/Question';
import { fetchQuestionAPI } from '../services/requestTrivia';
import Timer from '../components/Timer';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionsState: [],
    };
  }

  async componentDidMount() {
    const { newToken, token } = this.props;
    const request = await fetchQuestionAPI(token);
    this.setState({ questionsState: request.results });

    console.log(this.state);

    const ERROR_API = 3;
    if (request.response_code === ERROR_API) newToken();
  }

  render() {
    const { questionsState } = this.state;
    return (
      <>
        <Header />
        <Timer />
        {
          questionsState.filter((item, index) => index < 1)
            .map((item, index) => (
              <Question
                id={ index }
                key={ item.question }
                category={ item.category }
                text={ item.question }
                answerType={ item.type }
                level={ item.difficulty }
                correct={ item.correct_answer }
                incorrect={ item.incorrect_answers }
              />
            ))
        }
      </>
    );
  }
}

Game.propTypes = {
  token: PropTypes.string.isRequired,
  newToken: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token,
  questions: state.trivia.questions,
});

const mapDispatchToProps = (dispatch) => ({
  newToken: () => dispatch(fetchTokenAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
