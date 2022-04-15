const INITIAL_STATE = {
  time: 30,
  resetTime: false,
};

const timer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SET_TIME':
    return { ...state,
      time: action.payload };
  case 'SET_RESET':
    return { ...state,
      resetTime: action.payload };
  case 'FULL_RESET':
    return INITIAL_STATE;
  default:
    return state;
  }
};

export default timer;
