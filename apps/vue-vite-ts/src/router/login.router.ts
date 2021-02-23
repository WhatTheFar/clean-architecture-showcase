import { Router } from 'vue-router';

import { RoutePaths, router } from '.';
import { LoginNavigator } from '/@/domain/usecase/login/login.interactor';

export class LoginRouter implements LoginNavigator {
  constructor(private readonly router: Router) {}

  homepage(): void {
    this.router.push(RoutePaths.homepage);
  }

  goTo(location: string): void {
    this.router.push({ path: location });
  }

  public static new(): LoginRouter {
    return new LoginRouter(router);
  }
}
