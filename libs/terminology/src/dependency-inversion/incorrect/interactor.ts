import * as DataGateway from './datagateway';

//
// ┌────────────┐  Dependency   ┌──────────────┐
// │            │ ------------> │              │
// │ Interactor │               │ Data Gateway │
// │            │ ────────────> │              │
// └────────────┘    Control    └──────────────┘
//
export function login(username: string, password: string): boolean {
  const user = DataGateway.getUserByUsername(username);
  return user.password == password;
}
