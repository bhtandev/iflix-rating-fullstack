import {
  ADD_CONTENTS, UPDATE_CONTENT
} from './ContentActions';

const initialState = {
  data: [],
};

export default function moviesReducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case UPDATE_CONTENT:
      return {
        ...state,
        data: state.data.map((content) => {
          if (content._id == action.id) {
            return { ...content, ...action.content };
          }
          return content;
        })
      };
    case ADD_CONTENTS:
      return {
        ...state,
        data: action.contents,
      };
    default:
      return state;
  }
}

export const getContents = state => state.contents.data;

export const getContent = (state, id) => state.contents.data.filter(content => content._id === id)[0];

