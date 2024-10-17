<template>
  <div class="bg-gray-800 rounded-lg shadow-md p-6 text-center">
    <p class="text-sm text-gray-400">Saldo Previsto</p>
    <p class="text-2xl font-bold text-white">{{ formatCurrency(saldo) }}</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  saldo: {
    type: Number,
    required: true
  }
});

const formatCurrency = (value) => {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};
</script>
