import axios from 'axios';

export interface User {
  username: string;
  createdAt: string;
}

export async function signupUser(user: {
  username: string;
  password: string;
}): Promise<User> {
  try {
    const { data } = await axios.post<User>('/user', user);
    return data;
  } catch (error) {
    throw error;
  }
}
