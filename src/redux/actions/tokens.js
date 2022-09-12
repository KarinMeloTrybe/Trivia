import getFromAPI from '../../service/getFromAPI';

export const GET_TOKEN = 'GET_TOKEN';
export const SAVE_TOKEN = 'SAVE_TOKEN';
export const IS_FETCHING = 'IS_FETCHING';
export const INVALID_TOKEN = 'INVALID_TOKEN';

export function getToken(token) {
  return {
    type: GET_TOKEN,
    token,
  };
}

export const isFetchingAction = (bool) => ({
  type: IS_FETCHING,
  bool,
});

export const invalidTokenAction = (bool) => ({
  type: INVALID_TOKEN,
  bool,
});

const saveToken = (token) => ({
  type: SAVE_TOKEN,
  token,
});

export const getTokenFromAPI = () => async (dispatch) => {
  dispatch(isFetchingAction(true));
  const getTokenUser = await getFromAPI();
  dispatch(saveToken(getTokenUser));
  if (!getTokenUser) dispatch(isFetchingAction(false));
};
