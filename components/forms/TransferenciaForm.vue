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
        label="Data de Lançamento"
        class="mt-4"
        formatter="dd-MM-yyyy"
    ></v-date-input>

    <v-checkbox
        v-model="efetivada"
        label="Efetivada"
    ></v-checkbox>


    <v-select
        v-model="contaOrigem"
        :items="contas"
        label="Conta"
        required
        :menu-props="{ closeOnContentClick: false }"
        :return-object="true"
        item-title="descricao"
        item-value="id"
    ></v-select>

    <v-select
        v-model="contaDestino"
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
const contaOrigem = ref(null);
const contaDestino = ref(null);
const contas = ref([]);

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
  fetchContas();
});
</script>

<style scoped>
</style>
