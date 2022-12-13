<template>
  <div class="px-96">
    <div class="card bg-base-300 shadow-xl">
      <div class="card-body">
        <div class="grid place-items-center">
          <PageTitle title="Kobeni"> </PageTitle>

          <p>sorry, new phone, hu dis?</p>

          <div class="w-96 h-96">
            <Input label="Email Address" v-model="email" @keyup.enter="login" />

            <Input
              type="password"
              label="Password"
              v-model="password"
              @keyup.enter="login" />

            <button
              class="btn mt-6 w-full"
              :class="{ loading: isLoading }"
              @click="login">
              Sign In
            </button>

            <!-- alert for failed logins -->
            <Transition>
              <div
                class="alert alert-error shadow-lg mt-6"
                v-if="isLoginFailed">
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
    </div>
  </div>
</template>

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
        await navigateTo('payon/copyandpay')
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
