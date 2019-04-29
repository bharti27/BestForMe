export function addAuthenticatedUser(payload) {
    return { type: "LOGGED_IN_USER", payload }
}
export function addCardToFav( payload ) {
    return { type: "ADD_CARD_TO_FAV", payload }
}
export function removeCardFromFav( payload ) {
    return { type: "REMOVE_CARD_FROM_FAV", payload }
}
export function createNewUser( payload ) {
    return { type: "CREATE_NEW_USER", payload }
}