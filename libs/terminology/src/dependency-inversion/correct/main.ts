import { UserInteractor } from './interactor';
import { UserDataGatewayImpl } from './datagateway';

//
// ┌──────────┐               ┌──────────────┐
// │          │  Dependency   │              │
// │          │ ------------> │ Data Gateway │
// │          │               │              │
// │          │               └──────────────┘
// │          │                    | Λ
// │   Main   │                    | ║ Flow of Control
// │          │                    V ║
// │          │               ┌────────────┐
// │          │  Dependency   │            │
// │          │ ------------> │ Interactor │
// │          │               │            │
// └──────────┘               └────────────┘
//

const userDataGateway = new UserDataGatewayImpl();
const userInteractor = new UserInteractor(userDataGateway);

userInteractor.login('admin', 'admin');
