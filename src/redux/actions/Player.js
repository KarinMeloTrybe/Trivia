export const CHANGE_SCORE = 'CHANGE_SCORE';
export const CHANGE_LOGIN = 'CHANGE_NAME';
export const CHANGE_IMAGE = 'CHANGE_IMAGE';
export const TIME_OUT_USER = 'TIME_OUT_USER';

export const scoreActions = () => ({
  type: CHANGE_SCORE,
});

export const loginActions = (login) => ({
  type: CHANGE_LOGIN,
  login,
});

export const timeOutUser = (bool) => ({
  type: TIME_OUT_USER,
  bool,
});
