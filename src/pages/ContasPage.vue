<template>
  <header class="mb-8">
    <div class="flex justify-between items-center">
      <h2 class="text-4xl font-semibold text-white mr-4">Contas</h2>
      <div class="bg-gray-800 rounded-lg shadow-md p-6 relative">
        <div class="flex space-x-8">
          <UserInfoDropdown />
        </div>
      </div>
    </div>
  </header>
  <div class="p-4">
    <div v-for="conta in contas" :key="conta.nome" class="bg-gray-800 rounded-lg p-4 mb-4 shadow-md">
      <div class="flex justify-between items-center mb-2">
        <div class="flex items-center">
          <div class="w-8 h-8 mr-2 bg-gray-700 rounded-full flex justify-center items-center">
            <Banknote/>
          </div>
          <div>
            <h2 class="text-white font-semibold">{{ conta.nome }}</h2>
            <p class="text-gray-400 text-sm">{{ conta.tipo }}</p>
          </div>
        </div>
        <div class="flex items-center">
          <button class="text-gray-400 hover:text-white mr-2">
            <i class="fas fa-plus"></i>
          </button>
          <button class="text-gray-400 hover:text-white">
            <i class="fas fa-bars"></i>
          </button>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4 text-gray-300">
        <div>
          <p>Saldo Inicial</p>
          <p>R$ {{ conta.saldoInicial.toFixed(2) }}</p>
        </div>
        <div>
          <p>Receitas</p>
          <p>R$ {{ conta.receitas.toFixed(2) }}</p>
        </div>
        <div>
          <p>Transf. creditadas</p>
          <p>R$ {{ conta.transferenciasCreditadas.toFixed(2) }}</p>
        </div>
        <div>
          <p>Transf. debitadas</p>
          <p>R$ {{ conta.transferenciasDebitado.toFixed(2) }}</p>
        </div>
        <div>
          <p>Despesas</p>
          <p>R$ {{ conta.despesas.toFixed(2) }}</p>
        </div>
      </div>
      <div class="mt-4">
        <p class="text-green-400 font-semibold">Saldo atual</p>
        <p class="text-xl text-green-400">R$ {{ conta.saldoAtual.toFixed(2) }}</p>
        <p class="text-gray-500 text-sm">Saldo previsto: R$ {{ conta.saldoPrevisto.toFixed(2) }}</p>
      </div>
    </div>
  </div>
  <FloatingActionButton />
</template>

<script>
import { fetchData } from '@/services/apiService';
import { Banknote } from 'lucide-vue-next';
import UserInfoDropdown from "../components/UserInfoDropDown.vue";
import FloatingActionButton from "../components/FloatingActionButton.vue";

export default {
  components: {FloatingActionButton, UserInfoDropdown, Banknote},
  data() {
    return {
      contas: [
        {
          nome: "Conta Corrente",
          tipo: "Conta Corrente",
          saldoInicial: 6.84,
          receitas: 3145.00,
          transferenciasCreditadas: 0.00,
          transferenciasDebitado: 0.00,
          despesas: 3108.40,
          saldoAtual: 43.44,
          saldoPrevisto: 43.44
        },
        {
          nome: "Investimento",
          tipo: "Investimento",
          saldoInicial: 0.00,
          receitas: 0.00,
          transferenciasCreditadas: 0.00,
          transferenciasDebitado: 0.00,
          despesas: 0.00,
          saldoAtual: 0.00,
          saldoPrevisto: 0.00
        },
        {
          nome: "Minha Carteira",
          tipo: "Carteira",
          saldoInicial: 49.51,
          receitas: 0.00,
          transferenciasCreditadas: 0.00,
          transferenciasDebitado: 0.00,
          despesas: 0.00,
          saldoAtual: 49.51,
          saldoPrevisto: 49.51
        }
      ]
    };
  },
  computed: {
    totalSaldo() {
      return this.contas.reduce((total, conta) => total + conta.saldoAtual, 0).toFixed(2);
    }
  },
  methods: {
    async fetchContas() {
      await fetchData('/api/contas', 'Erro ao buscar as contas, tente novamente.');
    }
  },
  created() {
    // Descomente a linha abaixo quando o backend estiver pronto
    // this.fetchContas();
  }
};
</script>

<style scoped>
/* Adicione o CSS customizado aqui, se necessário */
</style>
