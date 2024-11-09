<script setup lang="ts">
import { ref } from 'vue';
import { useCookie } from '#app';
import { useNuxtApp, navigateTo } from '#imports';

const email = ref('');
const password = ref('');
const visible = ref(false);

const token = useCookie<string | null>('token', { maxAge: 3600 });

const { $axios } = useNuxtApp();

const loginUser = async () => {
  try {
    const response = await $axios.post('/api/usuario/login', {
      email: email.value.toLowerCase(),
      password: password.value,
    });

    token.value = response.data.token;
    
    navigateTo('/financas/dashboard');
  } catch (e) {
    console.error('Erro ao fazer login:', e);
  }
};
</script>

<template>
  <div>
    <v-img
        class="mx-auto my-6"
        max-width="228"
        src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
    ></v-img>

    <v-card
        class="mx-auto pa-12 pb-8"
        elevation="8"
        max-width="448"
        rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">E-mail</div>
      <v-text-field
          v-model="email"
          density="compact"
          placeholder="Endereço de Email"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Senha
        <a
            class="text-caption text-decoration-none text-blue"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
        >
          Esqueceu a senha?
        </a>
      </div>
      <v-text-field
          v-model="password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Insira sua senha"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-btn
          class="mb-8"
          color="blue"
          size="large"
          variant="tonal"
          block
          @click="loginUser"
      >
        Log In
      </v-btn>

      <v-card-text class="text-center">
        <a
            class="text-blue text-decoration-none"
            href="/usuario/registrar"
        >
          Não é registrado? Registre-se agora. <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>
</style>
