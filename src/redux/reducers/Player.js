import { CHANGE_SCORE, CHANGE_LOGIN, CHANGE_IMAGE } from '../actions/Player';

const INITIAL_STATE = {
  score: 0,
  name: '',
  avatarImage: '',
  email: '',
};
const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CHANGE_SCORE:
    return {
      ...state,
      score: action.score,
    };
  case CHANGE_LOGIN:
    return {
      ...state,
      namePlayer: action.login.name,
      email: action.login.email,
    };
  case CHANGE_IMAGE:
    return {
      ...state,
      avatarImage: action.getData,
    };
  default:
    return state;
  }
};

export default playerReducer;
