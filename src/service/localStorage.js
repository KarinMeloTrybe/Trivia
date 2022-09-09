export const saveToLocalStorage = (token) => {
  localStorage.setItem('token', token);
};

export const getFromLocalStorage = () => {
  localStorage.getItem('token');
};
