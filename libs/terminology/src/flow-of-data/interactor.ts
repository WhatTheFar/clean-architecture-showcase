import * as DataGateway from './datagateway';
import { User } from './entity';

//
// ┌────────────┐               ┌──────────────┐
// │            │  Dependency   │              │
// │            │ ------------> │ Data Gateway │
// │            │               │              │
// │            │               └──────────────┘
// │ Interactor │
// │            │               ┌──────────┐
// │            │  Dependency   │          │
// │            │ ------------> │  Entity  │
// │            │               │          │
// └────────────┘               └──────────┘
//

export interface UserWithoutPassword {
  username: string;
}

//
// ┌────────────┐  Control   ┌──────────────┐
// │            │ ─────────> │              │
// │ Interactor │            │ Data Gateway │
// │            │ ═════════> │              │
// └────────────┘   Data     └──────────────┘
//
export function registerUser(user: User) {
  DataGateway.createUser(user);
  return;
}

//
// ┌────────────┐  Control   ┌──────────────┐
// │            │ ─────────> │              │
// │ Interactor │            │ Data Gateway │
// │            │ <═════════ │              │
// └────────────┘    Data    └──────────────┘
//
export function getUser(username: string): UserWithoutPassword {
  const user = DataGateway.getUserByUsername(username);
  return { username: user.username };
}
