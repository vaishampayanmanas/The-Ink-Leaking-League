<template>
  <div class="stack" v-if="friends.length">
    <div class="friends">
      <FriendCard v-for="friend in displayedFriends" :key="friend.name" :friend="friend" />
    </div>

    <div class="pageControl">
      <button :disabled="page === 1" @click="changePage(page - 1)">previous</button>
      <p class="page">page {{ page }} of {{ maxPage }}</p>
      <button :disabled="page === maxPage" @click="changePage(page + 1)">next</button>
    </div>    
  </div>

  <p v-else>No one!</p>
</template>

<script lang="ts" setup>
interface Friend {
  name: string
  points: number
  link: string
}

const { friends } = defineProps({
  friends: {
    type: Array as PropType<Friend[]>,
    required: true
  }
})

const page = ref(1);
const limit = 4;

const maxPage = computed(() => Math.ceil(friends.length / limit));

const displayedFriends = computed(() => {
  const start = (page.value - 1) * limit;
  const end = start + limit;
  return friends.slice(start, end);
})

const changePage = (newPage: number) => {
  if (maxPage.value >= newPage && newPage > 0) {
    page.value = newPage;
  }
}
</script>

<style scoped lang="scss">
$ink: #2f2f2f;
$paper: #f5f5f5;
$gold: #ffb400;
$indigo: #4b0082;
$success-green: #2ECC71;
$cool-grey: #e8e8e8;
$error-red: #E74C3C;

.stack {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;

  .friends {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .pageControl {
    display: flex;
    gap: 10%;
    align-items: center;
    background-color: $paper;
    border-radius: 10px;

    button {
      padding: 5px 10px;
      background-color: $indigo;
      color: $paper;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      flex-grow: 1;
      font-family: 'Roboto Mono', monospace;
      transition: background-color 0.3s;

      &:hover {
        background-color: lighten($indigo, 10%);
      }

      &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }
    }
  }
}

p {
      font-family: 'Roboto Mono', monospace;
      font-size: 1rem;
      font-weight: 100;
      color: $ink;
    }
</style>