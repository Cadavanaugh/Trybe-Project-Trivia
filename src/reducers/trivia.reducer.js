const INITIAL_STATE = {
  questions: {},
};

const trivia = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'FETCH_QUESTIONS_SUCCESS':
    return {
      ...state,
      questions: action.payload,
    };
  case 'AUDIO':
    return {
      ...state,
      audio: action.payload,
    };
  case 'FULL_RESET':
    return INITIAL_STATE;
  default:
    return state;
  }
};

export default trivia;
