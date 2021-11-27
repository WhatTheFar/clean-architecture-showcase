import axios from 'axios';

export interface User {
  username: string;
  createdAt: string;
}

export class DuplicateUsernameError extends Error {
  constructor(public readonly username: string, message?: string) {
    super(message);
    this.name = 'DuplicateUsernameError';
  }
}

export class WeakPasswordError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'WeakPasswordError';
  }
}

export async function signupUser(user: {
  username: string;
  password: string;
}): Promise<User> {
  try {
    const { data } = await axios.post<User>('/user', user);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response != undefined) {
        switch (error.response.data.code) {
          case 8001:
            throw new DuplicateUsernameError(user.username);
          case 8002:
            throw new WeakPasswordError();
        }
      }
    }
    throw error;
  }
}

export async function main() {
  try {
    const user = await signupUser({
      username: 'WhatTheFar',
      password: 'password123',
    });
    console.log(user);
  } catch (error) {
    if (error instanceof DuplicateUsernameError) {
      // do something
    } else if (error instanceof WeakPasswordError) {
      // do something
    } else {
      // do something
      // logs an error
    }
  }
}
