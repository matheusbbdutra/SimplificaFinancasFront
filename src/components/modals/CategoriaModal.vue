<template>
  <Modal :close="closeModal">
    <template #default>
      <header class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold">{{ title }}</h2>
      </header>

      <div class="mb-4">
        <label class="block text-sm text-gray-400">Descrição</label>
        <input v-model="descricao" type="text" placeholder="Descrição" class="w-full p-2 rounded bg-gray-700 text-gray-300" />
      </div>

      <div v-if="isSubCategoria" class="mb-4">
        <label class="block text-sm text-gray-400">Categoria</label>
        <select v-model="categoria" class="w-full p-2 rounded bg-gray-700 text-gray-300">
          <option v-for="cat in categorias" :key="cat.id" :value="cat.id">{{ cat.descricao }}</option>
        </select>
      </div>

      <button @click="save" class="bg-green-500 text-white px-4 py-1 rounded">Salvar</button>
    </template>
  </Modal>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted } from 'vue';
import Modal from './ModalApp.vue';
import { fetchData } from '../../services/apiService';

const props = defineProps({
  isVisible: Boolean,
  title: String,
  saveAction: Function,
  isSubCategoria: Boolean
});

const emits = defineEmits(['close', 'save']);

const descricao = ref('');
const categoria = ref('');
const categorias = ref([]);

const save = () => {
  const data = {
    descricao: descricao.value,
    categoria: props.isSubCategoria ? categoria.value : null
  };
  emits('save', data);
};

const fetchCategorias = async () => {
  categorias.value = await fetchData('/api/financas/listar-categoria-modal/2', 'Erro ao listar categorias, tente novamente.');
};

onMounted(() => {
  if (props.isSubCategoria) {
    fetchCategorias();
  }
});
</script>

<style scoped>
.modal-content {
  background: #1f2937;
  padding: 20px;
  border-radius: 10px;
}
</style>
