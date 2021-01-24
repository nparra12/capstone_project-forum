import {USER_LOGGEDIN, USER_LOGGEDOUT } from './actionTypes'

// USER_LOGGEDIN
export const userLoggedIn = (user) => {
    return {
        type: USER_LOGGEDIN,
        logged: true,
        user: user
    };
};


// USER_LOGGEDOUT
export const userLoggedOut = () => {
    return {
        type: USER_LOGGEDOUT,
        logged: false,
    };
};