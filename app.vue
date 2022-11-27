<template>
  <div>
    <!-- main div for drawer -->
    <div class="drawer drawer-mobile">
      <input id="app-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col items-center">
        <!-- Page content here -->
        <div class="container mx-auto px-20 pt-5 pb-20">
          <NuxtPage />
        </div>

        <Footer />
      </div>

      <!-- drawer items -->
      <div class="drawer-side">
        <label for="app-drawer" class="drawer-overlay"></label>
        <ul class="menu p-4 w-80 bg-base-200 text-base-content">
          <!-- Sidebar content here -->

          <!-- APP MENUS -->
          <li class="menu-title">
            <div class="prose">
              <h3 class="text-sky-400">KOBENI - Keep Trying</h3>
            </div>
          </li>
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li>
            <NuxtLink to="/tomorrow">Tomorrow... and the soundboard</NuxtLink>
          </li>

          <li></li>

          <!-- PAYON MENUS -->
          <li class="menu-title">
            <div class="prose">
              <h3 class="text-sky-400">PAY.ON Stuffs</h3>
            </div>
          </li>
          <li>
            <NuxtLink to="/config-payon">Setup</NuxtLink>
          </li>
          <li><NuxtLink to="/copyandpay">CopyandPay</NuxtLink></li>
          <li><a>Server-to-Server</a></li>
          <li><NuxtLink to="/resultcodes">Result Codes</NuxtLink></li>
          <li></li>

          <!-- PZ MENUS -->
          <li class="menu-title">
            <div class="prose">
              <h3 class="text-sky-400">Paymentz Stuffs</h3>
            </div>
          </li>
          <li><a>Standard Checkout</a></li>
          <li><a>REST API</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
  /* page transition */
  .page-enter-active,
  .page-leave-active {
    transition: all 0.4s;
  }
  .page-enter-from,
  .page-leave-to {
    opacity: 0;
    filter: blur(1rem);
  }

  /* component transitions */
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>

<script setup>
  import { onMounted } from 'vue'

  useHead({
    title: 'Kobeni | Pull Yoself Togedah!',
  })

  // set default states of the widget
  useState('autoLaunchWidget', () => true)
  //
  useState('widgetStyle', () => 'plain')
  useState('maskCvv', () => true)
  useState('requireCvv', () => true)
  useState('showCVVHint', () => false)
  useState('allowEmptyCvv', () => false)
  useState('validation', () => true)
  useState('showLabels', () => true)
  useState('showPlaceholders', () => true)
  useState('disableCardExpiryDateValidation', () => false)

  // payon default params
  useState(
    'accessToken',
    () => 'OGE4Mjk0MTc0YjdlY2IyODAxNGI5Njk5MjIwMDE1Y2N8c3k2S0pzVDg='
  )
  useState('entityId', () => '8a8294174b7ecb28014b9699220015ca')
  useState('cnpModal', () => false)

  onMounted(() => {
    // create and link external js to head, the nuxt.config.ts doesn't work, dammit
    // const wpwl = document.createElement('script')
    // wpwl.src = '/external.js'
    // document.querySelector('head').append(wpwl)

    // result URL for PAY.ON
    useState('shopperResultUrlPayon', () => {
      const currentURL = new URL(window.location.href)
      return `${currentURL.origin}/shopperresulturl-payon`
    })

    // console.log(wpwlOptions)
  })
</script>
