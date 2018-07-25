import { ADD_USERS, SET_CURRENT_USER } from './UserActions';

// Initial State
const initialState = { data: [], dataById: {}, currentUser: undefined };

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USERS:
      return {
        data: action.users,
        currentUser: action.users[0],
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: state.data.filter(user => user._id === action.id)[0],
      };
    default:
      return state;
  }
};

/* Selectors */

// Get all users
export const getUsers = state => state.users.data;

// Get user by id
export const getUser = (state, id) => state.users.data.filter(user => user._id === id)[0];

export const getCurrentUser = state => state.users.currentUser;

export default UserReducer;
