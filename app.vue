<template>
  <v-responsive class="border rounded">
    <v-app>
      <template v-if="isUsuarioRoute">
        <v-main class="pa-0 ml-16 mr-2 mt-20">
          <NuxtPage />
        </v-main>
      </template>
      <template v-else>
        <Navbar/>
        <v-app-bar>
          <v-breadcrumbs :items="items">
            <template v-slot:prepend>
              <v-icon icon="$vuetify" size="small"></v-icon>
            </template>
          </v-breadcrumbs>
          <v-spacer></v-spacer>

          <v-btn
              :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
              slim
              @click="toggleTheme"
          ></v-btn>
        </v-app-bar>
        <v-main class="pa-0 ml-16 mr-2 mt-20">
          <NuxtPage />
        </v-main>
      </template>
    </v-app>
  </v-responsive>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'
import { useRoute } from 'vue-router';
import { ref, computed } from 'vue';

const route = useRoute();

const items = ref(route.path.split('/').filter(Boolean).map((segment, index, array) => {
  return {
    title: segment.charAt(0).toUpperCase() + segment.slice(1),
    disabled: index === array.length - 1,
    href: '/' + array.slice(0, index + 1).join('/')
  };
}));

const theme = useTheme()

function toggleTheme () {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

const isUsuarioRoute = computed(() => route.path.startsWith('/usuario'));

</script>
