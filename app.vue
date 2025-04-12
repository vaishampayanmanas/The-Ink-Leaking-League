<template>
  <div class="app">
    <NuxtLayout />
    <NuxtPage />
    <Client-Only>
      <Toaster position="top-center" richColors />
    </Client-Only>
  </div>
</template>