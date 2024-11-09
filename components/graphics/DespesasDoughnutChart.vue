<template>
  <Doughnut :chart-data="chartData" :options="chartOptions" @click="onChartClick" />
  <div v-if="selectedCategory">
    <h3>{{ selectedCategory.label }}</h3>
    <p>{{ selectedCategory.value }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Doughnut } from 'vue-chartjs';

export default defineComponent({
  name: 'DoughnutChart',
  components: {
    Doughnut
  },
  setup() {
    const generateRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    const chartData = ref({
      labels: ['Alimentação', 'Transporte', 'Lazer', 'Educação', 'Saúde', 'Outros'],
      datasets: [
        {
          label: 'Gastos por Categoria',
          backgroundColor: Array(6).fill('').map(generateRandomColor),
          data: [500, 300, 200, 100, 400, 150]
        }
      ]
    });

    const chartOptions = ref({
      responsive: true,
      maintainAspectRatio: false
    });

    const selectedCategory = ref<{ label: string, value: number } | null>(null);

    const onChartClick = (event: MouseEvent, elements: any[]) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        selectedCategory.value = {
          label: chartData.value.labels[index],
          value: chartData.value.datasets[0].data[index]
        };
      }
    };

    return {
      chartData,
      chartOptions,
      selectedCategory,
      onChartClick
    };
  }
});
</script>

<style scoped>
</style>
