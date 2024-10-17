<template>
  <header class="mb-8">
    <div class="flex justify-between items-center">
      <h2 class="text-4xl font-semibold text-white mr-4">Dashboard</h2>
      <div class="bg-gray-800 rounded-lg shadow-md p-6 relative">
        <div class="flex space-x-8">
          <UserInfoDropdown @date-change="fetchDashboardData" />
        </div>
      </div>
    </div>
  </header>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <SaldoInicial :saldo="dashboardData.saldoInicial" />
    <SaldoAtual :saldo="dashboardData.saldoAtual" />
    <SaldoPrevisto :saldo="dashboardData.saldoPrevisto" />
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
    <CardContas :contas="dashboardData.contas" />
    <CardReceitas :receitas="dashboardData.receitas" />
    <CardDespesas :despesas="dashboardData.despesas" />
    <CardCartoesCredito :cartoes="dashboardData.cartoes" />
  </div>

  <!-- Expense Evolution Chart -->
  <div class="mt-8">
    <h3 class="text-2xl font-semibold mb-4 text-white">Evolução das Despesas</h3>
    <div class="bg-gray-800 rounded-lg shadow-md p-6 relative">
      <canvas ref="expenseChart" class="h-64"></canvas>
    </div>
  </div>

  <!-- Floating Action Button (FAB) -->
  <FloatingActionButton />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchData } from '@/services/apiService';
import { Chart, LineController, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import SaldoInicial from '../components/cards/SaldoInicial.vue';
import SaldoAtual from '../components/cards/SaldoAtual.vue';
import SaldoPrevisto from '../components/cards/SaldoPrevisto.vue';
import CardContas from '../components/cards/CardContas.vue';
import CardReceitas from '../components/cards/CardReceitas.vue';
import CardDespesas from '../components/cards/CardDespesas.vue';
import CardCartoesCredito from '../components/cards/CardCartoesCredito.vue';
import FloatingActionButton from '../components/FloatingActionButton.vue';
import UserInfoDropdown from '../components/UserInfoDropDown.vue';

Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const expenseChart = ref(null);
const dashboardData = ref({
  saldoInicial: 0,
  saldoAtual: 0,
  saldoPrevisto: 0,
  receitas: [],
  contas: [],
  despesas: [],
  cartoes: []
});

const fetchDashboardData = async (selectedDate) => {
  const dataParams = {
    month: selectedDate.month,
    year: selectedDate.year
  }
  dashboardData.value = await fetchData('/api/financas/dashboard', 'Erro ao buscar dados do dashboard, tente novamente.', dataParams);
};

onMounted(() => {
  // const ctx = expenseChart.value.getContext('2d');
  // const expenseData = generateExpenseData();

  // new Chart(ctx, {
  //   type: 'line',
  //   data: {
  //     labels: expenseData.map((item) => item.day),
  //     datasets: [
  //       {
  //         label: 'Despesas',
  //         data: expenseData.map((item) => item.expense),
  //         borderColor: 'rgb(248, 113, 113)',
  //         tension: 0.1,
  //         pointRadius: 0,
  //       },
  //     ],
  //   },
  //   options: {
  //     responsive: true,
  //     maintainAspectRatio: false,
  //     scales: {
  //       y: {
  //         beginAtZero: true,
  //         ticks: {
  //           color: 'rgba(255, 255, 255, 0.7)',
  //           callback: function (value) {
  //             return value.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL', maximumFractionDigits: 0});
  //           },
  //         },
  //         grid: {
  //           color: 'rgba(255, 255, 255, 0.1)',
  //         },
  //       },
  //       x: {
  //         ticks: {
  //           color: 'rgba(255, 255, 255, 0.7)',
  //         },
  //         grid: {
  //           color: 'rgba(255, 255, 255, 0.1)',
  //         },
  //       },
  //     },
  //     plugins: {
  //       legend: {
  //         display: false,
  //       },
  //     },
  //   },
  // });
});
</script>
