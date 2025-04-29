<template>
  <div class="page">
    <SearchBox @update="onSearch()" v-model="search" />

    <div class="results" v-if="searching">
      <FriendStack :friends="searches" />
    </div>

    <div class="no-search" v-else>
      <FontAwesomeIcon :icon="['fas', 'magnifying-glass']" />
      <p>Start searching. Find your friends and family write in this community! Know anyone? Search their username and start following them!</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Friend {
  name: string
  points: number
  link: string
}

const users = await $fetch('/api/auth/users');

const search = ref('');
const searching = ref(false);
const searches = ref([] as Friend[]);

const onSearch = function () {
  searching.value = true;
  search.value = search.value;
  if (search.value.length) {
    console.log('Searching for: ', search.value);
    searches.value = users.filter(user => user.username.includes(search.value)).map(user => ({
      name: user.username,
      points: user.points.map(point => point.points).reduce((acc, val) => acc + val, 0),
      link: `/profile/${user.username}`
    }));
  }
}
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

.page {
  background-color: $paper;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  padding: 20px;  
}

.no-search {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  color: $ink;

  svg {
    font-size: 7.6rem;
    margin-bottom: 1rem;
    color: $gold;
  }

  p {
    font-size: 3.5rem;
    text-align: center;
    max-width: 70vw;
    margin-top: 0.5rem;
    color: $ink;
    font-family: 'Luxurious Script';
  }
}
</style>