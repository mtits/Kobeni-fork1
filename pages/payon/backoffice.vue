<script setup lang="ts">
  useHead({
    title: 'Kobeni | Backoffice Operations',
  })

  const currentUser = useState('currentUser')

  //
  const referenceTransaction = useState<string>('referenceTransaction')
  const accessToken = useState('accessToken')
  const entityId = useState('entityId')

  //
  const mode = useState<string>('mode')
  const modeText = computed(() => {
    if (mode.value == 'Test') {
      return `https://eu-test.oppwa.com/v1/payments/${referenceTransaction.value}`
    } else {
      return `https://eu-prod.oppwa.com/v1/payments/${referenceTransaction.value}`
    }
  })

  //
  const dataParameters = ref('')
  const defaultParameters = ref([
    'amount=1.00',
    'currency=USD',
    'paymentType=CP',
  ])

  //
  const responseData = ref('')
  const showLoading = ref(false)

  // all session data from here
  const sessionMode = ref('')
  const sessionRefId = ref('')
  const sessionAccessToken = ref('')
  const sessiondataParametersBackoffice = ref('')
  const sessionEntityId = ref('')

  /**
   * fetches data from the session and sets it to the local variables
   */
  const getSessionData = async () => {
    const { session, refresh } = await useSession()

    await refresh()

    sessionMode.value = session.value.mode
    sessionRefId.value = session.value.referenceId
    sessionAccessToken.value = session.value.accessToken
    sessionEntityId.value = session.value.entityId
    sessiondataParametersBackoffice.value =
      session.value.dataParametersBackoffice
  }

  /**
   * set up session data on click of the submit button
   */
  const setSessionData = async () => {
    const { refresh, update } = await useSession()

    await refresh()

    await update({
      mode: mode.value,
      referenceId: referenceTransaction.value,
      accessToken: accessToken.value,
      entityId: entityId.value,
      dataParametersBackoffice: dataParameters.value,
    })
  }

  /**
   * loads the session data as the main ui data
   */
  const loadSessionData = () => {
    mode.value = sessionMode.value
    referenceTransaction.value = sessionRefId.value
    accessToken.value = sessionAccessToken.value
    entityId.value = sessionEntityId.value
    dataParameters.value = sessiondataParametersBackoffice.value
  }

  /**
   *
   */
  const submit = async () => {
    showLoading.value = true
    responseData.value = ''

    await setSessionData()
    await getSessionData()

    try {
      const { data } = await useFetch('/api/payon/backoffice', {
        method: 'post',
        body: {
          mode: mode.value,
          referenceId: referenceTransaction.value,
          accessToken: accessToken.value,
          dataParameters: `${textAreaToURLParams(
            dataParameters.value
          )}&entityId=${entityId.value}`,
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
  onMounted(async () => {
    dataParameters.value = arrayToFormatter(defaultParameters.value, '\n')

    await getSessionData()
  })
</script>

<template>
  <div v-if="currentUser">
    <PageTitle title="Backoffice">
      Backoffice operations can be performed against initial payments that were
      generated using COPYandPAY or server-to-server. The
      <kbd class="kbd kbd-sm text-sky-400">referencedPaymentId</kbd> is the
      value return in the id JSON field.
    </PageTitle>

    <div class="flex flex-col space-y-3">
      <!-- show endpoint -->
      <InputReadOnly label="Endpoint" v-model="modeText" :mode="mode" :display-character-count="false"
        @copy-content="copyString(modeText)" />

      <!-- reference transaction -->
      <Input type="text" label="Reference Transaction" v-model="referenceTransaction" />

      <!-- Params -->
      <Textarea label="Data Parameters" v-model="dataParameters"></Textarea>

      <button class="btn btn-primary" :class="{ loading: showLoading }" @click="submit">
        Submit
      </button>

      <Transition>
        <div class="tooltip tooltip-bottom z-20" :data-tip="`${sessiondataParametersBackoffice}\nRefTrx=${sessionRefId}`">
          <button class="btn w-full" @click="loadSessionData" v-if="sessiondataParametersBackoffice">
            Load Previous Data
          </button>
        </div>
      </Transition>

      <Transition>
        <Textareadisplayonly label="Response Data" :data="responseData" v-if="responseData"></Textareadisplayonly>
      </Transition>

      <div class="btn-group">
        <button class="btn w-1/2 gap-2" @click="copyEntireResponse(responseData)" v-if="responseData">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
          </svg>
          Response
        </button>

        <button class="btn w-1/2 gap-2" @click="copyString((responseData as any).id)" v-if="(responseData as any).id">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
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
