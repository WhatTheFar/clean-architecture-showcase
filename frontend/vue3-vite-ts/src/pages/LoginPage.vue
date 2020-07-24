<template>
  <div class="h-screen flex justify-center items-center bg-gray-500">
    <LoginForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// import LoginForm from '../components/login-form/LoginForm.vue';
// import LoginForm from '../components/login-form-clean/LoginForm.vue';
import LoginForm from '../components/login-form-clean/LoginForm.ref.vue';

export default defineComponent({
  components: {
    LoginForm,
  },
});
</script>
