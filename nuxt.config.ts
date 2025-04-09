// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['nuxt-file-storage', '@prisma/nuxt', '@pinia/nuxt', '@pinia/colada-nuxt'],
  fileStorage: {
    mount: 'C:/Users/Manas/OneDrive/Desktop/vscode projects/TheInkLeakingLeague/public'
  },
  routeRules: {
    '/dashboard/**': { ssr: false },
    '/dashboard/': { ssr: false },
  }
})
