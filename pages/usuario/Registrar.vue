<script setup lang="ts">
import { ref } from 'vue';
import { useNuxtApp, navigateTo } from '#imports';

const name = ref('');
const email = ref('');
const password = ref('');
const visible = ref(false);


const { $axios } = useNuxtApp();

const registerUser = async () => {
  try {
    await $axios.post('/api/usuario/registrar', {
      nome: name.value,
      email: email.value.toLowerCase(),
      senha: password.value,
    });

    navigateTo('/usuario/login');
  } catch (e) {
    console.error('Erro ao registrar:', e);
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
      <div class="text-subtitle-1 text-medium-emphasis">Nome</div>
      <v-text-field
          v-model="name"
          density="compact"
          placeholder="Informe seu nome"
          prepend-inner-icon="mdi-account"
          variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">E-mail</div>
      <v-text-field
          v-model="email"
          density="compact"
          placeholder="Endereço de Email"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">Senha</div>
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
          @click="registerUser"
      >
        Registre-se
      </v-btn>

      <v-card-text class="text-center">
        <a
            class="text-blue text-decoration-none"
            href="/usuario/login"
        >
          Já é registrado? Faça seu login. <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>
</style>
