<template>
  <div class="sticky top-0 z-20 bg-neutral bg-opacity-90 backdrop-blur w-full">
    <div class="navbar">
      <div class="navbar-start ml-12">
        <!-- <a class="btn btn-ghost normal-case">{{ currentUser.email }}</a> -->
      </div>

      <div class="navbar-end mr-12 space-x-3">
        <div class="form-control">
          <label class="input-group">
            <input
              type="text"
              class="input input-sm"
              :value="currentUser.email"
              readonly />
            <button class="btn btn-sm btn-warning" @click="logout">
              Sign Out
            </button>
          </label>
        </div>
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
