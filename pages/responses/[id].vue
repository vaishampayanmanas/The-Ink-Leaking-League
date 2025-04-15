<template>
  <div>
    <div v-if="response" class="page">
      <h1>{{ response.title }}</h1>
      <NuxtLink :to="response.fileUrl" target="_blank">
        <FontAwesomeIcon class="icon" :icon="['fas', 'cloud-arrow-down']" />
        download
      </NuxtLink>
        <h2>Comments</h2>
        <div v-if="response.reviews.length === 0">
          <p>No comments yet</p>
        </div>
        <div v-else>
          <ul>
            <li v-for="comment in comments" :key="comment.id">
              <Comment :rating="comment.rating" :review="comment.review" :username="comment.username" />
            </li>
          </ul>
        </div>
        <div class="comments--create" v-if="userStore.user">
          <StarRating v-model="newRating" :max="10" />
          <textarea v-model="newReview" placeholder="post a comment"></textarea>
          <button @click="addReview()">Submit</button>
        </div>
      </div>
    <div v-else class="page"><h1>Response not found</h1></div>
  </div>
</template>

<script lang="ts" setup>
import { toast } from 'vue-sonner'

const userStore = useUsersStore()
if (import.meta.client) {
  if (!userStore.loaded) {
    userStore.load();
  }

  const validTokenRes = await useFetch('/api/auth/verify', {
    method: 'GET',
    headers: {
      auth: userStore.accessToken
    }
  });

  if (!validTokenRes.data.value?.validToken) {
        try {
          await userStore.refreshAccessToken()
        } catch {
          localStorage.setItem('accessToken', '');
          localStorage.setItem('user', JSON.stringify(null));
          navigateTo({
          path: '/auth/login',
          query: {
            redirect: '/dashboard'
          }
        })
        }
    }
}

const responseId = useRoute().params.id;

const { data: response, refresh } = await useFetch(`/api/responses/${responseId}`);

const newReview = ref('');
const newRating = ref(0);

const addReview = async () => {
  try {
    const res = await $fetch('/api/responses/:id/comments', {
    method: 'POST',
    body: {
      review: newReview.value,
      responseId: responseId,
      rating: newRating.value
    },
    headers: {
      auth: userStore.accessToken
    }
    });
    toast.success('Review created successfully');
    refresh();
  } catch (error) {
    toast.error('Error while creating review. Please check your input');
  }
  
}

const comments = computed(() => response.value?.reviews.map((comment: any) => ({
  id: comment.id,
  rating: comment.rating,
  review: comment.review,
  username: comment.postedBy.username
})));

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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: $paper;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
}

h1 {
  font-family: 'Luxurious Script', cursive;
  font-size: 3.5rem;
  font-weight: 100;
  color: $ink;
}

a {
  text-decoration: none;
  color: $ink;
  font-family: 'Roboto Mono', monospace;
  font-size: 1rem;
  font-weight: 100;
  background-color: $cool-grey;
  padding: 0.7rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: lighten($cool-grey, 5%);
    color: $gold;

    .icon {
      color: $gold;
    }
  }

  .icon {
    margin-right: 0.5rem;
    font-size: 1rem;
    color: $ink;
    transition: all 0.3s ease;
  }
}

h2 {
  font-family: 'Luxurious Script', cursive;
  font-size: 2.5rem;
  font-weight: 100;
  color: $ink;
}

p {
  font-family: 'Roboto Mono', monospace;
  font-size: 1rem;
  font-weight: 100;
  color: $ink;
}

textarea {
  font-family: 'Roboto Mono', monospace;
  font-size: 1rem;
  font-weight: 100;
  color: $ink;
  background-color: $cool-grey;
  padding: 0.7rem;
  border-radius: 0.5rem;
  width: 100%;
  height: 6rem;
  resize: none;
}

button {
  font-family: 'Roboto Mono', monospace;
  font-size: 1rem;
  font-weight: 100;
  color: $ink;
  background-color: $cool-grey;
  padding: 0.7rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  border: 0;
  width: 100%;
  margin: 0;
  margin-top: 10px;

  &:hover {
    background-color: lighten($cool-grey, 5%);
    color: $gold;
  }
}

.comments--create {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 2rem 10vw;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>