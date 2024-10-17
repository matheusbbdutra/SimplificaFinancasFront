<template>
  <div class="modal-content">
    <header class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold">Nova Despesa</h2>
      <button @click="saveExpense" class="bg-red-400 text-white px-4 py-1 rounded">Salvar</button>
    </header>

    <div class="mb-4">
      <label class="block text-sm text-gray-400">Descrição</label>
      <input v-model="descricao" type="text" placeholder="Descrição" class="w-full p-2 rounded bg-gray-700 text-gray-300" />
    </div>

    <div class="mb-4">
      <label class="block text-sm text-gray-400">Valor</label>
      <input v-model="valor" type="text" placeholder="R$ 0,00" class="w-full p-2 rounded bg-gray-700 text-gray-300" />
    </div>

    <div class="mb-4">
      <label class="block text-sm text-gray-400">Data vencimento</label>
      <input v-model="dataVencimento" type="date" class="w-full p-2 rounded bg-gray-700 text-gray-300" />
    </div>

    <div class="mb-4 flex justify-between">
      <label class="block text-sm text-gray-400">Efetivada</label>
      <input v-model="efetivada" type="checkbox" class="toggle-checkbox" />
    </div>

    <div class="mb-4">
      <label class="block text-sm text-gray-400">Categoria</label>
      <div class="flex items-center">
        <select v-model="categoria" class="w-full p-2 rounded bg-gray-700 text-gray-300">
          <option v-for="cat in categorias" :key="cat.id" :value="cat.id">{{ cat.descricao }}</option>
        </select>
        <button @click="openCategoriaModal" class="ml-2 bg-blue-500 text-white px-2 py-1 rounded">+</button>
      </div>
    </div>

    <div class="mb-4">
      <label class="block text-sm text-gray-400">SubCategoria</label>
      <div class="flex items-center">
        <select v-model="subCategoria" class="w-full p-2 rounded bg-gray-700 text-gray-300">
          <option v-for="subCat in subCategorias" :key="subCat.id" :value="subCat.id">{{ subCat.descricao }}</option>
        </select>
        <button @click="openSubCategoriaModal" class="ml-2 bg-blue-500 text-white px-2 py-1 rounded">+</button>
      </div>
    </div>

    <div class="mb-4">
      <label class="block text-sm text-gray-400">Conta</label>
      <select v-model="conta" class="w-full p-2 rounded bg-gray-700 text-gray-300">
        <option v-for="acc in contas" :key="acc.id" :value="acc.id">{{ acc.descricao }}</option>
      </select>
    </div>

    <CategoriaModal
        v-if="isCategoriaModalVisible"
        :isVisible="isCategoriaModalVisible"
        title="Adicionar Categoria"
        :isSubCategoria="false"
        @close="closeCategoriaModal"
        @save="saveCategoria"
    />
    <CategoriaModal
        v-if="isSubCategoriaModalVisible"
        :isVisible="isSubCategoriaModalVisible"
        title="Adicionar SubCategoria"
        :isSubCategoria="true"
        @close="closeSubCategoriaModal"
        @save="saveSubCategoria"
    />

  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {fetchData, postData} from '@/services/apiService';
import CategoriaModal from "./CategoriaModal.vue";

const descricao = ref('');
const valor = ref('');
const dataVencimento = ref('');
const efetivada = ref(false);
const categoria = ref('');
const categorias = ref([]);
const subCategoria = ref('');
const subCategorias = ref([]);
const conta = ref('');
const contas = ref([]);
const isCategoriaModalVisible = ref(false);
const isSubCategoriaModalVisible = ref(false);

const fetchCategorias = async () => {
  categorias.value = await fetchData('/api/financas/listar-categoria-modal/2', 'Erro ao listar categorias, tente novamente.');
};

const fetchContas = async () => {
  contas.value = await fetchData('/api/financas/listar-contas-modal', 'Erro ao listar contas, tente novamente.');
};

const openCategoriaModal = () => {
  isCategoriaModalVisible.value = true;
};

const openSubCategoriaModal = () => {
  isSubCategoriaModalVisible.value = true;
};

const closeCategoriaModal = () => {
  isCategoriaModalVisible.value = false;
};

const closeSubCategoriaModal = () => {
  isSubCategoriaModalVisible.value = false;
};

onMounted(() => {
  fetchCategorias();
  fetchContas();
});

// eslint-disable-next-line no-unused-vars
const saveCategoria = (data) => {
  // Lógica para salvar a nova categoria
  closeCategoriaModal();
  fetchCategorias();
};
// eslint-disable-next-line no-unused-vars
const saveSubCategoria = (data) => {
  // Lógica para salvar a nova subcategoria
  closeSubCategoriaModal();
  fetchCategorias();
};


const saveExpense = async () => {
  const expenseData = {
    descricao: descricao.value,
    valor: valor.value,
    dataVencimento: dataVencimento.value,
    efetivada: efetivada.value,
    categoria: categoria.value,
    conta: conta.value,
    subCategorias: subCategoria.value,
  };

  await postData('/api/expenses', expenseData);
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
