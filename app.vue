<script setup lang="ts">
  const currentUser = useState('currentUser', () => '')
  const currentTheme = useState('currentTheme', () => 'dark')

  /**
   * check session for saved theme
   */
  const checkTheme = async () => {
    const { session, refresh } = await useSession()
    await refresh()

    if (session.value.theme != null) {
      console.info(`Switching to theme: ${session.value.theme}`)
      currentTheme.value = session.value.theme
    } else {
      console.log('No session theme, setting to default dark mode')
    }

    useHead({
      htmlAttrs: {
        'data-theme': currentTheme.value,
      },
    })
  }

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
    //
    checkTheme()

    // result URL for PAY.ON
    useState('shopperResultUrlPayon', () => {
      const currentURL = new URL(window.location.href)
      return `${currentURL.origin}/payon/shopperresulturl`
    })

    // result URL for PZ
    useState('merchantRedirectURL', () => {
      const currentURL = new URL(window.location.href)
      return `${currentURL.origin}/api/pz/redirect`
    })

    // firebase auth user watcher function
    useGetCurrentUser()
  })
</script>

<template>
  <div class="bg-base-300">
    <!-- main div for drawer -->
    <div class="drawer drawer-mobile">
      <input id="app-drawer" type="checkbox" class="drawer-toggle" />

      <!-- all in -->
      <div class="drawer-content flex flex-col items-center">
        <Transition>
          <NavBar v-if="currentUser" />
        </Transition>

        <!-- Page content here -->
        <div class="container mx-auto px-10 pt-5 pb-20">
          <!-- the actual page -->
          <NuxtPage />
        </div>

        <!-- <Transition>
          <Footer v-if="currentUser" />
        </Transition> -->
      </div>

      <!-- drawer items -->
      <div class="drawer-side w-72" v-if="currentUser">
        <label for="app-drawer" class="drawer-overlay"></label>

        <!-- container so that they all tuck in mobile -->
        <div class="bg-neutral">
          <div class="py-3 px-6 sticky top-0 bg-opacity-90 backdrop-blur z-20">
            <div class="prose">
              <h1 class="text-sky-400">
                Kobeni
                <span class="text-xs font-normal text-amber-400">ALPHA</span>
              </h1>
            </div>
          </div>

          <div>
            <!-- APP MENUS -->
            <MenuApps />

            <!-- PAYON MENUS -->
            <MenuPayon />

            <!-- PZ MENUS -->
            <MenuPaymentz />

            <!-- WL MENUS -->
            <!-- <MenuWL /> -->
          </div>

        </div>
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
</style>
