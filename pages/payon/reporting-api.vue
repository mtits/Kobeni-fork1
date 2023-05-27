<script setup>
  usePageHead('Reporting API')

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
      <Input type="text" label="Reference Transaction" v-model="referenceTransaction" />

      <button class="btn btn-primary" :class="{ loading: showLoading }" @click="submit">
        Search
      </button>

      <Transition>
        <Textareadisplayonly label="Response Data" :data="responseData" v-if="responseData"></Textareadisplayonly>
      </Transition>

      <div class="btn-group place-items-center">
        <button class="btn w-1/2 gap-2" @click="copyEntireResponse(responseData)" v-if="responseData">
          <IconCopy />
          Response
        </button>

        <button class="btn w-1/2 gap-2" @click="copyString(responseData.id)" v-if="responseData.id">
          <IconCopy />
          Transaction ID
        </button>
      </div>
    </div>
  </div>

  <LoadingDisplay v-else />
</template>
