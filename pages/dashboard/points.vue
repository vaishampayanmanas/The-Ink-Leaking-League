<template>
  <div class="page">
    <Sidebar :links="sidebarLinks" />
    <div class="content">
      <Goal @set-goal="goalSetterOpen = true" :goal="goal" :points="points" />
      <GoalSetter @close="goalSetterOpen = false" @set-goal="onSetGoal" v-show="goalSetterOpen"/>
      <!-- <ClientOnly>
        <Chart type="line" :data="chartData" :options="chartOptions" />
      </ClientOnly> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toast, Toaster } from 'vue-sonner';

const userStore = useUsersStore()

const goalSetterOpen = ref(false);

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

const goal = ref(user.value!.goal === -1 ? 0 : user.value!.goal);
const points = ref(userStore.userExtended?.points.reduce((acc, point) => acc + point.points, 0) || 0);

// const chartData = {
//   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//   datasets: [{
//     label: 'Your points',
//     data: [65, 59, 80, 81, 56, 55, 40],
//     fill: true,
//     borderColor: '#2ECC71',
//     backgroundColor: '#2ECC7122',
//     tension: 0.3,
//     pointStyle: 'circle',
//     pointRadius: 7,
//     pointHoverRadius: 10,
//     pointBackgroundColor: '#2ECC7188',
//     borderWidth: 2,
//   }]
// }

// const chartOptions = {
//   responsive: true,
//   maintainAspectRatio: true,
//   plugins: {
//     legend: {
//       display: true,
//       position: 'right',
//     },
//     title: {
//       display: true,
//       text: 'Points over time',
//       font: {
//         size: 30,
//         family: 'Luxurious Script',
//         weight: '100',
//         color: '#2f2f2f'
//       },
//     }
//   },

//   layout: {
//     padding: 5,
//   },
// }

const onSetGoal = async (goal: number) => {
  goalSetterOpen.value = false;
  try {
    await $fetch(`/api/auth/users/${user.value.id}`, {
      method: 'PATCH',
      headers: {
        auth: userStore.accessToken
      },
      body: {
        goal
      }
    })
    location.reload();
  } catch (err: any) {
    toast.error('Error setting goal', {
      description: 'We could not set your goal. Please try again later.',
      duration: 5000,
    });
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
  display: flex;
  flex-direction: row;
}

.content {
  width: 80vw;
  padding: 20px;
  background-color: $paper;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
}
</style>