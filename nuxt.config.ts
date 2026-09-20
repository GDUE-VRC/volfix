// https://nuxt.com/docs/api/configuration/nuxt-config
import process from 'node:process'
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  ssr: false,
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  modules: ['@nuxthub/core'],
  plugins: ['~/plugins/flyonui.client.ts'],
  css: ['~/assets/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  runtimeConfig: {
    manager_passwd: process.env.MANAGER_PASSWD,
    public: {
      backendUrl: process.env.BACKEND_URL,
    },
  },

  hub: {
    db: 'sqlite',
  },

  $development: {
    hub: {
      remote: 'production',
    },
  },
})
