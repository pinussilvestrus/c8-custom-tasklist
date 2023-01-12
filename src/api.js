import {mergePathname} from './utils/mergePathname';

const BASENAME = process.env.REACT_APP_CAMUNDA_TASKLIST_BASE_URL;

const BASE_REQUEST_OPTIONS = {
  credentials: 'include',
  mode: 'cors'
};

const api = {
  login: (body) => {
    return new Request(mergePathname(BASENAME, '/api/login'), {
      ...BASE_REQUEST_OPTIONS,
      method: 'POST',
      body: new URLSearchParams(body).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  },
  logout: () =>
    new Request(mergePathname(BASENAME, '/api/logout'), {
      ...BASE_REQUEST_OPTIONS,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  getCurrentUser: () =>
    new Request(mergePathname(BASENAME, '/v1/internal/users/current'), {
      ...BASE_REQUEST_OPTIONS,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  searchTasks: (body) => {
    return new Request(mergePathname(BASENAME, '/v1/tasks/search'), {
      ...BASE_REQUEST_OPTIONS,
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'x-is-polling': 'true',
      },
    });
  }
};

export {api};
