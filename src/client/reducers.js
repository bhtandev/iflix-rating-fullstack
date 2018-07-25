import { combineReducers } from 'redux';

import app from './modules/App/AppReducer';
import contents from './modules/Contents/ContentReducer';
import users from './modules/Users/UserReducer';
import ratings from './modules/Ratings/RatingReducer';

export default combineReducers({
  app,
  users,
  contents,
  ratings,
});
