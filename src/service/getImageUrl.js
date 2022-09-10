const URL_BASE = 'https://www.gravatar.com/avatar/';

const getImageUrl = async (email) => {
  const urlImage = await fetch(URL_BASE + email);
  console.log(urlImage);
  return urlImage.url;
};

export default getImageUrl;
