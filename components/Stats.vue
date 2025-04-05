<template>
  <div class="stats">
    <StatCard
      v-for="stat in stats"
      :key="stat.name"
      :stat="stat" />
  </div>
</template>

<script lang="ts" setup>
interface Stat {
  name: string
  quantity: number
  link?: string
}

const { stats } = defineProps({
  stats: {
    type: Array as PropType<Stat[]>,
    required: true
  }
});
</script>

<style scoped lang="scss">

.stats {
  display: flex;
  flex-wrap: wrap;
  justify-content:space-around;
  gap: 1rem;
}
</style>