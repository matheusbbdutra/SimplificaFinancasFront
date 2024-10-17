<template>
  <div class="modal-content">
    <header class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold">Nova Conta</h2>
      <button @click="saveAccount" class="bg-red-400 text-white px-4 py-1 rounded">Salvar</button>
    </header>

    <div class="mb-4">
      <label class="block text-sm text-gray-400">Nome</label>
      <input v-model="nome" type="text" placeholder="Nome" class="w-full p-2 rounded bg-gray-700 text-gray-300" />
    </div>

    <div class="mb-4">
      <label class="block text-sm text-gray-400">Saldo Inicial</label>
      <input v-model="saldoInicial" type="text" placeholder="R$ 0,00" class="w-full p-2 rounded bg-gray-700 text-gray-300" />
    </div>

    <div class="mb-4">
      <label class="block text-sm text-gray-400">Categoria</label>
      <select v-model="categoria" class="w-full p-2 rounded bg-gray-700 text-gray-300">
        <option v-for="cat in categorias" :key="cat" :value="cat">{{ cat }}</option>
      </select>
    </div>

    <div class="mb-4">
      <label class="block text-sm text-gray-400">Dados Adicionais</label>
      <textarea v-model="dadosAdicionais" placeholder="Dados Adicionais" class="w-full p-2 rounded bg-gray-700 text-gray-300"></textarea>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchData, postData } from '../../services/apiService';

const nome = ref('');
const saldoInicial = ref('');
const categoria = ref('');
const categorias = ref([]);
const dadosAdicionais = ref('');

onMounted(async () => {
  categorias.value = await fetchData('/api/contas/categorias', 'Erro ao listar categorias, tente novamente.');
});

const saveAccount = async () => {
  const accountData = {
    nome: nome.value,
    saldoInicial: saldoInicial.value,
    categoria: categoria.value,
    dadosAdicionais: dadosAdicionais.value,
  };
  await postData('/api/accounts', accountData);
};
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
