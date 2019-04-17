export default {
  changeToken(state, token) {
    state.token = token;
    try {
      localStorage.token = token;
    } catch (e) {}
  },
  changAuth(state, auth) {
    state.auth = auth;
    try {
      localStorage.auth = auth;
    } catch (e) {}
  }
};
