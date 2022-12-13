<template>
  <div class="bg-base-200">
    <!-- main div for drawer -->
    <div class="drawer drawer-mobile">
      <input id="app-drawer" type="checkbox" class="drawer-toggle" />

      <!-- all in -->
      <div class="drawer-content flex flex-col items-center">
        <NavBar v-if="currentUser" />

        <!-- Page content here -->
        <div class="container mx-auto px-24 py-10 bg-base-200">
          <NuxtPage />

          <!-- i made dis -->
          <div class="grid place-items-center mt-4">
            <span class="text-xs"
              >i made dis.
              <a class="link" href="https://github.com/veib6247" target="_blank"
                >Github</a
              ></span
            >
          </div>
        </div>

        <Footer v-if="currentUser" />
      </div>

      <!-- drawer items -->
      <div class="drawer-side" v-if="currentUser">
        <label class="drawer-overlay" for="app-drawer"></label>
        <!-- Sidebar content here -->

        <!-- main container of the side drawer contents -->
        <aside class="w-80 bg-base-300">
          <!-- side title -->
          <div
            class="py-3 px-7 bg-neutral sticky top-0 bg-opacity-90 backdrop-blur z-20">
            <div class="prose">
              <h1 class="text-sky-400">
                Kobeni
                <div class="badge badge-accent">ALPHA</div>
              </h1>
            </div>
          </div>

          <div class="h-4"></div>

          <!-- APP MENUS -->
          <ul class="menu flex flex-col p-0 px-4">
            <li class="menu-title">
              <span>App Stuffs</span>
            </li>
            <li><NuxtLink to="/">Home</NuxtLink></li>
            <li>
              <NuxtLink to="/tomorrow">Tomorrow</NuxtLink>
            </li>
          </ul>

          <!-- PAYON MENUS -->
          <ul class="menu flex flex-col p-0 px-4">
            <li></li>
            <li class="menu-title">
              <span>PAY.ON Stuffs</span>
            </li>

            <!-- collapse for sub menus -->
            <div class="collapse collapse-arrow rounded-box">
              <input type="checkbox" />

              <div class="collapse-title">Setup</div>
              <div class="collapse-content">
                <li class="hover-bordered">
                  <NuxtLink to="/payon/config/widget-behaviour"
                    >Widget Behaviour</NuxtLink
                  >
                </li>
                <li class="hover-bordered">
                  <NuxtLink to="/payon/config/configure-merchant"
                    >Configure Merchant</NuxtLink
                  >
                </li>
              </div>
            </div>

            <li class="hover-bordered">
              <NuxtLink to="/payon/copyandpay">CopyandPay</NuxtLink>
            </li>
            <li class="hover-bordered">
              <NuxtLink to="/payon/server-to-server">Server-to-Server</NuxtLink>
            </li>
            <li class="hover-bordered">
              <NuxtLink to="/payon/backoffice">Backoffice</NuxtLink>
            </li>
            <li class="hover-bordered">
              <NuxtLink to="/payon/recurring">Recurring</NuxtLink>
            </li>
            <li class="hover-bordered">
              <NuxtLink to="/payon/reporting-api">Transaction Doko?</NuxtLink>
            </li>
            <li class="hover-bordered">
              <NuxtLink to="/payon/fmmid">Format Thy MID</NuxtLink>
            </li>
            <li class="hover-bordered">
              <NuxtLink to="/payon/resultcodes">Result Codes</NuxtLink>
            </li>
            <li class="hover-bordered">
              <NuxtLink to="/payon/webhook-decryptor"
                >Webhook Decryptor</NuxtLink
              >
            </li>
          </ul>

          <!-- PZ MENUS -->
          <ul class="menu flex flex-col p-0 px-4">
            <li></li>
            <li class="menu-title">
              <span>Paymentz Stuffs (UNDER CONSTRUCTION)</span>
            </li>

            <li class="hover-bordered"><a>Setup</a></li>
            <li class="hover-bordered"><a>Standard Checkout</a></li>
            <li class="hover-bordered"><a>Generate Auth Token</a></li>
            <li class="hover-bordered"><a>REST API</a></li>
            <li class="hover-bordered"><a>Backoffice</a></li>
          </ul>

          <!-- WL MENUS -->
          <ul class="menu flex flex-col p-0 px-4">
            <li></li>
            <li class="menu-title">
              <span>WL Stuffs (UNDER CONSTRUCTION)</span>
            </li>

            <li class="hover-bordered"><a>Setup</a></li>
            <li class="hover-bordered"><a>Hosted Payment Page</a></li>
            <li class="hover-bordered"><a>Server-to-server</a></li>
            <li class="hover-bordered"><a>Backoffice</a></li>
            <li class="hover-bordered"><a>Webhook Decryptor</a></li>
          </ul>
        </aside>
        <!-- end side drawer container -->
      </div>
    </div>
  </div>
</template>

<style>
  /* page transition */
  .page-enter-active,
  .page-leave-active {
    transition: all 0.3s;
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

  /** style the scrollbar for firefox */
  body {
    scrollbar-width: thin; /* "auto" or "thin" */
    scrollbar-color: hsl(220 13% 69%) black; /* scroll thumb and track */
  }
</style>

<script setup>
  import { getAuth, signOut } from 'firebase/auth'

  const currentUser = useState('currentUser', () => '')

  // set default states of the widget
  useState('autoLaunchWidget', () => true)

  //
  useState('selectedCardBrands', () => {
    return ['VISA', 'MASTER']
  })

  useState('selectedVirtualBrands', () => {
    return []
  })

  useState('selectedBankBrands', () => {
    return []
  })

  // default selected
  useState('selectedBrands', () => {
    return ['VISA', 'MASTER']
  })

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
  useState('payNowLabel', () => 'ლ(｀∀´ლ)  okane kudasai!!')
  useState('locale', () => 'en')

  // payon default params
  useState('referenceTransaction', () => '')
  useState('registrationId', () => '')
  useState('mode', () => 'Test')
  useState(
    'accessToken',
    () => 'OGE4Mjk0MTc0YjdlY2IyODAxNGI5Njk5MjIwMDE1Y2N8c3k2S0pzVDg='
  )
  useState('entityId', () => '8a8294174b7ecb28014b9699220015ca')
  useState('cnpModal', () => false)

  /**
   * yeets you out of the house
   */
  async function logout() {
    const auth = getAuth(firebaseApp)

    try {
      await signOut(auth)
      await navigateTo('/login')
    } catch (error) {
      console.error(error)
    }
  }

  /**
   *
   */
  onMounted(() => {
    // result URL for PAY.ON
    useState('shopperResultUrlPayon', () => {
      const currentURL = new URL(window.location.href)
      return `${currentURL.origin}/payon/shopperresulturl`
    })

    //
    useGetCurrentUser()
  })
</script>
