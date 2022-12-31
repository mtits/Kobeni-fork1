<script setup>
  const currentUser = useState('currentUser', () => '')
  const currentTheme = useState('currentTheme', () => 'dark')

  /**
   *
   */
  const checkCurrentTheme = async () => {
    // check session for saved theme
    const { session, refresh } = await useSession()
    await refresh()

    if (session.value.theme) {
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

  //
  checkCurrentTheme()

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
        <div class="container mx-auto px-32 py-10 bg-base-300">
          <!-- the actual page -->
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

        <!-- main container of the side drawer contents -->
        <aside class="w-72 bg-base-300">
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
          <MenuApps />

          <!-- PAYON MENUS -->
          <MenuPayon />

          <!-- PZ MENUS -->
          <MenuPaymentz />

          <!-- WL MENUS -->
          <MenuWL />

          <div class="h-4"></div>
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
