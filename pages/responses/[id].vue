<template>
  <div>
    <div v-if="response" class="page">
      <h1>{{ response.title }}</h1>
      <NuxtLink :to="response.fileUrl">download</NuxtLink>
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

const { data: response } = await useFetch(`/api/responses/${responseId}`);

console.log(response.value);

</script>

<style>

</style>