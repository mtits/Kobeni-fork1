<script setup>
  const currentUser = useState('currentUser', () => '')

  // widget params
  useInitWidgetStates()

  // payon default params
  useInitPayonStates()

  // init the pz stuffs
  useInitPaymentzStates()

  /**
   *
   */
  onMounted(() => {
    // result URL for PAY.ON
    useState('shopperResultUrlPayon', () => {
      const currentURL = new URL(window.location.href)
      return `${currentURL.origin}/payon/shopperresulturl`
    })

    // result URL for PZ
    useState('merchantRedirectURL', () => {
      const currentURL = new URL(window.location.href)
      return `${currentURL.origin}/paymentz/merchantRedirectURL`
    })

    //
    useGetCurrentUser()
  })
</script>

<template>
  <div class="bg-base-200">
    <!-- main div for drawer -->
    <div class="drawer drawer-mobile">
      <input id="app-drawer" type="checkbox" class="drawer-toggle" />

      <!-- all in -->
      <div class="drawer-content flex flex-col items-center">
        <Transition>
          <NavBar v-if="currentUser" />
        </Transition>

        <!-- Page content here -->
        <div class="container mx-auto pl-24 pr-64 py-10 bg-base-200">
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
        <Transition>
          <Footer v-if="currentUser" />
        </Transition>
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
            <li>
              <NuxtLink class="" to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>

                Home
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/tomorrow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                </svg>

                Tomorrow
              </NuxtLink>
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

              <div class="collapse-title flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />

                  <span>Thingy</span>
                </svg>
                <span> Setup </span>
              </div>
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

            <li class="hover-bordered">
              <NuxtLink to="/paymentz/config">Setup</NuxtLink>
            </li>

            <li class="hover-bordered">
              <NuxtLink to="/paymentz/standardcheckout"
                >Standard Checkout</NuxtLink
              >
            </li>
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
