import { signupUser } from './hybrid-sentinel';

async function main() {
  await signupUser({ username: 'WhatTheFar', password: 'password123' });
}

main();
