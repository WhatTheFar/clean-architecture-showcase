import { computed, ref, ComputedRef } from 'vue';

export class LoginFormViewModel {
  public username = '';
  public password = '';
  public pleaseChooseAPasswd = true;

  public passwdNotContainALowercase = false;
  public passwdNotContainAnUppercase = false;
  public passwdLengthNotInRange = false;
  public passwdLengthMin = 0;
  public passwdLengthMax = 0;
  public isPasswdInvalid = false;
}

export class LoginFormViewModelReactive {
  public readonly username = ref('');
  public readonly password = ref('');
  public readonly pleaseChooseAPasswd = ref(true);

  public readonly passwdNotContainALowercase = ref(false);
  public readonly passwdNotContainAnUppercase = ref(false);
  public readonly passwdLengthNotInRange = ref(false);
  public readonly passwdLengthMin = ref(0);
  public readonly passwdLengthMax = ref(0);
  public readonly isPasswdInvalid = computed(() => {
    return (
      this.pleaseChooseAPasswd.value ||
      this.passwdNotContainAnUppercase.value ||
      this.passwdNotContainAnUppercase.value ||
      this.passwdLengthNotInRange.value
    );
  });
}

export class LoginFormViewModelReactiveLazy {
  public readonly username = ref('');
  public readonly password = ref('');
  public readonly pleaseChooseAPasswd = ref(true);

  public readonly passwdNotContainALowercase = ref(false);
  public readonly passwdNotContainAnUppercase = ref(false);
  public readonly passwdLengthNotInRange = ref(false);
  public readonly passwdLengthMin = ref(0);
  public readonly passwdLengthMax = ref(0);
  // initiate later in presenter
  public isPasswdInvalid!: ComputedRef<boolean>;
}
