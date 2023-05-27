<script setup lang="ts">
  import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

  const appName = useState('appName')

  usePageHead('Login')

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
      console.error(error)
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
            <span class="text-sky-400 font-title"> {{ appName }} </span>
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
              <IconCross />
              <span>Login failed. Please check your credentials.</span>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>
