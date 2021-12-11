// import Vue from 'vue'

export async function userLogin({ commit }, payload) {
  try {
    commit("UPDATE_ACCESS_TOKEN", payload.accessToken);
    commit("UPDATE_REFRESH_TOKEN", payload.refreshToken);
    commit("UPDATE_EXPIRATION_TOKEN", payload.expirationToken);
    commit("UPDATE_USER_LOGGED_IN", 1);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function userLogout({ commit }) {
  commit("UPDATE_USER_LOGGED_IN", 0);
  // clear tokens
  commit("UPDATE_ACCESS_TOKEN", null);
  commit("UPDATE_REFRESH_TOKEN", null);
  commit("UPDATE_EXPIRATION_TOKEN", null);
  commit("UPDATE_USER_LOGGED_IN", 1);
}
