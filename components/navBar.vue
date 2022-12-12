<template>
  <div class="sticky top-0 z-20 bg-base-300 bg-opacity-90 backdrop-blur w-full">
    <div class="navbar">
      <div class="flex-1">
        <!-- <a class="btn btn-ghost normal-case text-xl">Hola</a> -->
      </div>

      <div class="flex-none mx-8">
        <ul class="menu menu-horizontal px-3 space-x-3">
          <li>
            <a class="link">{{ currentUser.email }}</a>
          </li>
          <li><a class="btn btn-secondary" @click="logout">Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { getAuth, signOut } from 'firebase/auth'

  const currentUser = useState('currentUser')

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
</script>
