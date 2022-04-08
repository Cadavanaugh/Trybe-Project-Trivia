import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { decode } from 'he';
import { scoreAction, nextAction } from '../actions/actions';

class Buttons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // time: 30,
      showNext: false,
    };
  }

  handleClick = ({ target }) => {
    console.log(target);
    const element = target.getAttribute('data-testid');
    console.log(element);
    if (element === 'correct-answer') {
      target.style.border = '3px solid rgb(6, 240, 15)';
      this.handleCorrectAnswer();
    } else {
      target.style.border = '3px solid rgb(255, 0, 0)';
      const right = document.querySelector('.correct-answer');
      right.style.border = '3px solid rgb(6, 240, 15)';
      // this.handleWrongAnswer();
    }

    this.showNextButton();

    const wrong = document.querySelectorAll('.wrong-answer');
    wrong.forEach((item) => {
      item.style.border = '3px solid rgb(255, 0, 0)';
    });
  }

  handleCorrectAnswer = () => {
    console.log('Entrou no handle correct');
    const { assertions } = this.state;
    const { level, scoreDispatch } = this.props;

    // this.setState({ random: false });

    let difficulty = 0;
    const number = 10;
    const time = 5;
    const tree = 3;

    if (level === 'hard') {
      difficulty = tree;
    } else if (level === 'medium') {
      difficulty = 2;
    } else {
      difficulty = 1;
    }

    console.log('Time: ', time);

    const newScore = (number + (time * difficulty));
    console.log('newScore: ', newScore);
    const newAssertions = assertions + 1;
    scoreDispatch(newAssertions, newScore);
  }

  showNextButton = () => {
    this.setState({
      showNext: true,
    });
  }

  handleClickNext = () => {
    const { nextDispatch } = this.props;
    nextDispatch();
  }

  render() {
    const { showNext } = this.state;
    const {
      correct,
      incorrect } = this.props;
    // const { random } = this.state;
    // const { style } = this.state;
    const options = [...incorrect, correct];
    console.log('Render Questions');
    return (
      <div data-testid="answer-options">
        {
          // Embaralhar array: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
          // Transformar elementos HTML em array: https://stackoverflow.com/questions/2735067/how-to-convert-a-dom-node-list-to-an-array-in-javascript
          [...options
            .map((alternativa, index) => (
              index === options.length - 1
                ? (
                  <button
                    key={ alternativa }
                    data-testid="correct-answer"
                    className="correct-answer"
                    type="button"
                    onClick={ this.handleClick }
                  >
                    {decode(alternativa)}
                  </button>
                )
                : (
                  <button
                    key={ alternativa }
                    data-testid={ `wrong-answer-${index}` }
                    className="wrong-answer"
                    type="button"
                    onClick={ this.handleClick }
                  >
                    {decode(alternativa)}
                  </button>
                )
            ))]
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
        }
        {
          showNext && (
            <button
              id="next-btn"
              data-testid="btn-next"
              type="button"
              onClick={ this.handleClickNext }
            >
              Next
            </button>
          )
        }
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//   time: state.timer.time,
// });

Buttons.propTypes = {
  correct: PropTypes.string.isRequired,
  incorrect: PropTypes.arrayOf(PropTypes.any).isRequired,
  level: PropTypes.string.isRequired,
  scoreDispatch: PropTypes.func.isRequired,
  nextDispatch: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  scoreDispatch: (assertions, score) => dispatch(scoreAction(assertions, score)),
  nextDispatch: () => dispatch(nextAction()),
});

export default connect(null, mapDispatchToProps)(Buttons);
