import {
  CHANGE_SCORE,
  CHANGE_LOGIN,
  CHANGE_IMAGE,
  TIME_OUT_USER,
} from '../actions/Player';

const INITIAL_STATE = {
  score: 0,
  name: '',
  email: '',
  time: false,
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
      name: action.login.name,
      email: action.login.email,
    };
  case CHANGE_IMAGE:
    return {
      ...state,
      avatarImage: action.getData,
    };
  case TIME_OUT_USER:
    return {
      ...state,
      time: action.bool,
    };
  default:
    return state;
  }
};

export default playerReducer;
