// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        'data-theme': 'dark',
      },
      link: [{ rel: 'icon', href: '/favicon.png' }],
      script: [{ src: '/external.js' }, { src: '/jquery-3.6.1.min.js' }],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    keepalive: true,
  },

  router: {
    // https://router.vuejs.org/api/interfaces/routeroptions.html
    options: {
      linkActiveClass: 'active tab-active',
    },
  },

  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ['@sidebase/nuxt-session'],
})
