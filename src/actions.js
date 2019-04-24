export function addAuthenticatedUser(payload) {
    return { type: "LOGGED_IN_USER", payload }
}
export function addCardToFav( payload ) {
    return { type: "ADD_CARD_TO_FAV", payload }
}