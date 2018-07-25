import callApi from '../../util/apiCaller';


export const ADD_CONTENTS = 'ADD_CONTENTS';
export const UPDATE_CONTENT = 'UPDATE_CONTENT';


export function addContents(contents) {
  return {
    type: ADD_CONTENTS,
    contents,
  };
}

export function updateContent(content) {
  return {
    type: UPDATE_CONTENT,
    id: content._id,
    content,
  };
}

export function fetchContents() {
  return dispatch => callApi('contents').then((res) => {
    dispatch(addContents(res.contents));
  });
}

export function fetchContent(id) {
  return dispatch => callApi(`contents/${id}`).then(res => dispatch(updateContent(res.content)));
}
