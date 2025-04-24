<template>
  <div>
    <Sidebar :links="sidebarLinks" />
  </div>
</template>

<script lang="ts" setup>
const userStore = useUsersStore()

if (!userStore.loaded) {
  userStore.load()
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
let res;

await (async () => {
  res = await $fetch('/api/dashboard', {
    method: 'GET',
    headers: {
      auth: userStore.accessToken
    }
  });
})()

const user = ref(res!.data.user);
userStore.userExtended = user.value;

const sidebarLinks = [
  {
    to: '/dashboard',
    name: 'Dashboard',
    icon: 'chart-line'
  },
  {
    to: '/dashboard/friends',
    name: 'friends',
    icon: 'users'
  },
  {
    to: '/challenges',
    name: 'challenges',
    icon: 'clipboard-question'
  },
  {
    to: '/dashboard/responses',
    name: 'challenge responses',
    icon: 'file'
  },
  {
    to: '/dashboard/points',
    name: 'points',
    icon: 'star'
  },
  {
    to: '/messages',
    name: 'messages',
    icon: 'comments'
  },
  {
    to: '/settings',
    name: 'Settings',
    icon: 'gear'
  }
]
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
</style>