const BASE_URL = 'https://reqres.in/api/';

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export async function getUsers(page: number) {
  try {
    const users = await fetch(`${BASE_URL}users?page=${page}`)
      .then((response) => response.json())
      .then((jsonData) => jsonData.data);
    return users as User[];
  } catch (error) {
    return null;
  }
}
