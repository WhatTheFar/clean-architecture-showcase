import { computed } from 'vue';

import { LoginOutput } from '/@/domain/usecase/login/login.interactor';
import {
  LoginFormViewModel,
  LoginFormViewModelReactiveLazy,
} from './login-form.viewmodel';

export class LoginFormPresenter implements LoginOutput {
  constructor(private readonly vm: LoginFormViewModel) {}

  public loggedIn(): void {
    return;
  }

  public pleaseChooseAPasswd(toggle: boolean): void {
    this.vm.pleaseChooseAPasswd = toggle;
  }

  public passwdContainALowercase(contain: boolean): void {
    this.vm.passwdNotContainALowercase = !contain;
    this.checkIfPasswordIsInvalid();
  }
  public passwdContainAnUppercase(contain: boolean): void {
    this.vm.passwdNotContainAnUppercase = !contain;
    this.checkIfPasswordIsInvalid();
  }
  public passwdLengthInRange(match: boolean, min: number, max: number): void {
    this.vm.passwdLengthNotInRange = !match;
    this.vm.passwdLengthMin = min;
    this.vm.passwdLengthMax = max;
    this.checkIfPasswordIsInvalid();
  }

  private checkIfPasswordIsInvalid(): void {
    const isInvalid =
      this.vm.password == '' ||
      this.vm.passwdNotContainAnUppercase ||
      this.vm.passwdNotContainAnUppercase ||
      this.vm.passwdLengthNotInRange;

    this.vm.isPasswdInvalid = isInvalid;
  }
}

export class LoginFormPresenterReactive implements LoginOutput {
  constructor(private readonly vm: LoginFormViewModelReactiveLazy) {}

  public init(): void {
    this.vm.isPasswdInvalid = computed(() => {
      return (
        this.vm.pleaseChooseAPasswd.value ||
        this.vm.passwdNotContainAnUppercase.value ||
        this.vm.passwdNotContainAnUppercase.value ||
        this.vm.passwdLengthNotInRange.value
      );
    });
  }

  public loggedIn(): void {
    return;
  }

  public pleaseChooseAPasswd(toggle: boolean): void {
    this.vm.pleaseChooseAPasswd.value = toggle;
  }

  public passwdContainALowercase(contain: boolean): void {
    this.vm.passwdNotContainALowercase.value = !contain;
  }
  public passwdContainAnUppercase(contain: boolean): void {
    this.vm.passwdNotContainAnUppercase.value = !contain;
  }
  public passwdLengthInRange(match: boolean, min: number, max: number): void {
    this.vm.passwdLengthNotInRange.value = !match;
    this.vm.passwdLengthMin.value = min;
    this.vm.passwdLengthMax.value = max;
  }
}
