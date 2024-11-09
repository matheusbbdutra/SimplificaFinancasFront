<script lang="ts">
import { User } from 'lucide-vue-next';

export default {
  components: {
    User
  }
};
</script>
<template>
  <v-navigation-drawer
      expand-on-hover
      rail
  >
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
        <v-list-item prepend-icon="mdi-logout" title="Logout" href="/Contas"></v-list-item>
      </div>
    </template>
  </v-navigation-drawer>
</template>
