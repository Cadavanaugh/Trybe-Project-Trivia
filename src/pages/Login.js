import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  audioAction,
  fetchQuestionAction,
  fetchTokenAction,
  playerAction,
} from '../actions/actions';
import soundTrack2 from '../assets/audio/Pink Soldiers.mp3';
import soundTrack from '../assets/audio/Way Back Then.mp3';
import logo from '../assets/images/en-logo.png';
import playgroundBackground from '../assets/images/no-soldier-playgorund.jpg';
import soldiers from '../assets/images/soldiers.png';
import styles from './Login.module.css';

class Login extends Component {
  state = {
    name: '',
    email: '',
  }

  componentDidMount() {
    const { resetGame } = this.props;
    resetGame();
    const song = new Audio(soundTrack);
    song.volume = 0.1;
    song.loop = true;
    song.currentTime = 10.2;
    this.setState({ song });
  }

  validatePlayButton = () => {
    const { name, email } = this.state;
    return !(name.length && email.length);
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  dispatches = async () => {
    const { token, player, tokenState, questions, history, globalAudio } = this.props;
    const { email, name } = this.state;
    await token();
    player(email, name);
    await questions(tokenState);
    history.push('/game');
    const song = new Audio(soundTrack2);
    song.volume = 0.1;
    song.loop = true;
    song.play();
    globalAudio(song);
  };

  startSong(song) {
    if (song.paused) song.play();
  }

  stopSong(song) {
    if (!song.paused) {
      song.pause();
      song.currentTime = 10.2;
    }
  }

  render() {
    const { name, email, song } = this.state;
    return (
      <>
        <img
          src={ playgroundBackground }
          alt="Squid Game playground."
          className={ styles.background }
        />
        <main className={ styles.main }>
          <div className={ styles.soldierWrapper }>
            <img src={ soldiers } alt="Pink Soldier with square mask." />
            <div className={ styles.shadow } />
          </div>
          <form className={ styles.loginForm }>
            <img src={ logo } alt="Squid Game logo." className={ styles.logo } />
            <div className={ styles.inputs }>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Nome"
                value={ name }
                onChange={ this.handleChange }
                onClick={ () => { this.startSong(song); } }
                data-testid="input-player-name"
              />
              <input
                data-testid="input-gravatar-email"
                id="email"
                name="email"
                type="email"
                value={ email }
                onChange={ this.handleChange }
                onClick={ () => { this.startSong(song); } }
                placeholder="Email"
              />
            </div>
            <button
              data-testid="btn-play"
              type="button"
              disabled={ this.validatePlayButton() }
              onClick={ () => {
                this.dispatches();
                this.stopSong(song);
              } }
            >
              Play
            </button>
          </form>
          <div className={ styles.soldierWrapper2 }>
            <img src={ soldiers } alt="Pink Soldier with triangle mask." />
            <div className={ styles.shadow } />
          </div>
        </main>
      </>
    );
  }
}

Login.propTypes = {
  token: PropTypes.func.isRequired,
  player: PropTypes.func.isRequired,
  questions: PropTypes.func.isRequired,
  tokenState: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  globalAudio: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  tokenState: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  token: () => dispatch(fetchTokenAction()),
  player: (email, nome) => dispatch(playerAction(email, nome)),
  questions: (token) => dispatch(fetchQuestionAction(token)),
  globalAudio: (audio) => dispatch(audioAction(audio)),
  resetGame: () => dispatch({ type: 'FULL_RESET' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
