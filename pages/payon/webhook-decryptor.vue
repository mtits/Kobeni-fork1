<script setup>
  useHead({
    title: 'Kobeni | Webhook Decrytor',
  })

  const currentUser = useState('currentUser')

  const secretFromConfiguration = ref('')
  const ivfromHttpHeader = ref('')
  const authTagFromHttpHeader = ref('')
  const httpBody = ref('')

  const showLoading = ref(false)
  const responseData = ref('')

  /**
   *
   */
  const decryptData = async () => {
    showLoading.value = true
    responseData.value = ''

    try {
      const { data } = await useFetch('/api/payon/decryptor', {
        method: 'post',
        body: {
          secretFromConfiguration: secretFromConfiguration.value,
          ivfromHttpHeader: ivfromHttpHeader.value,
          authTagFromHttpHeader: authTagFromHttpHeader.value,
          httpBody: httpBody.value,
        },
      })

      responseData.value = data.value
    } catch (error) {
      console.error(error)
    } finally {
      showLoading.value = false
    }
  }
</script>

<template>
  <div v-if="currentUser">
    <PageTitle title="쟤네 못봤겠지?">
      Webhooks are managed in the BIP under
      <span class="italic font-medium">Administration > Webhooks</span>.
    </PageTitle>

    <div class="flex flex-col space-y-3">
      <Input label="Secret" type="password" place-holder="my roommate eats pizza in the shower"
        helper-text="Found in the BIP admin settings" v-model="secretFromConfiguration" />

      <Input label="Initialization Vector" place-holder="e.g. C4FD0D6CB07AE3DF6F7B239E"
        helper-text="x-initialization-vector - found in the HTTP header" v-model="ivfromHttpHeader" />

      <Input label="Authentication Tag" place-holder="e.g. 54CA208CB4A0F8227738E96D6AB61361"
        helper-text="x-authentication-tag - found in the HTTP header" v-model="authTagFromHttpHeader" />

      <Textarea label="HTTP Body" v-model="httpBody"></Textarea>

      <button class="btn btn-primary" :class="{ loading: showLoading }" @click="decryptData">
        싸우러 가자
      </button>

      <Transition>
        <Textareadisplayonly label="Response Data" :is-json="true" :data="responseData" v-if="responseData">
        </Textareadisplayonly>
      </Transition>

      <Transition>
        <button class="btn gap-2" v-if="responseData" @click="copyEntireResponse(responseData)">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
          </svg>
          Decrypted Data
        </button>
      </Transition>
    </div>
  </div>

  <LoadingDisplay v-else />
</template>
