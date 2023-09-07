export type UserCredentials = {
  email: string;
  password: string;
};

const BASE_URL = 'https://reqres.in/api/';

export async function loginUser(credentials: UserCredentials) {
  const response = await fetch(`${BASE_URL}login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  return data;
}
