const API_URL = '/api/v1/';

export default function callApi(queryString, method = 'GET', body, options) {
  return fetch(`${API_URL}${queryString}`, method === 'POST' ? {
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  } : undefined)
    .then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
    .then(
      response => response,
    );
}
