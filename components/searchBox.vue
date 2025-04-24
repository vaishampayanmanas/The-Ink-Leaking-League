<template>
  <div class="search-box">
    <div class="search-box__input">
      <input type="text" placeholder="Search..." />
    </div>
    <div class="search-box__button">
      <button>Search</button>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped lang="scss">
$ink: #2f2f2f;
$paper: #f5f5f5;
$white: #ffffff;
$gold: #ffb400;

.search-box {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: $paper;
  gap: 10px;
}

.search-box__input {
  flex-grow: 1;
  padding: 5px;

  input {
    width: 100%;
    padding: 5px;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    color: $ink;
    background-color: $white;

    &:focus {
      outline: none;
      border-color: $gold;
    }
  }
}

.search-box__button {
  padding: 5px 10px;
  background-color: $gold;
  color: $white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
  font-family: 'Roboto Mono', monospace;
  font-weight: 700;
  margin-left: 10px;
}
</style>