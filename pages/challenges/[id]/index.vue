<template>
  <div>
    <div v-if="found">
    <div class="top">
      <h1 v-if="challenge && 'title' in challenge">{{ challenge.title }}</h1>
      <div class="actions">
        <Client-Only>
        <button @click="onJoin()" v-if="!userInChallenge"><FontAwesomeIcon class="icon" :icon="['fas', 'right-to-bracket']" />Join</button>
        <button v-else><NuxtLink :to="`/challenges/${route.params.id}/upload`" ><FontAwesomeIcon class=icon :icon="['fas', 'upload']" />upload</NuxtLink></button>
          <button v-if="challengeOwner" @click="editFormRendered = true"><FontAwesomeIcon class="icon" :icon="['fas', 'pencil']" />Edit</button>
          <button v-if="challengeOwner" @click="deleteFormRendered = true"><FontAwesomeIcon class="icon" :icon="['fas', 'trash-can']" />Delete</button>
        </Client-Only>
      </div>
    </div>
    <Client-Only><p class="deadline" v-if="challenge && 'deadline' in challenge">due {{ new Date(challenge.deadline).toLocaleDateString(undefined, {
  weekday: 'long',
  month: 'long',
  day: '2-digit',
  year: 'numeric'
      }) }}</p></Client-Only>
      
      <h3 class="description--title">Description</h3>
      <p class="description" v-if="challenge && 'description' in challenge">{{ challenge.description }}</p>

      <div class="challenges--form" v-show="editFormRendered">
      <form @submit.prevent="onEdit()" class="challenges--form__form">
        <InputComp v-if="challenge && 'title' in challenge" v-model="newTitle" type="text" placeholder="Challenge Title" required />
        <Client-Only><InputComp v-if="challenge && 'deadline' in challenge" v-model="newDeadline" type="date" placeholder="Challenge Deadline" required /></Client-Only>
        
        
        <textarea v-if="challenge && 'description' in challenge" v-model="newDescription" placeholder="Challenge description"></textarea>
        <FormActions @cancel="editFormRendered = false"/>
      </form>
    </div>

    <div class="challenges--form" v-show="deleteFormRendered">
      <form @submit.prevent="onDelete()" class="challenges--form__form">
        <InputComp v-if="challenge && 'title' in challenge" v-model="password" type="password" placeholder="password" required />
        <FormActions @cancel="deleteFormRendered = false"/>
      </form>
    </div>
    
  </div>
    <notFound v-else />
  </div>
</template>

<script lang="ts" setup>
import { toast } from 'vue-sonner'

const userStore = useUsersStore();
const challengeStore = useChallengesStore();

const password = ref('');

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

interface Challenge {
  id: number;
  title: string;
  description: string;
  userId: number;
  deadline: Date;
  createdAt: Date;
  user: { username: string };
  participants: { username: string }[];
}

const route = useRoute();
const found: Ref<boolean> = ref(true);
const { data: challenge, refresh: refreshChallenge } = await useFetch<Challenge | { status: string; message: string }>(`/api/challenges/${route.params.id}`);
if (!challenge.value) {
  found.value = false;
}

const challengeOwner = challenge.value && 'user' in challenge.value && challenge.value.user.username === userStore.user?.username

const newTitle = ref(challenge.value && 'title' in challenge.value ? challenge.value.title : '');
const newDescription = ref(challenge.value && 'description' in challenge.value ? challenge.value.description : '');
let newDeadline: Ref<string> | undefined;
if (import.meta.client) {
  newDeadline = ref((new Date(challenge.value && 'deadline' in challenge.value ? challenge.value.deadline : '')).toISOString().slice(0, 10));
}
const editFormRendered = ref(false);
const deleteFormRendered = ref(false);

const onEdit = async function () {
  try {
    editFormRendered.value = false;
    await challengeStore.updateChallenge(Number(route.params.id), {
      title: newTitle.value,
      description: newDescription.value,
      deadline: new Date(newDeadline!.value),
    }, userStore.accessToken)
    refreshChallenge();
    toast.success('Edit completed successfully!');
    
  } catch {
    console.log('failed');
    toast.error('Edit failed!');
  }
}

const onDelete = async function () {
  try {
    editFormRendered.value = false;
    await challengeStore.deleteChallenge(Number(route.params.id), {
      password: password.value
    }, userStore.accessToken);
    toast.success('Successfully deleted challenge!')
  } catch {
    console.log('failed')
    toast.error('Failed to delete challenge');
  }
}

const onJoin = async function () {
  try {
    await challengeStore.joinChallenge(Number(route.params.id), userStore.accessToken);
    refreshChallenge();
    toast.success('Successfully joinned challenge!');
  } catch {
    console.log('failed');
    toast.error('Failed to join the challenge!');
  }
}

if (challenge.value && 'participants' in challenge.value) {
  console.log(challenge.value.participants);
}

const userInChallenge = computed(() => {
  if (challenge.value && 'participants' in challenge.value) {
    if (challenge.value.participants.map((obj) => obj.username).includes(userStore.user?.username || '')) {
      return true;
    }
    console.log();
    return false;
  } else {
    return false;
  }
});
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

@mixin buttons ($idx, $bg, $fg) {
  button:nth-child(#{$idx}) {
    border: 0;
    padding: 10px 20px;
    font-size: 16px;
    background-color: $bg;
    color: $fg;
    border-radius: 10px;
    transition: background-color 0.7s, transform 0.7s;

    &:hover {
      background-color: darken($bg, 10%);
      transform: scale(1.05);
    }
  }
}


h1, h3 {
  font-family: 'Luxurious Script';
  font-size: 48px;
  font-weight: 100;
  margin: 5px;
}

h3 {
  font-family: 'Roboto Mono';
  font-size: 24px;
  margin-top: 20px;
}

.deadline {
  background-image: linear-gradient(to bottom right, lighten($indigo, 25%), lighten($indigo, 50%));
  color: $paper;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  font-family: 'Roboto Mono';
  display: inline-block;
  margin: 5px;
}

.description {
  background-color: $paper;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: $ink;
  font-family: 'Roboto Mono';
  display: block;
  margin: 5px 20px;
}

.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 50px;
  padding: 0 40px 0 0;
}

.actions {
  display: flex;
  align-items: center;
  gap: 30px;

  @include buttons(1, $gold, $paper);
  @include buttons(2, #4e65e7, $paper);
  @include buttons(3, $error-red, $paper);
}

.icon {
  margin-right: 10px;
}

.challenges--form {
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

a {
  text-decoration: none;
  color: $ink;
  color: $paper;
}
</style>