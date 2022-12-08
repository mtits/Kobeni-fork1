<template>
  <div class="">
    <PageTitle title="sorry, new phone, who dis?">
      Kobeni requires you to login
    </PageTitle>

    <div class="grid place-items-center">
      <div class="w-96 h-96">
        <Input label="Email Address" v-model="email" />
        <Input type="password" label="Password" v-model="password" />

        <button
          class="btn mt-6 w-full"
          :class="{ loading: isLoading }"
          @click="login">
          Login
        </button>

        <!-- alert for failed logins -->
        <Transition>
          <div class="alert alert-error shadow-lg mt-6" v-if="isLoginFailed">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Login failed. Please check your credentials.</span>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

  definePageMeta({
    pageTitle: 'Kobeni | Login',
  })

  const email = ref('')
  const password = ref('')
  const isLoading = ref(false)
  const isLoginFailed = ref(false)

  const router = useRouter()

  /**
   *
   */
  async function login() {
    isLoading.value = true
    isLoginFailed.value = false

    const auth = getAuth(firebaseApp)

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.value,
        password.value
      )

      if (userCredential.user) {
        router.push({ path: '/' })
      }
    } catch (error) {
      isLoginFailed.value = true
      console.error({ errorCode: error.code, errorMessage: error.message })
    } finally {
      isLoading.value = false
    }
  }
</script>
