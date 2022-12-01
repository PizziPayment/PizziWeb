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

export function UPDATE_SHOP_INFOS(state, shopInfos) {
    state.shopInfos = {...shopInfos}
}

export function UPDATE_SHOP_DESCRIPTION(state, shopDescription) {
    state.shopInfos.description = shopDescription
}

export function UPDATE_SHOP_WEBSITE(state, shopWebsite) {
    state.shopInfos.website = shopWebsite
}

export function UPDATE_SHOP_INSTAGRAM(state, shopInstagram) {
    state.shopInfos.instagram = shopInstagram
}

export function UPDATE_SHOP_FACEBOOK(state, shopFacebook) {
    state.shopInfos.facebook = shopFacebook
}

export function UPDATE_SHOP_TWITTER(state, shopTwitter) {
    state.shopInfos.twitter = shopTwitter
}

export function UPDATE_SHOP_CATEGORIES(state, categories) {
    state.categories = categories
}

export function UPDATE_AVATAR_URL(state, avatarUrl) {
    state.avatarUrl = avatarUrl
}