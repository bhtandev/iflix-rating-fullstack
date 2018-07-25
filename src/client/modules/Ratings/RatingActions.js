import callApi from '../../util/apiCaller';

export const ADD_RATING = 'ADD_RATING';

export function addRating(rating) {
  return {
    type: ADD_RATING,
    rating,
  };
}

export function postRating(userId, contentId, rating) {
  return dispatch => callApi('rating', 'POST', { rating: { userId, contentId, rating } }).then((res) => {
    console.log('rating res', res);

    dispatch(addRating(res.rating));

    return res.rating;
  }).catch((error) => {
    console.log('postRating error', error);
  });
}

export function fetchRatingUsingContentIdAndUserId(userId, contentId) {
  return dispatch => callApi(`rating?userId=${userId}&contentId=${contentId}`).then((res) => {
    console.log('rating res', res);

    dispatch(addRating(res.rating));

    return res.rating;
  }).catch((error) => {
    console.log('fetchRatingUsingContentIdAndUserId error', error);
  });
}
