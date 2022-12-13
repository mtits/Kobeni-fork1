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
        <button class="btn btn-sm btn-warning" @click="logout">Sign Out</button>
      </div>
    </div>
  </div>
</template>
