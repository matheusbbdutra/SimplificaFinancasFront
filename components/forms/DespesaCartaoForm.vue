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

    <v-select
        v-model="cartaoCredito"
        :items="cartoesCredito"
        label="Cartão de Crédito"
        required
        :menu-props="{ closeOnContentClick: false }"
        :return-object="true"
        item-text="name"
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
const cartaoCredito = ref(null);
const categorias = ref([]);
const subcategorias = ref([]);
const cartoesCredito = ref([]);

const fetchCategorias = async () => {
  categorias.value = await $axios.get('/api/financas/listar-categoria-modal/2').then(res => res.data);
};

const fetchSubcategorias = async () => {
  subcategorias.value = await $axios.get('/api/subcategorias').then(res => res.data);
};

const fetchContas = async () => {
  cartoesCredito.value = await $axios.get('/api/cartoes-credito').then(res => res.data);
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
