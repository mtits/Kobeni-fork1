<script setup>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

definePageMeta({
  pageTitle: 'Kobeni | Login',
})

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const isLoginFailed = ref(false)

/**
 *
 */
const login = async () => {
  isLoading.value = true
  isLoginFailed.value = false

  const auth = getAuth(firebaseApp)

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    )

    // validate if user exist on login
    if (userCredential.user) {
      // await navigateTo('payon/copyandpay')
      await navigateTo('/')
    }

    //
  } catch (error) {
    isLoginFailed.value = true
    console.error({ errorCode: error.code, errorMessage: error.message })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="flex flex-col place-items-center">
    <!-- card -->
    <div class="card w-96 bg-base-200 shadow-xl">
      <div class="card-body place-items-center">
        <div class="prose">
          <h1>
            <span class="text-sky-400"> Kobeni </span>
          </h1>
        </div>
        <p class="italic text-sm">sorry, new phone, hu dis?</p>

        <div></div>

        <Input label="Email Address" v-model="email" @keyup.enter="login" />

        <Input type="password" label="Password" v-model="password" @keyup.enter="login" />

        <button class="btn btn-primary w-full" :class="{ loading: isLoading }" @click="login">
          <span> Sign In </span>
        </button>

        <!-- forgot password link -->
        <div class="tooltip tooltip-bottom" data-tip="Beware of the Ostrich">
          <a href="https://www.youtube.com/watch?v=8X_Ot0k4XJc" class="link text-sm">
            Forgot Password?
          </a>
        </div>

        <!-- alert for failed logins -->
        <Transition>
          <div class="alert alert-error shadow-lg mt-6" v-if="isLoginFailed">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
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
