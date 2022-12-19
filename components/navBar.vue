<script setup>
  import { getAuth, signOut } from 'firebase/auth'

  const currentUser = useState('currentUser')

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
</script>

<template>
  <div class="sticky top-0 z-20 bg-neutral bg-opacity-90 backdrop-blur w-full">
    <div class="navbar">
      <div class="navbar-start ml-12">
        <div class="prose lg:hidden">
          <h1 class="text-sky-400">
            Kobeni
            <div class="badge badge-accent">ALPHA</div>
          </h1>
        </div>
      </div>

      <div class="navbar-end mr-12 space-x-3">
        <span>{{ currentUser.email }}</span>
        <button class="btn btn-sm btn-warning gap-2" @click="logout">
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
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
          </svg>
          Sign Out
        </button>
      </div>
    </div>
  </div>
</template>
