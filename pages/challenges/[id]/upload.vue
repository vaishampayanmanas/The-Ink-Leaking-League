<template>
  <form @submit.prevent="handleSubmit()">
    <label @drop.prevent="handleDrop" class="input" @dragover.prevent="handlePreDrop">
      <input type="file" @input="handleFileInput" hidden />
      <div class="fileInput">
        <FontAwesomeIcon class="uploadIcon" :icon="['fas', 'upload']" size="lg" />
        {{ files[0]?.name || 'drag and drop a file or click to upload!' }}</div>
    </label>
    
    <inputComp v-model="title" type="text" placeholder="title" required />

    <button type="submit">submit</button>
  </form>
</template>

<script lang="ts" setup>
import { toast } from 'vue-sonner'

const userStore = useUsersStore()
if (import.meta.client) {
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
}

const { handleFileInput, files } = useFileStorage();

const route = useRoute();
const title = ref('');


const handlePreDrop = function (event: DragEvent) {
  if (event.dataTransfer?.files) {
    if (event.dataTransfer.files.length < 2) {
      event.preventDefault();
    }
  }
}

const handleDrop = function (event: DragEvent) {
  if (event.dataTransfer?.files) {
    const inputEvent = {
      target: { files: event.dataTransfer.files }
    }

    handleFileInput(inputEvent);
  }
}

const handleSubmit = async function () {
  try {
    const res = await $fetch(`/api/challenges/${route.params.id}/upload`, {
      method: 'POST',
      headers: {
        auth: userStore.accessToken
      },
      body: {
        file: files.value[0],
        title: title.value
      }
    });

    toast.success('Challenge complete!')
  } catch (error) {
    if ((error as { statusCode: number }).statusCode === 418) {
      toast.error('The server is a teapot and doesn\'t accept non-plain text. E.g. No Images or code/executables!')
    } else {
      toast.error('Upload failed! Make sure your responses have unique titles.')      
    }
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

:root {
  font-size: 1.2rem;
}

form {
  background-color: $cool-grey;
  padding: 20px;

  label {
    cursor: pointer;
    display: inline-block;

    div {
      padding: 18px 30px;
      border: 2px dashed $ink;
      border-radius: 10px;
      background-color: $cool-grey;
      font-family: 'Roboto Mono';
      font-size: 14px;
      transition: background-color 0.7s;

      .uploadIcon {
        color: $ink;
        transition: color 0.7s;
      }

      &:hover {
        background-color: $paper;
      }
    }
  }
}

div:hover > .uploadIcon {
  font-size: 1.2rem !important;
  color: $gold;
}

button {
  border: 0;
  padding: 10px 20px;
  background-color: $paper;
  color: $ink;
  font-family: 'Roboto Mono';
  font-size: 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: color 0.7s;
  margin-top: 20px;
  width: 100%;
  font-weight: bold;
  display: block;
  &:hover {
    color: $gold;
  }
}
</style>