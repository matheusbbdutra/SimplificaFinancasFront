<template>
  <v-row align="center" justify="space-between" dense>
    <v-col
        v-for="(card, index) in balanceCards"
        :key="index"
        cols="12"
        md="4"
    >
      <v-card class="p-8 shadow-md rounded-md bg-surface" elevation="16">
        <div class="d-flex">
          <div class="ml-2 d-flex align-center justify-center">
            <v-icon class="text-3xl">{{ card.icon }}</v-icon>
          </div>
          <div class="mb-0 space-y-0">
            <v-card-title class="text-3xl">{{ card.title }}</v-card-title>
            <v-card-text class="font-weight-bold">{{ card.value }}</v-card-text>
            <v-card-subtitle v-if="card.subtitle">{{ card.subtitle }}</v-card-subtitle>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>

  <v-row align="center" justify="space-between" dense class="mt-2">
    <v-col
        v-for="(card, index) in financeCards"
        :key="index"
        cols="1"
        md="3"
    >
      <v-card class="p-10 shadow-2xl rounded-md bg-surface" elevation="16">
        <div class="d-flex">
          <div class="ml-2 d-flex align-center justify-center">
            <v-icon class="text-3xl" :color="card.color">{{ card.icon }}</v-icon>
          </div>
          <div class="mb-0 space-y-0">
            <v-card-title class="text-3xl">{{ card.title }}</v-card-title>
            <v-card-text class="font-weight-bold">{{ card.value }}</v-card-text>
            <v-card-subtitle v-if="card.subtitle">{{ card.subtitle }}</v-card-subtitle>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>

  <v-menu
      v-model="fabMenu"
      transition="slide-y-transition"
      offset-y
      bottom
  >
    <template v-slot:activator="{ props }">
      <v-btn
          v-bind="props"
          icon="mdi-plus"
          color="blue"
          variant="tonal"
          class="position-fixed bottom-8 right-8 mb-4 mr-2"
          location="bottom end"
          size="64"
          absolute
          app
          bottom
          right
      >
      </v-btn>
    </template>
    <v-list>
      <v-list-item v-for="(item, i) in menuItems" :key="i" @click="openDialog(item)">
        <v-list-item-title>
          <v-icon :color="item.color">{{ item.icon }}</v-icon> {{ item.title }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
  
  <v-dialog v-model="dialog" persistent max-width="600">
    <v-card>
      <div class="d-flex justify-space-between align-center">
        <v-card-title class="text-3xl font-extrabold ml-3">{{ currentItem?.title }}</v-card-title>
        <v-card-actions class="mt-2">
          <v-spacer></v-spacer>
          <v-btn color="red" @click="closeForm">X</v-btn>
        </v-card-actions>
      </div>
      <v-card-text>
        <component :is="currentForm" @close="closeForm" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue';
import TransferForm from '~/components/forms/TransferenciaForm.vue';
import ReceitaForm from '~/components/forms/ReceitaForm.vue';
import DespesaForm from '~/components/forms/DespesaForm.vue';
import DespesaCartaoForm from '~/components/forms/DespesaCartaoForm.vue';

interface MenuItem {
  title: string;
  icon: string;
  color: string;
  form: string;
}

export default defineComponent({
  name: 'Dashboard',
  components: {
    TransferForm,
    ReceitaForm,
    DespesaForm,
    DespesaCartaoForm
  },
  setup() {
    const fabMenu = ref(false);
    const dialog = ref(false);
    const currentItem = ref<MenuItem | null>(null);
    const currentForm = ref<string | null>(null);

    const menuItems = ref<MenuItem[]>([
      { title: 'Transferência', icon: 'mdi-arrow-up-bold-circle', color: 'yellow', form: 'TransferForm' },
      { title: 'Receita', icon: 'mdi-plus-circle', color: 'green', form: 'ReceitaForm' },
      { title: 'Despesa', icon: 'mdi-minus-circle', color: 'red', form: 'DespesaForm' },
      { title: 'Despesa Cartão', icon: 'mdi-credit-card-minus', color: 'red', form: 'DespesaCartaoForm' }
    ]);

    const openDialog = async (item: MenuItem) => {
      dialog.value = false;
      await nextTick(); 

      currentItem.value = item;
      currentForm.value = item.form;
      dialog.value = true;
    };

    const closeForm = async () => {
      dialog.value = false;
      await nextTick(); 

      currentForm.value = null;
      currentItem.value = null;
    };

    return {
      fabMenu,
      dialog,
      currentItem,
      currentForm,
      menuItems,
      openDialog,
      closeForm,
      balanceCards: [
        { title: 'Saldo Inicial', value: 'R$ 0,00', subtitle: 'Previsto', icon: 'mdi-cash' },
        { title: 'Saldo Atual', value: 'R$ 0,00', subtitle: 'Previsto', icon: 'mdi-bank' },
        { title: 'Saldo Previsto', value: 'R$ 0,00', subtitle: 'Previsto', icon: 'mdi-trending-up' }
      ],
      financeCards: [
        { title: 'Contas', value: 'R$ 0,00', subtitle: 'Previsto', icon: 'mdi-account', color: 'blue' },
        { title: 'Receitas', value: 'R$ 0,00', subtitle: 'Previsto', icon: 'mdi-wallet', color: 'green' },
        { title: 'Despesas', value: 'R$ 0,00', subtitle: 'Previsto', icon: 'mdi-credit-card', color: 'red' },
        { title: 'Cartões de Crédito', value: 'R$ 0,00', subtitle: 'Previsto', icon: 'mdi-credit-card', color: 'red' }
      ]
    };
  }
});
</script>

<style scoped>
</style>
