import { api } from '../api';

export async function request(input) {
  try {

    // auth first
    const authRequest = await auth(input);

    const response = await fetch(authRequest);

    if (response.ok) {
      return {
        response,
        error: null,
      };
    }

    return {
      response: null,
      error: {
        response,
        networkError: null,
        variant: 'failed-response'
      }
    };
  } catch (error) {
    return {
      response: null,
      error: {
        response: null,
        networkError: error,
        variant: 'network-error'
      }
    };
  }
}

async function auth(request) {
  const authResponse = await fetch(api.auth());

  if (!authResponse.ok) {
    return {
      response: null,
      error: {
        authResponse,
        networkError: null,
        variant: 'failed-auth'
      }
    };
  }

  const authData = await authResponse.json();
  const token = authData.access_token;
  request.headers.set('Authorization', 'Bearer ' + token);

  return request;
}