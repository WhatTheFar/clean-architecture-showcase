import axios from 'axios';

export interface User {
  username: string;
  createdAt: string;
}

export type UnknownError = 'UnknownError';

export type SignupError = 'DuplicateUsernameError' | 'WeakPasswordError';

export async function signupUser(user: {
  username: string;
  password: string;
}): Promise<User | SignupError | UnknownError> {
  try {
    const { data } = await axios.post<User>('/user', user);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response != undefined) {
        switch (error.response.data.code) {
          case 8001:
            return 'DuplicateUsernameError';
          case 8002:
            return 'WeakPasswordError';
        }
      }
    }
    return 'UnknownError';
  }
}

export async function main() {
  const signupResp = await signupUser({
    username: 'WhatTheFar',
    password: 'password123',
  });

  if (typeof signupResp == 'string') {
    switch (signupResp) {
      case 'DuplicateUsernameError':
        // do something
        break;
      case 'WeakPasswordError':
        // do something
        break;
      case 'UnknownError':
        // do something
        // no error to log
        break;
      default:
        const _exhaustiveCheck: never = signupResp;
        return _exhaustiveCheck;
    }
  } else {
    const user: User = signupResp;
    console.log(user);
  }
}
