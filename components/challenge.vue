<template>
  <div class="challenge">
    <div class="challenge--overview">
      <div class="challenge--overview__challenge">
        <h2 class="challenge--overview__challenge____title">{{ challenge.title }}</h2>
        <p class="challenge--overview__challenge____title">due {{ (new Date(challenge.deadline)).toLocaleDateString(undefined, {
  weekday: 'long',
  day: '2-digit',
  month: 'long',
  year: 'numeric',
        }) }}</p>
      </div>

      <NuxtLink :to="`/challenges/${challenge.id}`">
        <FontAwesomeIcon 
      class="challenge--dropdown"
      :icon="['fas', 'caret-right']"
      size="2xl" />
      </NuxtLink>
      
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Challenge {
  id: number,
  title: string,
  deadline: string,
  description: string
}

const { challenge } = defineProps({
  challenge: {
    type: Object as PropType<Challenge>,
    required: true
  }
  })
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Luxurious+Script&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');

$ink: #2f2f2f;
$paper: #f5f5f5;
$gold: #ffb400;
$indigo: #4b0082;
$success-green: #2ECC71;
$cool-grey: #e8e8e8;
$error-red: #E74C3C;

.challenge {
  background-color: $paper;
  font-family: 'Roboto Mono';
  border-radius: 30px;
  color: $ink;

  &--overview {
    background-color: $cool-grey;
    padding: 10px 20px;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &--dropdown {
    margin-right: 10px;
    transition: color 0.7s ease;
    color: $ink;

    &:hover {
      color: $gold;
    }
  }
}
</style>