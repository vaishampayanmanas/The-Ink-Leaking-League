<template>
  <div class="friend-card">
    <h1>{{ friend.name }}</h1>
    <p>{{ friend.points }}pts</p>
  </div>
</template>

<script lang="ts" setup>
interface Friend {
  name: string
  points: number
}

const { friend } = defineProps({
  friend: {
    type: Object as PropType<Friend>,
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

a {
  text-decoration: none;
}

.friend-card {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 2px 10px;
  background-color: $cool-grey;
  color: $ink;
  border-radius: 10px;
  text-decoration: none;

  & h1 {
    font-family: 'Roboto Mono', monospace;
    font-size: 1rem;
    font-weight: 100;
    color: $ink;
  }

  & p {
    font-family: 'Roboto Mono', monospace;
    font-size: 0.7rem;
    font-weight: 100;
    color: $ink;
    margin-right: 10px;
    color: $success-green;
  }
}
</style>