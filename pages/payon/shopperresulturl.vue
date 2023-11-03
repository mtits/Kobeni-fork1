<script setup>
  usePageHead('Result Page')

  const currentUser = useState('currentUser')

  //
  const route = useRoute()
  const id = ref('')
  const resourcePath = ref('')

  //
  const mode = ref('')
  const dataParameters = ref('')
  const entityId = ref('entityId')
  const accessToken = ref('')
  const referenceTransaction = useState('referenceTransaction')
  const registrationId = useState('registrationId')

  //
  const responseData = ref('')

  /**
   * gets the session data before doing anything else
   */
  const getSessionData = async () => {
    const { session, refresh } = await useSession()

    await refresh()

    // console.log(session.value)
    mode.value = session.value.mode
    //entityId.value = session.value.entityId
    accessToken.value = session.value.accessToken
    dataParameters.value = session.value.dataParameters
  }

  /**
   * fetches the transaction results
   */
  const fetchTransactionResults = async () => {
    try {
      const { data } = await useFetch('/api/payon/getTransactionResults', {
        method: 'post',
        body: {
          mode: mode.value,
          accessToken: accessToken.value,
          entityId: entityId.value,
          checkoutID: id.value,
        },
      })

      responseData.value = data.value
      referenceTransaction.value = responseData.value.id
      if (responseData.value.registrationId) {
        registrationId.value = responseData.value.registrationId
      }
    } catch (error) {
      console.error(error)
    }
  }

  /**
   *
   */
  onMounted(async () => {
    id.value = route.query.id
    resourcePath.value = route.query.resourcePath

    await getSessionData()
    await fetchTransactionResults()
  })
</script>

<template>
  <div v-if="currentUser">
    <PageTitle title="Transaction Results"> </PageTitle>

    <div class="flex flex-col space-y-3">
      <Alert title="Info" color-style="bg-sky-900 text-slate-300">
        The checkout ID used for getting this transaction's result is one-time
        only. If you refresh this page, you will not be able to get the results
        anymore.
      </Alert>

      <Transition>
        <div class="flex flex-col space-y-3">
          <Textareadisplayonly label="Response Data" :data="responseData" :is-json="true" v-if="responseData">
          </Textareadisplayonly>

          <button class="btn btn-ghost loading" v-else>Am Loading...</button>

          <div class="btn-group">
            <button class="btn w-1/3 gap-2" @click="copyEntireResponse(responseData)" v-if="responseData">
              <IconCopy />
              Response
            </button>

            <button class="btn w-1/3 gap-2" @click="copyString(responseData.id)" v-if="responseData.id">
              <IconCopy />
              Transaction ID
            </button>

            <button class="btn w-1/3 gap-2" @click="copyString(responseData.registrationId)"
              v-if="responseData.registrationId">
              <IconCopy />
              Registration ID
            </button>
          </div>
        </div>
      </Transition>
    </div>

    <div class="card mt-6 bg-base-200 text-neutral-content shadow-xl" v-if="dataParameters">
      <div class="card-body">
        <h2 class="card-title">Misc. Data ('ya might need dis...)</h2>

        <div class="flex flex-col space-y-3">
          <Transition>
            <InputReadOnly label="Entity ID" v-model="entityId" :display-character-count="false"
              @copy-content="copyString(entityId)" v-if="entityId" />
          </Transition>

          <Transition>
            <InputReadOnly label="Checkout ID" v-model="id" :display-character-count="false"
              @copy-content="copyString(id)" v-if="id" />
          </Transition>

          <Transition>
            <InputReadOnly label="Resource Path" v-model="resourcePath" :display-character-count="false"
              @copy-content="copyString(resourcePath)" v-if="resourcePath" />
          </Transition>
        </div>

        <Transition>
          <div class="flex flex-col space-y-3">
            <Textareadisplayonly label="Request Data Sent" :data="dataParameters" :is-json="false" v-if="dataParameters">
            </Textareadisplayonly>

            <button class="btn gap-2" @click="copyString(dataParameters)" v-if="dataParameters">
              <IconCopy />
              Previous Data
            </button>
          </div>
        </Transition>
      </div>
    </div>
  </div>

  <LoadingDisplay v-else />
</template>
