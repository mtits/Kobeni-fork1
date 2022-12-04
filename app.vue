<template>
  <div>
    <!-- main div for drawer -->
    <div class="drawer drawer-mobile">
      <input id="app-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col items-center">
        <!-- Page content here -->
        <div class="container mx-auto px-16 py-10">
          <div class="card bg-base-200 shadow-xl">
            <div class="card-body">
              <NuxtPage />
            </div>
          </div>
        </div>

        <Footer />
      </div>

      <!-- drawer items -->
      <div class="drawer-side">
        <label class="drawer-overlay" for="app-drawer"></label>

        <!-- Sidebar content here -->

        <!-- side title -->
        <div class="p-4 w-72 bg-base-200 sticky top-0 items-center">
          <div class="prose">
            <h1 class="text-sky-400">
              Kobeni
              <div class="badge">ALPHA</div>
            </h1>
          </div>
        </div>

        <!-- APP MENUS -->
        <ul class="menu menu-compact p-4 w-72 bg-base-200 text-base-content">
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li>
            <NuxtLink to="/tomorrow">Tomorrow</NuxtLink>
          </li>
        </ul>

        <!-- PAYON MENUS -->
        <ul class="menu menu-compact p-4 w-72 bg-base-200 text-base-content">
          <li class="menu-title">
            <div class="prose">
              <h3 class="text-sky-400 mt-4">PAY.ON Stuffs</h3>
            </div>
          </li>
          <li>
            <NuxtLink to="/config-payon">Setup</NuxtLink>
          </li>
          <li><NuxtLink to="/copyandpay">CopyandPay</NuxtLink></li>
          <li><NuxtLink to="/server-to-server">Server-to-Server</NuxtLink></li>
          <li><a>Backoffice</a></li>
          <li><a>Reporting API (trx doko?)</a></li>
          <li><a>Pay-by-link</a></li>
          <li><NuxtLink to="/fmmid">Format Thy MID</NuxtLink></li>
          <li><NuxtLink to="/resultcodes">Result Codes</NuxtLink></li>
          <li><a>Webhook Decryptor</a></li>
        </ul>

        <!-- PZ MENUS -->
        <ul class="menu menu-compact p-4 w-72 bg-base-200 text-base-content">
          <li class="menu-title">
            <div class="prose">
              <h3 class="text-sky-400">Paymentz Stuffs</h3>
            </div>
          </li>
          <li><a>Setup</a></li>
          <li><a>Standard Checkout</a></li>
          <li><a>Generate Auth Token</a></li>
          <li><a>REST API</a></li>
          <li><a>Backoffice</a></li>
        </ul>

        <!-- WL MENUS -->
        <ul class="menu menu-compact p-4 w-72 bg-base-200 text-base-content">
          <li class="menu-title">
            <div class="prose">
              <h3 class="text-sky-400">WL Stuffs</h3>
            </div>
          </li>
          <li><a>Setup</a></li>
          <li><a>Hosted Payment Page</a></li>
          <li><a>Server-to-server</a></li>
          <li><a>Backoffice</a></li>
          <li><a>Webhook Decryptor</a></li>
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

  // set default states of the widget
  useState('autoLaunchWidget', () => true)
  //
  useState('selectedBrands', () => {
    return ['MASTER', 'VISA']
  })
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
  useState('mode', () => 'Test')
  useState(
    'accessToken',
    () => 'OGE4Mjk0MTc0YjdlY2IyODAxNGI5Njk5MjIwMDE1Y2N8c3k2S0pzVDg='
  )
  useState('entityId', () => '8a8294174b7ecb28014b9699220015ca')
  useState('cnpModal', () => false)

  /**
   *
   */
  onMounted(() => {
    // result URL for PAY.ON
    useState('shopperResultUrlPayon', () => {
      const currentURL = new URL(window.location.href)
      return `${currentURL.origin}/shopperresulturl-payon`
    })
  })
</script>
