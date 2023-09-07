export type UserCredentials = {
  email: string;
  password: string;
};

type SuccessResponse = {
  token: string;
};

type ErrorResponse = {
  error: string;
};

type LoginResponse = SuccessResponse | ErrorResponse;

export function isLoginSuccessResponse(
  res: LoginResponse
): res is SuccessResponse {
  return Object.prototype.hasOwnProperty.call(res, 'token');
}

const BASE_URL = 'https://reqres.in/api/';

export async function loginUser(credentials: UserCredentials) {
  const response = await fetch(`${BASE_URL}login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  const data = (await response.json()) as LoginResponse;
  return data;
}
