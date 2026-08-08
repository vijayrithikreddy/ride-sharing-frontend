const TOKEN_KEY = "authToken";

export const saveAccessToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const saveRefreshToken = (token: string) => {
  localStorage.setItem("refreshToken", token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isLoggedIn = () => {
  return !!getToken();
};