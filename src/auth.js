function auth(state={authenticated: false}, action) {
    switch (action.type) {
        case 'LOGIN':
            return Object.assign({}, state, {authenticated: true})
        case 'LOGOUT':
            return Object.assign({}, state, {authenticated: false})
        default:
            return state;
    }
}

function login(firebaseUser) {
    return {
        type: 'LOGIN'
    }

}

function logout() {
    return {
        type: 'LOGOUT'
    }

}

export {auth, login, logout};