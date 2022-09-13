export const CHANGE_SCORE = 'CHANGE_SCORE';
export const CHANGE_LOGIN = 'CHANGE_NAME';
export const CHANGE_IMAGE = 'CHANGE_IMAGE';
export const TIME_OUT_USER = 'TIME_OUT_USER';
export const REMANING_RESPONSE_TIME = 'REMANING_RESPONSE_TIME';
export const ID_MY_TIMER = 'ID_MY_TIMER';

export const scoreActions = (score) => ({
  type: CHANGE_SCORE,
  score,
});

export const loginActions = (login) => ({
  type: CHANGE_LOGIN,
  login,
});

export const timeOutUser = (bool) => ({
  type: TIME_OUT_USER,
  bool,
});

export const remaningResponseTime = (time) => ({
  type: REMANING_RESPONSE_TIME,
  time,
});

export const idMyTimer = (myTimer) => ({
  type: ID_MY_TIMER,
  myTimer,
});
