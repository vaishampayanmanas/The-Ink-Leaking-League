export default defineNuxtPlugin(async (nuxtApp) => {
    if (import.meta.client) {
        const { Toaster } = await import('vue-sonner')
        nuxtApp.vueApp.component('Toaster', Toaster);
    }
    
})
