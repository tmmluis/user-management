const BASE_URL = 'https://reqres.in/api/';

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export type UserData = {
  data: User[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
};

export async function getUsers(page: number) {
  const response = await fetch(`${BASE_URL}users?page=${page}`);
  const data = (await response.json()) as UserData;
  return data;
}
