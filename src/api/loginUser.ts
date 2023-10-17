export type UserCredentials = {
  email: string;
  password: string;
};

const BASE_URL = 'https://reqres.in/api/';

export async function loginUser(
  credentials: UserCredentials
): Promise<string | null> {
  try {
    const data = await fetch(`${BASE_URL}login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    }).then((response) => response.json());
    if (data.error) {
      return null;
    }
    return data.token;
  } catch (error) {
    return null;
  }
}
