<script setup>
  definePageMeta({
    pageTitle: 'Kobeni | Generate AuthToken',
  })

  const currentUser = useState('currentUser')

  const mode = useState('pzMode')
  const partnerID = useState('partnerID')
  const merchantUsername = useState('merchantUsername')
  const merchantSecureKey = useState('merchantSecureKey')

  const isLoading = ref(false)
  const responseData = ref('')
  const authToken = useState('authToken')

  /**
   *
   */
  const generateToken = async () => {
    isLoading.value = true
    responseData.value = ''
    authToken.value = ''

    try {
      const { data } = await useFetch('/api/pz/generateAuthToken', {
        method: 'post',
        body: {
          mode: mode.value,
          partnerID: partnerID.value,
          merchantUsername: merchantUsername.value,
          merchantSecureKey: merchantSecureKey.value,
        },
      })

      responseData.value = data.value

      if (responseData.value.AuthToken) {
        authToken.value = responseData.value.AuthToken
      }
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }
</script>

<template>
  <div v-if="currentUser">
    <PageTitle title="Generate AuthToken">
      The AuthToken is needed for performing server-to-server transactions and
      backoffice operations. The token is valid for 1 hour, or you can generate
      a new one for every request.
    </PageTitle>

    <div class="flex flex-col gap-3">
      <div class="alert shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="stroke-info flex-shrink-0 w-6 h-6">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>
            The following data are directly taken from the
            <NuxtLink class="link" to="/paymentz/config"> Setup page </NuxtLink>
            . Modifying the information here will do the same in the setup.
          </span>
        </div>
      </div>

      <Input
        label="Partner/PSP ID"
        v-model="partnerID"
        @keyup.enter="generateToken" />

      <Input
        label="Merchant Username"
        v-model="merchantUsername"
        @keyup.enter="generateToken" />

      <Input
        type="password"
        label="Secure Key"
        v-model="merchantSecureKey"
        @keyup.enter="generateToken" />

      <button
        class="btn btn-primary"
        :class="{ loading: isLoading }"
        @click="generateToken">
        Generate Token
      </button>

      <Transition>
        <Textareadisplayonly
          label="Response Data"
          :data="responseData"
          v-if="responseData"></Textareadisplayonly>
      </Transition>

      <button
        v-if="responseData.AuthToken"
        class="btn w-full gap-2"
        @click="copyString(responseData.AuthToken)">
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
            d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
        </svg>
        AuthToken
      </button>
    </div>
  </div>

  <div class="flex" v-else>
    <button class="btn btn-ghost btn-block loading"></button>
  </div>
</template>
