<script setup>
  import { getAuth, signOut } from 'firebase/auth'

  const currentUser = useState('currentUser')
  const currentTheme = useState('currentTheme')

  /**
   * yeets you out of the house
   */
  const logout = async () => {
    const auth = getAuth(firebaseApp)

    try {
      await signOut(auth)

      console.info('Logging out...')

      await navigateTo('/login')
    } catch (error) {
      console.error(error)
    }
  }

  /**
   *
   */
  const changeTheme = async () => {
    const { refresh, update } = await useSession()
    await refresh()

    // set session theme in case of page refresh
    if (currentTheme.value == 'dark') {
      currentTheme.value = 'winter'
      await update({ theme: 'winter' })
    } else {
      currentTheme.value = 'dark'
      await update({ theme: 'dark' })
    }

    // use composable with the determined value from above
    useHead({
      htmlAttrs: {
        'data-theme': currentTheme.value,
      },
    })
  }
</script>

<template>
  <div class="sticky top-0 z-20 bg-neutral bg-opacity-90 backdrop-blur w-full">
    <div class="navbar px-32">
      <div class="navbar-start">
        <div class="prose lg:hidden">
          <h1 class="text-sky-400">
            Kobeni
            <div class="badge badge-accent">ALPHA</div>
          </h1>
        </div>
      </div>

      <div class="navbar-end">
        <!-- user settings dwopdown -->
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            {{ currentUser.email }}
          </label>
          <!--  -->
          <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-4">
            <Transition name="fade" mode="out-in">
              <li v-if="currentTheme == 'dark'">
                <a @click="changeTheme">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  </svg>

                  Light Mode
                </a>
              </li>

              <li v-else>
                <a @click="changeTheme">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                  </svg>

                  my eyes, it hurts
                </a>
              </li>
            </Transition>

            <li>
              <a @click="logout">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                </svg>
                Sign Out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
