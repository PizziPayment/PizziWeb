export function UPDATE_ACCESS_TOKEN (state, accessToken) {
    state.accessToken = accessToken
}

export function UPDATE_REFRESH_TOKEN (state, refreshToken) {
    state.refreshToken = refreshToken
}

export function UPDATE_EXPIRATION_TOKEN (state, expirationToken) {
    state.expirationToken = expirationToken
}

export function UPDATE_USER_LOGGED_IN (state, userLoggedStatus) {
    state.userLoggedIn = userLoggedStatus
}

export function UPDATE_LANGUAGE (state, language) {
    state.language = language
}
export function UPDATE_DARK_MODE (state, isDarkTheme) {
    state.isDarkTheme = isDarkTheme
}

export function UPDATE_TUTORIAL_GIVEN (state, tutorialGiven) {
    state.tutorialGiven = tutorialGiven
}