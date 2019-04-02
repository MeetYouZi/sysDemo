export default {
  changeToken(state, token) {
    state.token = token;
    try {
      localStorage.token = token;
    } catch (e) {}
  }
};
