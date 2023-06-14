// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },

        {
          name: 'description',
          content:
            'Test your PAY.ON and Paymentz transaction integrations here!',
        },

        {
          charset: 'utf-8',
        },
      ],
      link: [{ rel: 'icon', href: '/favicon.png' }],
      script: [{ src: '/external.js' }, { src: '/jquery-3.6.1.min.js' }],
    },
    keepalive: true,
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  router: {
    // https://router.vuejs.org/api/interfaces/routeroptions.html
    options: {
      // hashMode: true,
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
