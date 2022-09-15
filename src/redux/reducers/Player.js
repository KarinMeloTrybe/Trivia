import {
  CHANGE_SCORE,
  CHANGE_LOGIN,
  CHANGE_IMAGE,
  TIME_OUT_USER,
  REMANING_RESPONSE_TIME,
  ID_MY_TIMER,
  CHANGE_TIMER,
  RESTART_TIMER,
  CHANGE_ASSERTIONS,
  RESTART_SCORE,
} from '../actions/Player';

const INITIAL_STATE = {
  score: 0,
  name: '',
  email: '',
  time: false,
  remaningTime: 0,
  myTimer: 0,
  secondsTimer: 30,
  assertions: 0,
};
const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CHANGE_SCORE: return {
    ...state,
    score: action.score + state.score,
  };
  case RESTART_SCORE: return {
    ...state,
    score: 0,
    assertions: 0,
  };
  case CHANGE_ASSERTIONS: return {
    ...state,
    assertions: state.assertions + 1,
  };
  case CHANGE_LOGIN: return {
    ...state,
    name: action.login.name,
    email: action.login.email,
  };
  case CHANGE_IMAGE: return {
    ...state,
    avatarImage: action.getData,
  };
  case TIME_OUT_USER: return {
    ...state,
    time: action.bool,
  };
  case REMANING_RESPONSE_TIME: return {
    ...state,
    remaningTime: action.time,
  };
  case ID_MY_TIMER: return {
    ...state,
    myTimer: action.myTimer,
  };
  case CHANGE_TIMER: return {
    ...state,
    secondsTimer: state.secondsTimer - 1,
  };
  case RESTART_TIMER: return {
    ...state,
    secondsTimer: 30,
  };
  default: return state;
  }
};

export default playerReducer;
