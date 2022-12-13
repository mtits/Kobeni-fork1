<script setup>
  definePageMeta({
    pageTitle: 'Kobeni | Webhook Decrytor',
  })

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

  /**
   *
   */
  onMounted(() => {
    useGetCurrentUser()
  })
</script>

<template>
  <div>
    <PageTitle title="쟤네 못봤겠지?">
      Webhooks are managed in the BIP under
      <span class="italic font-medium">Administration > Webhooks</span>.
    </PageTitle>

    <Input
      label="Secret"
      type="password"
      helper-text="Found in the BIP admin settings"
      v-model="secretFromConfiguration" />

    <Input
      label="Initialization Vector"
      place-holder="e.g. C4FD0D6CB07AE3DF6F7B239E"
      helper-text="x-initialization-vector - found in the HTTP header"
      v-model="ivfromHttpHeader" />

    <Input
      label="Authentication Tag"
      place-holder="e.g. 54CA208CB4A0F8227738E96D6AB61361"
      helper-text="x-authentication-tag - found in the HTTP header"
      v-model="authTagFromHttpHeader" />

    <Textarea label="HTTP Body" v-model="httpBody"></Textarea>

    <button
      class="btn btn-primary mt-3"
      :class="{ loading: showLoading }"
      @click="decryptData">
      싸우러 가자
    </button>

    <Transition>
      <Textareadisplayonly
        label="Response Data"
        :is-json="true"
        :data="responseData"
        v-if="responseData"></Textareadisplayonly>
    </Transition>

    <Transition>
      <button
        class="btn mt-3"
        v-if="responseData"
        @click="copyEntireResponse(responseData)">
        Copy Webhook Data
      </button>
    </Transition>
  </div>
</template>
