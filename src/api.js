import { mergePathname } from './utils/mergePathname';

const BASENAME = process.env.REACT_APP_CAMUNDA_TASKLIST_BASE_URL;
const AUTH_URL = process.env.REACT_APP_ZEEBE_AUTHORIZATION_SERVER_URL;
const CLIENT_ID = process.env.REACT_APP_ZEEBE_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_ZEEBE_CLIENT_SECRET;
const AUDIENCE = process.env.REACT_APP_TASKLIST_TOKEN_AUDIENCE;

const BASE_REQUEST_OPTIONS = {
  mode: 'cors'
};

const api = {
  auth: () => {
    return new Request(AUTH_URL, {
      method: 'POST',
      body: JSON.stringify({
        'grant_type': 'client_credentials',
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'audience': AUDIENCE
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  },
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
  getForm: ({
    id,
    processDefinitionKey,
  }) => {
    return new Request(mergePathname(
      BASENAME,
      `/v1/forms/${id}?processDefinitionKey=${processDefinitionKey}`
    ), {
      ...BASE_REQUEST_OPTIONS,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  },
  searchTasks: (body) => {
    return new Request(mergePathname(BASENAME, '/v1/tasks/search'), {
      ...BASE_REQUEST_OPTIONS,
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'x-is-polling': 'true'
      },
    });
  }
};

export { api };
