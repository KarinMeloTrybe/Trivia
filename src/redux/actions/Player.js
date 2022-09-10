import getImageUrl from '../../service/getImageUrl';

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

const imageActions = (getData) => ({
  type: CHANGE_IMAGE,
  getData,
});

export const getAvatarImage = (email) => async (dispatch) => {
  const imageUrl = await getImageUrl(email);
  dispatch(imageActions(imageUrl));
};
