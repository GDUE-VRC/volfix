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
  modules: ['@nuxthub/core', 'reka-ui/nuxt', '@nuxt/icon'],
  css: ['~/assets/main.css'],

  icon: {
    mode: 'css',
    cssLayer: 'base',
    clientBundle: {
      scan: true,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  runtimeConfig: {
    manager_passwd: process.env.MANAGER_PASSWD,
  },

  hub: {
    db: 'sqlite',
  },
})
