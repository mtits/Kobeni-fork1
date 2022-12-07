<template>
  <div>
    <PageTitle title="쟤네 못봤겠지?">
      Webhook are managed in the BIP under
      <span class="italic">Administration > Webhooks</span>.
    </PageTitle>

    <Input
      label="Secret"
      type="password"
      helper-text="From BIP"
      v-model="secretFromConfiguration" />

    <Input label="ivfromHttpHeader" v-model="ivfromHttpHeader" />

    <Input label="authTagFromHttpHeader" v-model="authTagFromHttpHeader" />

    <Textarea label="HTTP Body" v-model="httpBody"></Textarea>

    <button
      class="btn btn-primary mt-3"
      :class="{ loading: showLoading }"
      @click="decryptData">
      Decrypt Data
    </button>

    <Transition>
      <Textareadisplayonly
        label="Response Data"
        :is-json="true"
        :data="responseData"
        v-if="responseData"></Textareadisplayonly>
    </Transition>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

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
  async function decryptData() {
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
