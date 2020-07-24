<template>
  <div class="w-full max-w-xs">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username"
          >Username</label
        >
        <input
          id="username"
          v-model="username"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Username"
        />
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password"
          >Password</label
        >
        <input
          id="password"
          v-model="password"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          :class="{ 'border-red-500': isPasswdInvalid }"
          type="password"
          placeholder="******************"
        />
        <p v-if="pleaseChooseAPasswd" class="text-red-500 text-xs italic">
          Please choose a password.
        </p>
        <template v-if="!pleaseChooseAPasswd && isPasswdInvalid">
          <p v-if="passwdNotContainALowercase" class="text-red-500 text-xs italic">
            Password must contain a lowercase.
          </p>
          <p v-if="passwdNotContainAnUppercase" class="text-red-500 text-xs italic">
            Password must contain an uppercase.
          </p>
          <p v-if="passwdLengthNotInRange" class="text-red-500 text-xs italic">
            Password must be between {{ passwdLengthMin }} and {{ passwdLengthMax }}.
          </p>
        </template>
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          :class="{
            'hover:bg-blue-700': !isPasswdInvalid,
            'opacity-50': isPasswdInvalid,
            'cursor-not-allowed': isPasswdInvalid,
          }"
          type="button"
          :disabled="isPasswdInvalid"
          @click="onLogInClick"
        >
          Sign In
        </button>
        <a
          class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          href="#"
          >Forgot Password?</a
        >
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from 'vue';

import { LoginFormViewModel } from './login-form.viewmodel';
import { LoginFormPresenter } from './login-form.presenter';
import { LoginInteractor } from '/@/domain/usecase/login/login.interactor';
import { LoginRouter } from '/@/router/login.router';
import { LoginDataGateway } from '/@/gateway/login.gateway';

export default defineComponent({
  name: 'Login',
  setup: () => {
    /**
     * Init
     */

    const loginFormVM = new LoginFormViewModel();
    const loginFormReactive = reactive(loginFormVM);
    const loginFormRefs = toRefs(loginFormReactive);

    // Create LoginFormPresenter, using a reactive proxy of LoginFormViewModel
    const loginFormPresenter = new LoginFormPresenter(loginFormReactive);
    const loginGateway = LoginDataGateway.new();
    const loginRouter = LoginRouter.new();
    const loginInteractor = new LoginInteractor(
      loginGateway,
      loginFormPresenter,
      loginRouter
    );

    /**
     * Controller
     */

    // validate password
    watch(loginFormRefs.password, (passwd) => {
      loginInteractor.validatePassword(passwd);
    });

    // onClick login button
    const onLogInClick = async () => {
      await loginInteractor.login(loginFormVM.username, loginFormVM.password);
    };

    return {
      ...loginFormRefs,
      onLogInClick,
    };
  },
});
</script>
