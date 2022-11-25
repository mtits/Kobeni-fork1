<template>
  <div>
    <!-- main div for drawer -->
    <div class="drawer drawer-mobile">
      <input id="app-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col items-center">
        <!-- Page content here -->
        <div class="container mx-auto p-10">
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
              <h3 class="text-sky-400">Kobeni</h3>
            </div>
          </li>
          <li><NuxtLink to="/">Home</NuxtLink></li>
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
  .page-enter-active,
  .page-leave-active {
    transition: all 0.4s;
  }
  .page-enter-from,
  .page-leave-to {
    opacity: 0;
    filter: blur(1rem);
  }
</style>

<script setup>
  import { onMounted } from 'vue'

  // added external var as required by ACI to customize their widget
  onMounted(() => {
    const wpwlOptions = document.createElement('script')
    wpwlOptions.src = '/external.js'

    // append to head
    document.querySelector('head').append(wpwlOptions)
  })

  // payon params
  useState(
    'accessToken',
    () => 'OGE4Mjk0MTc0YjdlY2IyODAxNGI5Njk5MjIwMDE1Y2N8c3k2S0pzVDg='
  )

  useState('entityId', () => '8a8294174b7ecb28014b9699220015ca')
  useState('autoLaunchWidget', () => true)
  useState('cnpModal', () => false)

  useState('widgetStyle', () => 'plain')
</script>
