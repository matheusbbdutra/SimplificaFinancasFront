<template>
  <v-form>
    <v-text-field
        v-model="descricao"
        label="Descrição"
        required
    ></v-text-field>

    <v-text-field
        v-model="valor"
        label="Valor"
        prefix="R$"
        required
    ></v-text-field>

    <v-date-input
        v-model="dataVencimento"
        label="Data de Vencimento"
        class="mt-4"
        formatter="dd-MM-yyyy"
    ></v-date-input>

    <v-checkbox
        v-model="efetivada"
        label="Efetivada"
    ></v-checkbox>

    <v-select
        v-model="categoria"
        :items="categorias"
        label="Categoria"
        required
        :menu-props="{ closeOnContentClick: false }"
        :return-object="true"
        item-text="name"
        item-value="id"
    ></v-select>

    <!-- Campo Subcategoria -->
    <v-select
        v-model="subcategoria"
        :items="subcategorias"
        label="Subcategoria"
        required
        :menu-props="{ closeOnContentClick: false }"
        :return-object="true"
        item-text="name"
        item-value="id"
    ></v-select>

    <!-- Campo Conta -->
    <v-select
        v-model="conta"
        :items="contas"
        label="Conta"
        required
        :menu-props="{ closeOnContentClick: false }"
        :return-object="true"
        item-title="descricao"
        item-value="id"
    ></v-select>

    <!-- Botão Salvar -->
    <v-btn color="primary" @click="submitForm">Salvar</v-btn>
  </v-form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {useNuxtApp} from "#imports";

const { $axios } = useNuxtApp();

const descricao = ref('');
const valor = ref('');
const dataVencimento = ref<Date | null>(null);
const efetivada = ref(false);
const categoria = ref(null);
const subcategoria = ref(null);
const conta = ref(null);
const categorias = ref([]);
const subcategorias = ref([]);
const contas = ref([]);

const fetchCategorias = async () => {
  const response = await $axios.get('/api/financas/listar-categoria-modal/2');
  categorias.value = response.data.map((item: any) => ({
    id: item.id,
    name: item.descricao
  }));
};

const fetchSubcategorias = async () => {
  const response = await $axios.get('/api/financas/subcategorias');
  subcategorias.value = response.data.map((item: any) => ({
    id: item.id,
    name: item.descricao
  }));
};

const fetchContas = async () => {
  const response = await $axios.get('/api/financas/listar-contas-modal');
  contas.value = response.data.map((item: any) => ({
    id: item.id,
    descricao: item.descricao
  }));
};


const submitForm = () => {

};

onMounted(() => {
  fetchCategorias();
  fetchSubcategorias();
  fetchContas();
});
</script>

<style scoped>
</style>
