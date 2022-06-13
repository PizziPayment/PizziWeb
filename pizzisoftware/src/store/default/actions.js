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
  // clear tokens
  commit("UPDATE_USER_LOGGED_IN", 0);
  commit("UPDATE_ACCESS_TOKEN", null);
  commit("UPDATE_REFRESH_TOKEN", null);
  commit("UPDATE_EXPIRATION_TOKEN", null);
}

export function setLanguage({ commit}, language ) {
  commit("UPDATE_LANGUAGE", language);
}
export async function setDarkTheme({ commit }, isDarkTheme) {
  commit("UPDATE_DARK_MODE", isDarkTheme);
}

export function setTutorialGiven({commit}, tutorialGiven) {
  commit("UPDATE_TUTORIAL_GIVEN", tutorialGiven)
}