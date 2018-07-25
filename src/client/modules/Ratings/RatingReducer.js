import { ADD_RATING, ADD_RATINGS } from './RatingActions';

//TODO remove
// Initial State
const initialState = { data: [], dataById: {} };

const RatingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RATING:
      return {
        data: [action.rating, ...state.data],
      };
    default:
      return state;
  }
};

/* Selectors */

// Get all ratings
export const getRatings = state => state.ratings.data;

// Get rating by id
export const getRating = (state, id) => state.ratings.data.filter(rating => rating._id === id)[0];

export default RatingReducer;
