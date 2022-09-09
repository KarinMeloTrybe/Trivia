import getFromAPI from '../../service/getFromAPI';

export const GET_TOKEN = 'GET_TOKEN';
export const SAVE_TOKEN = 'SAVE_TOKEN';

export function getToken(token) {
  return {
    type: GET_TOKEN,
    token,
  };
}

const saveToken = (token) => ({
  type: SAVE_TOKEN,
  token,
});

export const getTokenFromAPI = () => async (dispatch) => {
  const getTokenUser = await getFromAPI();
  dispatch(saveToken(getTokenUser));
};
