<script setup>
  definePageMeta({
    pageTitle: 'Kobeni | Reporting API',
  })

  const currentUser = useState('currentUser')

  //
  const searchType = ref('paymentId')
  const searchTypes = ref(['paymentId', 'merchantTransactionId'])

  //
  const mode = useState('mode')

  //
  const referenceTransaction = useState('referenceTransaction')
  const accessToken = useState('accessToken')
  const entityId = useState('entityId')

  //
  const responseData = ref('')
  const showLoading = ref(false)

  /**
   *
   */
  const submit = async () => {
    showLoading.value = true
    responseData.value = ''

    try {
      const { data } = await useFetch('/api/payon/query', {
        method: 'post',
        body: {
          mode: mode.value,
          referenceId: referenceTransaction.value,
          entityId: entityId.value,
          accessToken: accessToken.value,
          searchType: searchType.value,
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
    <PageTitle title="Reporting API"> Where art thou? </PageTitle>

    <div class="flex flex-col space-y-3">
      <!-- select search types -->
      <div class="form-control">
        <label class="label mb-1">
          <span class="label-text text-sky-400 font-bold">Search Type</span>
        </label>
        <select class="select select-bordered" v-model="searchType">
          <option v-for="sType in searchTypes" :value="sType">
            {{ sType }}
          </option>
        </select>
      </div>

      <!-- reference transaction -->
      <Input
        type="text"
        label="Reference Transaction"
        v-model="referenceTransaction" />

      <button
        class="btn btn-primary"
        :class="{ loading: showLoading }"
        @click="submit">
        Search
      </button>

      <Transition>
        <Textareadisplayonly
          label="Response Data"
          :data="responseData"
          v-if="responseData"></Textareadisplayonly>
      </Transition>

      <div class="btn-group place-items-center">
        <button
          class="btn w-1/2 gap-2"
          @click="copyEntireResponse(responseData)"
          v-if="responseData">
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
          Response
        </button>

        <button
          class="btn w-1/2 gap-2"
          @click="copyString(responseData.id)"
          v-if="responseData.id">
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
          Transaction ID
        </button>
      </div>
    </div>
  </div>

  <div class="flex" v-else>
    <button class="btn btn-ghost btn-block loading"></button>
  </div>
</template>
