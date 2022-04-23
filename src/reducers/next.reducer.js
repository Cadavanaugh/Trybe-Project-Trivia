const INITIAL_STATE = {
  index: 0,
  showMeNextBtn: false,
};

const next = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SET_NEXT':
    return {
      ...state,
      index: state.index + 1,
    };
  case 'FULL_RESET':
    return INITIAL_STATE;
  case 'SHOW_NEXT':
    return {
      ...state,
      showMeNextBtn: action.payload,
    };
  default:
    return state;
  }
};

export default next;
