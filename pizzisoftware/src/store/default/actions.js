// import Vue from 'vue'

export async function userLogin ({ commit }, payload) {
    if (payload) {
        commit('UPDATE_ACCESS_TOKEN', payload.accessToken)
        commit('UPDATE_REFRESH_TOKEN', payload.refreshToken)
        commit('UPDATE_EXPIRATION_TOKEN', payload.expirationToken)
        commit('UPDATE_USER_LOGGED_IN', 1)
    }
}

export async function userLogout ({ commit }) {
    commit('UPDATE_USER_LOGGED_IN', 0)
}