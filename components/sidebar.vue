<template>
  <div class="sidebar">
    <NuxtLink
      v-for="link in links"
      :key="link.to"
      :to="link.to"
      :class="`sidebar--link ${activeLink === link.to ? 'active' : ''}`">
      <FontAwesomeIcon
        v-if="link.icon"
        :icon="['fas', link.icon]"
        class="sidebar--link__icon" />
      {{ link.name }}
    </NuxtLink>
    
  </div>
</template>

<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

interface Link {
  to: string,
  name: string,
  icon?: string
}

const props = defineProps({
  links: {
    type: Array as PropType<Link[]>,
    required: true
  }
});

const activeLink = ref(window.location.pathname);
</script>

<style scoped lang=scss>
@import url('https://fonts.googleapis.com/css2?family=Luxurious+Script&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');

$ink: #2f2f2f;
$paper: #f5f5f5;
$gold: #ffb400;
$indigo: #4b0082;
$success-green: #2ECC71;
$cool-grey: #e8e8e8;
$error-red: #E74C3C;

.sidebar {
  width: 20vw;
  background-color: $cool-grey;
  padding: 20px;
  height: 70vh;
  border-bottom-left-radius: 20px;

  &--link {
    display: block;
    padding: 10px;
    text-decoration: none;
    color: $ink;
    font-family: 'Roboto Mono', monospace;
    font-size: 1.2rem;
    font-weight: 500;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    margin-bottom: 10px;

    &__icon {
      margin-right: 10px;
      font-size: 1.5rem;
      color: $ink;
      transition: color 0.3s ease;
    }

    &:hover,
    &.active {
      background-color: $paper;

      &>.sidebar--link__icon {
        color: $gold;
      }
    }
  }
}
</style>