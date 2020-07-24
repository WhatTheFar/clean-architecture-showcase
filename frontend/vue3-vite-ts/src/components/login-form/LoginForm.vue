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
import { defineComponent, ref, computed, watch } from 'vue';

import * as Password from '/@/domain/usecase/login/password';

export default defineComponent({
  name: 'Login',
  setup() {
    const username = ref('');
    const password = ref('');
    const pleaseChooseAPasswd = computed(() => {
      return password.value == '';
    });

    const passwdNotContainALowercase = ref(false);
    const passwdNotContainAnUppercase = ref(false);
    const passwdLengthNotInRange = ref(false);
    const passwdLengthMin = ref(0);
    const passwdLengthMax = ref(0);
    const isPasswdInvalid = computed(() => {
      return (
        pleaseChooseAPasswd.value ||
        passwdNotContainALowercase.value ||
        passwdNotContainAnUppercase.value ||
        passwdLengthNotInRange.value
      );
    });

    // validate password
    watch(password, (passwd) => {
      // Validate a lowercase letter
      const passwdContALower = Password.containALowercase(passwd);
      passwdNotContainALowercase.value = !passwdContALower;

      // Validate an upper letter
      const passwdContAnUpper = Password.containAnUppercase(passwd);
      passwdNotContainAnUppercase.value = !passwdContAnUpper;

      // Validate length
      const minLength = 8;
      const maxLength = 32;
      const passwdLengthMatched = Password.isLengthInRange(passwd, minLength, maxLength);
      passwdLengthNotInRange.value = !passwdLengthMatched;
      passwdLengthMin.value = minLength;
      passwdLengthMax.value = maxLength;
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onLogInClick = (_event: Event) => {
      // login here
    };

    return {
      username,
      password,
      pleaseChooseAPasswd,

      passwdNotContainALowercase,
      passwdNotContainAnUppercase,
      passwdLengthNotInRange,
      passwdLengthMin,
      passwdLengthMax,
      isPasswdInvalid,

      onLogInClick,
    };
  },
});
</script>
