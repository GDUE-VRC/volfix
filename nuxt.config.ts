// https://nuxt.com/docs/api/configuration/nuxt-config
import process from 'node:process'
import tailwindcss from '@tailwindcss/vite'

const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.POSTGRESQL_URL

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  ssr: true,
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  modules: ['@nuxthub/core', 'reka-ui/nuxt', '@nuxt/icon', 'nuxt-auth-utils', '@nuxtjs/color-mode'],
  css: ['~/assets/main.css'],

  colorMode: {
    classSuffix: '',
  },

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
    cap_secret: process.env.CAP_SECRET || process.env.NUXT_SESSION_PASSWORD,
  },

  hub: {
    db: {
      dialect: 'postgresql',
      ...(databaseUrl
        ? { driver: 'neon-http' }
        : { applyMigrationsDuringBuild: false }),
    },
  },
})
