<template>
  <Line :chart-data="chartData" :options="chartOptions" style="height: 100%"/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Line } from 'vue-chartjs';

export default defineComponent({
  name: 'BalancoDiarioLineChart',
  components: {
    Line
  },
  setup() {
    const daysInMonth = 30;
    const interval = 4;
    
    const generateData = () => {
      const data = [];
      for (let i = 0; i < daysInMonth; i++) {
        data.push(Math.floor(Math.random() * 1000));
      }
      return data;
    };

    const expenses = generateData();
    const revenues = generateData();
    
    const groupDataByInterval = (data: number[], interval: number) => {
      const groupedData = [];
      for (let i = 0; i < data.length; i += interval) {
        const chunk = data.slice(i, i + interval);
        const sum = chunk.reduce((acc, val) => acc + val, 0);
        groupedData.push(sum);
      }
      return groupedData;
    };

    const groupedExpenses = groupDataByInterval(expenses, interval);
    const groupedRevenues = groupDataByInterval(revenues, interval);

    const chartData = ref({
      labels: Array.from({ length: Math.ceil(daysInMonth / interval) }, (_, i) => `Dias ${i * interval + 1}-${(i + 1) * interval}`),
      datasets: [
        {
          label: 'Gastos',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          data: groupedExpenses,
          fill: false
        },
        {
          label: 'Receitas',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          data: groupedRevenues,
          fill: false
        }
      ]
    });

    const chartOptions = ref({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Intervalo de Dias'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Valores'
          }
        }
      }
    });

    return {
      chartData,
      chartOptions
    };
  }
});
</script>

<style scoped>
</style>
