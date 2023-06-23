export const getToken = () => {
  return localStorage.getItem('token');
};

export const setToken = (newToken: string) => {
  return localStorage.setItem('token', newToken);
};

export const removeItemToken = () => {
  localStorage.removeItem('token');
};
