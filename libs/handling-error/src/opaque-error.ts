import axios from 'axios';

export interface User {
  username: string;
  createdAt: string;
}

export async function signupUser(
  user: {
    username: string;
    password: string;
  },
  callbacks: {
    onDuplicateUsername: (username: string) => void;
    onWeakPassword: () => void;
  }
): Promise<User | undefined> {
  try {
    const { data } = await axios.post<User>('/user', user);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response != undefined) {
        switch (error.response.data.code) {
          case 8001:
            callbacks.onDuplicateUsername(user.username);
            return undefined;
          case 8002:
            callbacks.onWeakPassword();
            return undefined;
        }
      }
    }
    throw error;
  }
}

export async function main() {
  try {
    const user = await signupUser(
      { username: 'WhatTheFar', password: 'password123' },
      {
        onDuplicateUsername: (_username: string) => {
          // do something
        },
        onWeakPassword: () => {
          // do something
        },
      }
    );
    if (user == undefined) {
      throw new Error('signupUser should not return undefined');
    }

    console.log(user);
  } catch (error) {
    // do something
    // logs an error
  }
}
