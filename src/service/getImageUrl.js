const URL_BASE = 'https://www.gravatar.com/avatar/';

const getImageUrl = async (email) => {
  const response = await fetch(URL_BASE + email);
  const urlImage = await response.json();
  return urlImage;
};

export default getImageUrl;
