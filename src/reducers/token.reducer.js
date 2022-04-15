const INITIAL_STATE = '';

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'FETCH_TOKEN_REQUEST_SUCCESS':
    return action.payload;
  case 'FETCH_TOKEN_REQUEST_FAILURE':
    return action.payload;
  case 'FULL_RESET':
    return INITIAL_STATE;
  default:
    return state;
  }
};

export default token;
