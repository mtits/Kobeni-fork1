// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        'data-theme': 'dark',
      },
      link: [{ rel: 'icon', href: '/favicon.png' }],
      script: [{ src: '/external.js' }],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    keepalive: true,
  },

  router: {
    // https://router.vuejs.org/api/interfaces/routeroptions.html
    options: {
      linkActiveClass: 'active',
    },
  },

  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
