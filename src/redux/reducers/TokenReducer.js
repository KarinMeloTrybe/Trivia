import { SAVE_TOKEN } from '../actions/tokens';

const INNITIAL_STATE = {
  token: '',
};

function userToken(state = INNITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_TOKEN: return {
    ...state,
    token: action.token,
  };
  default: return state;
  }
}

export default userToken;
