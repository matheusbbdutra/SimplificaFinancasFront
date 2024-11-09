<script lang="ts">
import { User } from 'lucide-vue-next';
import { useCookie } from '#app';
import { useRouter } from 'vue-router';

export default {
  components: {
    User
  },
  setup() {
    const token = useCookie('token');
    const router = useRouter();

    const logout = () => {
      token.value = null; // Remove o token do cookie
      router.push('/usuario/login'); // Redireciona para a página de login
    };

    return {
      logout
    };
  }
};
</script>

<template>
  <v-navigation-drawer expand-on-hover rail>
    <v-list>
      <v-list-item subtitle="sandra_a88@gmail.com" title="Sandra Adams">
        <template v-slot:prepend>
          <User class="mr-3"/>
        </template>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" href="/Dashboard"></v-list-item>
      <v-list-item prepend-icon="mdi-bank" title="Contas" href="/Contas"></v-list-item>
    </v-list>
    <template v-slot:append>
      <div class="pa-2">
        <v-list-item prepend-icon="mdi-logout" title="Logout" @click="logout"></v-list-item>
      </div>
    </template>
  </v-navigation-drawer>
</template>
