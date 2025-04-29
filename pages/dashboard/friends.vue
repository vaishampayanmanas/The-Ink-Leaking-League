<template>
  <div class="page">
    <Sidebar :links="sidebarLinks" />
    <div class="content">
      <SearchBox @update="onSearch($event)" />
      <ClientOnly >
        <Stats :stats="stats"/>
      </ClientOnly>
      <div class="friends">
        <FriendStack :friends="followers" />
        <FriendStack :friends="followers" />
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
    name: 'Followers',
    quantity: user.value.followers.length,
  },
  {
    name: 'Following',
    quantity: user.value.following.length,
  },
]);


const followers = ref([
  {
    name: 'John Doe',
    points: 150,
    link: '/profile/johndoe'
  },
  {
    name: 'Jane Smith',
    points: 200,
    link: '/profile/janesmith'
  },
  {
    name: 'Alice Johnson',
    points: 300,
    link: '/profile/alicejohnson'
  },
  {
    name: 'Bob Brown',
    points: 250,
    link: '/profile/bobbrown'
  },
  {
    name: 'Charlie Green',
    points: 250,
    link: '/profile/bobbrown'
  },
  {
    name: 'Emily Yellow',
    points: 250,
    link: '/profile/charliegreen'
  },
  {
    name: 'David Black',
    points: 180,
    link: '/profile/davidblack'
  },
  {
    name: 'Eve White',
    points: 220,
    link: '/profile/evewhite'
  },
  {
    name: 'Frank Blue',
    points: 270,
    link: '/profile/frankblue'
  },
  {
    name: 'Grace Purple',
    points: 290,
    link: '/profile/gracepurple'
  },
  {
    name: 'Hannah Orange',
    points: 310,
    link: '/profile/hannahorange'
  },
  {
    name: 'Ian Pink',
    points: 330,
    link: '/profile/ianpink'
  },
  {
    name: 'Jack Grey',
    points: 350,
    link: '/profile/jackgrey'
  },
  {
    name: 'Kathy Cyan',
    points: 370,
    link: '/profile/kathycyan'
  },
  {
    name: 'Leo Magenta',
    points: 390,
    link: '/profile/leomagenta'
  },
  {
    name: 'Mia Brown',
    points: 410,
    link: '/profile/miabrown'
  },
  {
    name: 'Nina Teal',
    points: 430,
    link: '/profile/ninateal'
  },
]);

const onSearch = function (search: string) {
  navigateTo({
    path: '/profile/search',
    query: {
      search: search
    }
  })
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
  display: flex;
  flex-direction: row;
}

.content {
  width: 80vw;
  padding: 20px;
  background-color: $paper;
  border-bottom-right-radius: 20px;
}

.friends {
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 100%;
  margin-top: 10px;
}
</style>