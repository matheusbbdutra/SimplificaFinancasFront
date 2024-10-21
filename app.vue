<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <div class="flex min-h-screen w-full bg-background text-foreground">
      <main class="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div class="hidden flex-col md:flex">
          <div class="border-b">
            <div class="flex h-16 items-center px-4">
              <MainNav class="mx-6" />
              <div class="ml-auto flex items-center space-x-4">
                <UserNav />
              </div>
            </div>
          </div>
        </div>
        <NuxtPage />
      </main>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { onMounted } from 'vue';
import MainNav from "~/components/MainNav.vue";
import UserNav from "~/components/UserNav.vue";

onMounted(() => {
  document.documentElement.classList.add('dark');
});
</script>
