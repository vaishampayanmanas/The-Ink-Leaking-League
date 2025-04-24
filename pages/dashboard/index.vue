<template>
  <div class="dashboard">
    <Sidebar :links="sidebarLinks" />
    <div class="dashboard--content">
      <div class="dshboard--content__heading">
        <Client-Only>
          <h1 class="dashboard--content__heading___title">Hello, {{ user.username }}!
            <sup><span class="dashboard--content__heading___badge">{{ user.role }}</span></sup>
          </h1>
        </Client-Only>
        
      </div>
      <div class="dashboard--content__stats">
        <Client-Only>
        <Stats :stats="stats"/>
        </Client-Only>
      </div>
  </div>
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

const stats = ref([
  {
    name: 'Following',
    quantity: user.value.following.length,
    link: '/dashboard/friends'
  },
  {
    name: 'Points',
    quantity: userStore.totalPoints,
    link: '/dashboard/points'
  },
  {
    name: 'Challenges',
    quantity: user.value.challenges.length,
    link: '/challenges'
  },
  {
    name: 'responses',
    quantity: user.value.responses.length,
    link: '/dashboard/responses'
  },
])
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

.dashboard {
  display: flex;
  flex-direction: row;
  height: 100vh;

  &--content {
    padding: 20px;
    background-color: $paper;
    height: 70vh;
    width: 80vw;
    border-bottom-right-radius: 20px;

    &__heading {
      &___title {
        font-size: 3rem;
        font-weight: 700;
        color: #333;
        margin-bottom: 20px;
        font-family: 'Luxurious Script', cursive;
        font-weight: 100;
        display: inline;
      }
      

      &___badge {
        font-size: 0.8rem;
        font-weight: 900;
        color: $paper;
        background-color: #989898;
        padding: 5px;
        border-radius: 8px;
        margin-left: 10px;
        font-family: 'Roboto Mono', monospace;
        letter-spacing: 2px;

      }
    }
  }
}

</style>