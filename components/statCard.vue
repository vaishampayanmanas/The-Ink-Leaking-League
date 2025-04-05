<template>
  <div @click="openPage()" class="stat-card">
    <div class="stat-card__header">
      <h3>{{ stat.name }}</h3>
      <p>{{ stat.quantity }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Stat {
  name: string
  quantity: number
  link?: string
}

const { stat } = defineProps({
  stat: {
    type: Object as PropType<Stat>,
    required: true
  }
});

const openPage = function() {
  if (stat.link) {
    navigateTo(stat.link)
  }
}
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');
$ink: #2f2f2f;
$paper: #f5f5f5;
$gold: #ffb300;

.stat-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  transition: all 0.3s ease;

  &:hover {
    flex-grow: 1.4;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    background-image: radial-gradient(circle, $paper 0%, #f8e3b1 50%, #fed67b 75%, $gold 100%);
  }
}

h3 {
  font-family: 'Roboto Mono', monospace;
  font-size: 1.5rem;
  font-weight: 100;
  color: $ink;
}

p {
  font-family: 'Roboto Mono', monospace;
  font-size: 1.2rem;
  font-weight: 100;
  color: $ink;
}
</style>