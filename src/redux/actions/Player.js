export const CHANGE_SCORE = 'CHANGE_SCORE';
export const CHANGE_LOGIN = 'CHANGE_NAME';
export const CHANGE_IMAGE = 'CHANGE_IMAGE';

export const scoreActions = () => ({
  type: CHANGE_SCORE,
});

export const loginActions = (login) => ({
  type: CHANGE_LOGIN,
  login,
});
