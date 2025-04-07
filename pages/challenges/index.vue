<template>
  <div class="challenges">
    <div class="challenges--top">
      <h1 class="challenges--top__title">Challenges</h1>
      <button class="challenges--top__add" @click="formRendered = true"> <FontAwesomeIcon class="challenges--top__add___icon" :icon="['fas', 'plus']" /> Add</button>
    </div>
    <div class="challenges--list">
      <Challenge v-for="challenge in challengeStore.allChallenges" :challenge="challenge"/>
    </div>
    <div class="challenges--form" v-show="formRendered">
      <form @submit.prevent="onSubmit()" class="challenges--form__form">
        <!-- <input required type="text" v-model="title">
        <input required type="date" v-model="deadline"> -->
        <InputComp v-model="title" type="text" placeholder="Challenge Title" required />
        <InputComp v-model="deadline" type="date" placeholder="Challenge Deadline" required />
        <textarea v-model="description" placeholder="Challenge description"></textarea>
        <FormActions @cancel="formRendered = false"/>
      </form>
    </div>
    
  </div>
</template>

<script lang="ts" setup>
const challengeStore = useChallengesStore();
const userStore = useUsersStore();

if (!userStore.loaded && import.meta.client) {
  userStore.load();
  const validTokenRes = await useFetch('/api/auth/verify', {
    body: {
      auth: userStore.accessToken
    }
  });

  if (!validTokenRes.data.value?.validToken) {
    try {
      await userStore.refreshAccessToken();
    } catch {
      clearNuxtData('/auth/login');
      navigateTo('/auth/login');
    }
    
  }
}

await challengeStore.loadChallenges();

const formRendered: Ref<boolean> = ref(false);

const title = ref('');
const description = ref('');
const deadline = ref('');

const onSubmit = async function () {
  formRendered.value = false;

  await challengeStore.createChallenge({
    title: title.value,
    description: description.value,
    deadline: deadline.value
  }, userStore.accessToken);
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

.challenges {
  &--top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px 50px;

    &__title {
      font-family: 'Luxurious Script';
      font-weight: 100;
      font-size: 3rem;
    }

    &__add {
      border: 0;
      padding: 10px 30px;
      background-color: $cool-grey;
      color: $ink;
      transition: color 0.3s;

      &:hover {
        color: $gold;
      }
    }
  }

  &--form {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);

    &__form {
      margin: 30vh 20vw;
      background-color: $paper;
      display: flex;
      padding: 30px;
      flex-direction: column;
      justify-content: space-between;
      border-radius: 30px;
    }
  }
}

textarea {
  height: 40px;
  border: 0;
  resize: vertical;
  max-height: 40vh;
  margin-top: 10px;
  overflow-y: auto;
  padding: 10px;
  border-radius: 10px;
  font-family: 'Roboto Mono';
  color: $ink;

  &:focus {
    outline: 0;
  }
}

input {
  height: 20px;
  border: 0;
  margin-top: 10px;
  padding: 10px;
  border-radius: 10px;
  font-family: 'Roboto Mono';
  color: $ink;

  &:focus {
    outline: 0;
  }
}
</style>