import { USER_LOGGEDIN, USER_LOGGEDOUT } from '../Actions/actionTypes'

export const userReducer = (
  state = {
    logged: false,
    userId: 0,
    username: '',
    firstname: '',
    lastname: ''
  },
  action) => {

  switch (action.type) {
    case USER_LOGGEDIN:
      return (
        {
          logged: action.logged,
          userId: action.user.userId,
          username: action.user.username,
          firstname: action.user.firstname,
          lastname: action.user.lastname
        }
      );
    case USER_LOGGEDOUT:
      return (
        {
          logged: action.logged,
          userId: 0,
          username: '',
          firstname: '',
          lastname: ''
        }
      );
    default:
      return state;
  };
};
