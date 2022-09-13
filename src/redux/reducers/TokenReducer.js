import { INVALID_TOKEN, IS_FETCHING, SAVE_TOKEN } from '../actions/tokens';

const INNITIAL_STATE = {
  token: '',
  isFetching: false,
  invalidToken: false,
};

function userToken(state = INNITIAL_STATE, action) {
  switch (action.type) {
  case INVALID_TOKEN: return {
    ...state,
    invalidToken: action.bool,
  };
  case IS_FETCHING: return {
    ...state,
    isFetching: action.bool,
  };

  case SAVE_TOKEN: return {
    ...state,
    token: action.token,
  };
  default: return state;
  }
}

export default userToken;
