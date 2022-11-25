// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Kobeni | Pull Yoself Togedah!',
      htmlAttrs: {
        'data-theme': 'dark',
      },
      link: [{ rel: 'icon', href: '/favicon.png' }],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
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
