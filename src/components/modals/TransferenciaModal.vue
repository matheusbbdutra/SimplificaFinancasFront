<template>
  <div class="modal-content">
    <header class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold">Nova Transferência</h2>
      <button class="bg-yellow-400 text-white px-4 py-1 rounded">Salvar</button>
    </header>

    <div class="mb-4">
      <label class="block text-sm text-gray-400">Descrição</label>
      <input type="text" v-model="descricao" placeholder="Descrição" class="w-full p-2 rounded bg-gray-700 text-gray-300" />
    </div>

    <div class="mb-4">
      <label class="block text-sm text-gray-400">Valor</label>
      <input type="text" v-model="valor" placeholder="R$ 0,00" class="w-full p-2 rounded bg-gray-700 text-gray-300" />
    </div>

    <div class="mb-4">
      <label class="block text-sm text-gray-400">Data Lançamento</label>
      <input type="date" v-model="dtLancamento" class="w-full p-2 rounded bg-gray-700 text-gray-300" />
    </div>

    <div class="mb-4">
      <label class="block text-sm text-gray-400">Data vencimento</label>
      <input type="date" v-model="dtVencimento" class="w-full p-2 rounded bg-gray-700 text-gray-300" />
    </div>

    <div class="mb-4 flex justify-between">
      <label class="block text-sm text-gray-400">Efetivada</label>
      <input type="checkbox" v-model="efetivada" class="toggle-checkbox" />
    </div>

    <div class="mb-4">
      <label class="block text-sm text-gray-400">Conta</label>
      <select v-model="conta" class="w-full p-2 rounded bg-gray-700 text-gray-300">
        <option v-for="conta in contas" :key="conta.id" :value="conta.id">{{ conta.descricao }}</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchData } from '../../services/apiService';

const descricao = ref('');
const valor = ref('');
const dtLancamento = ref('');
const dtVencimento = ref('');
const efetivada = ref(false);
const conta = ref(null);
const contas = ref([]);

const fetchContas = async () => {
  contas.value = await fetchData('/api/financas/listar-contas-modal', 'Erro ao listar contas, tente novamente.');
};

onMounted(() => {
  fetchContas();
});
</script>

<style scoped>
.modal-content {
  background: #1f2937;
  padding: 20px;
  border-radius: 10px;
}
.toggle-checkbox {
  background: #4b5563;
  height: 20px;
  width: 40px;
  border-radius: 50px;
}
</style>
