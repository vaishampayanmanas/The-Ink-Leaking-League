<template>
  <div class="actions">
    <button class="actions--submit" @click="emit('submit')">submit</button>
    <button type="button" class="actions--cancel" @click="emit('cancel')">cancel</button>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['submit', 'cancel'])
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

.actions {
  display: flex;
  gap: 60px;
  padding: 0 20px;

  &>button {
    flex-grow: 1;
    border: 0;
    padding: 5px;
    font-family: 'Roboto Mono';
    font-size: 1rem;
    color: $paper;
    margin-top: 30px;
    border-radius: 10px;
  }
  
  &--cancel {
    background-color: $error-red;
  }

  &--submit {
    background-color: $success-green;
  }
}
</style>