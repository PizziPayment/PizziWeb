export function UPDATE_ACCESS_TOKEN (state, accessToken) {
    state.accessToken = accessToken
}

export function UPDATE_REFRESH_TOKEN (state, refreshToken) {
    state.refreshToken = refreshToken
}

export function UPDATE_EXPIRATION_TOKEN (state, expirationToken) {
    state.expirationToken = expirationToken
}