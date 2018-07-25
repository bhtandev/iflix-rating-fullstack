import callApi from '../../util/apiCaller';


export const ADD_USERS = 'ADD_USERS';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export function addUsers(users) {
  return {
    type: ADD_USERS,
    users,
  };
}

export function setCurrentUser(id) {
  return {
    type: SET_CURRENT_USER,
    id,
  };
}

export function fetchUsers() {
  return dispatch => callApi('users').then((res) => {
    dispatch(addUsers(res.users));
  });
}
