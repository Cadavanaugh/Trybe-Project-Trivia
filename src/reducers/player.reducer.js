const INITIAL_STATE = {
  name: '',
  assertions: 0,
  email: '',
  score: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SET_EMAIL':
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
    };
  case 'SET_SCORE':
    return {
      ...state,
      assertions: action.payload.assertions,
      score: action.payload.score + state.score,
    };
  case 'FULL_RESET':
    return INITIAL_STATE;
  default:
    return state;
  }
};

export default player;
