<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script lang="ts" setup>
import Chart, { type ChartType, type ChartData } from 'chart.js/auto';

const canvas = useTemplateRef('canvas');
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
  options: {
    type: Object,
    default: () => ({}),
  },
});

let chartInstance: Chart | null = null;

onMounted(() => {
  chartInstance = new Chart(canvas.value!, {
    type: props.type as ChartType,
    data: props.data as ChartData,
    options: props.options,
  });
});
</script>