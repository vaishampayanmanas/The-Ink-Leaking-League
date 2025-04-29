<template>
  <div class="cover" @click="$emit('close')">
    <h1>Set your new goal</h1>
    <p>Set your new goal and start working towards it. You can change it at any time.</p>
    <input @click.stop type="number" v-model="newGoal" placeholder="Enter your goal here" class="input--input" />
    <button @click="setGoal">save</button>
    
    <!-- <InputComp placeholder="Enter your goal here" :required="true" /> -->
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['set-goal', 'close']);
import { ref } from 'vue';

const newGoal = ref('');

const setGoal = () => {
  emit('set-goal', newGoal.value);
};

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

.cover {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: mix($ink, #0000, 70%);
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;

  h1 {
    font-family: 'Luxurious Script', cursive;
    font-size: 4rem;
    color: $paper;
    margin-bottom: 2rem;
    font-weight: 100;
  }
  p {
    font-family: 'Roboto Mono', monospace;
    font-size: 1rem;
    color: $paper;
    margin-bottom: 2rem;
    text-align: center;
  }
  .input--input {
    font-family: 'Roboto Mono', monospace;
    font-size: 1rem;
    color: $ink;
    background-color: $paper;
    padding: 1rem;
    border-radius: 10px;
    border: none;
    width: 50%;
    margin-bottom: 2rem;
    outline: none;
  }
}

button {
    font-family: 'Roboto Mono', monospace;
    font-size: 1rem;
    color: $ink;
    background-color: $gold;
    color: $paper;
    padding: 1rem;
    border-radius: 10px;
    border: none;
    width: 50%;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: $indigo;
      color: $paper;
      transform: scale(1.05);
    }
}
</style>