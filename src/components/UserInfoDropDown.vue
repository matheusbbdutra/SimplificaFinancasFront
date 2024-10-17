<template>
  <div class="flex space-x-8">
    <div class="date-selector flex items-center">
      <label for="month" class="mr-2">Mês</label>
      <select v-model="selectedMonth" id="month" class="p-2 rounded-lg bg-gray-700 text-white mr-4">
        <option v-for="month in months" :key="month" :value="month">{{ month }}</option>
      </select>

      <label for="year" class="mr-2">Ano</label>
      <select v-model="selectedYear" id="year" class="p-2 rounded-lg bg-gray-700 text-white">
        <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
      </select>
    </div>

    <div class="user-info flex items-center cursor-pointer relative" @click="toggleDropdown" ref="userInfo">
      <UserCircle class="w-12 h-12 rounded-full mr-4"/>
      <div>
        <p class="text-lg font-semibold">{{ user.name }}</p>
        <p class="text-sm text-gray-400">{{ user.email }}</p>
      </div>
      <transition name="fade">
        <Menu v-if="isDropdownOpen" ref="userDropdown" @closeDropdown="isDropdownOpen = false"/>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { UserCircle } from 'lucide-vue-next';
import Menu from './modals/MenuApp.vue';

const isDropdownOpen = ref(false);
const userInfoRef = ref(null);
const userDropdownRef = ref(null);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const handleClickOutside = (event) => {
  if (
      userInfoRef.value && !userInfoRef.value.contains(event.target) &&
      userDropdownRef.value && !userDropdownRef.value.contains(event.target)
  ) {
    console.log('Clicked outside, closing dropdown');
    isDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

const user = {
  name: sessionStorage.getItem('userName'),
  email: sessionStorage.getItem('userEmail'),
  profileImage: "path/to/profile-image.jpg"
};

const dateTime = new Date();
const months = Array.from({ length: 12 }, (_, i) => {
  return new Date(0, i).toLocaleString('pt-BR', { month: 'long' });
});
const currentYear = dateTime.getFullYear();
const years = Array.from({ length: 10 }, (_, i) => currentYear + i);
const selectedMonth = ref(dateTime.toLocaleString('pt-BR', { month: 'long' }));
const selectedYear = ref(currentYear.toString());
// eslint-disable-next-line no-unused-vars
const data = {
  month: selectedMonth.value,
  year: selectedYear.value
};
</script>

<style scoped>
</style>
