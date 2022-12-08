<template>
  <div>
    <PageTitle title="Recurring (REPEATED only)">
      Subsequent payments only. Please send the initial transactions over at
      CopyandPay or S2S.
    </PageTitle>

    <!-- reference transaction -->
    <Input type="text" label="Registration ID" v-model="registrationId" />

    <!-- show endpoint -->
    <InputReadOnly
      label="Endpoint"
      v-model="modeText"
      :mode="mode"
      :display-character-count="false"
      @copy-content="copyString(modeText)" />

    <!-- Params -->
    <Textarea label="Data Parameters" v-model="dataParameters"></Textarea>

    <button
      class="btn mt-3 btn-primary"
      :class="{ loading: showLoading }"
      @click="submit">
      Submit
    </button>
    <Transition>
      <div
        class="tooltip tooltip-right"
        :data-tip="`${sessiondataParametersRecurring}\nRG=${sessionRegId}`">
        <button
          class="btn ml-3"
          @click="loadSessionData"
          v-if="sessiondataParametersRecurring">
          Load Previous Data
        </button>
      </div>
    </Transition>

    <Textareadisplayonly
      label="Response Data"
      :data="responseData"
      v-if="responseData"></Textareadisplayonly>

    <div class="btn-group mt-3 place-items-center">
      <button
        class="btn"
        @click="copyEntireResponse(responseData)"
        v-if="responseData">
        Copy Response
      </button>

      <button
        class="btn"
        @click="copyString(responseData.id)"
        v-if="responseData.id">
        Copy Transaction ID
      </button>
    </div>
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'

  definePageMeta({
    pageTitle: 'Kobeni | Recurring (REPEATED ONLY)',
  })

  //
  const mode = useState('mode')
  const modeText = computed(() => {
    if (mode.value == 'Test') {
      return `https://eu-test.oppwa.com/v1/registrations/${registrationId.value}/payments`
    } else {
      return `https://eu-prod.oppwa.com/v1/registrations/${registrationId.value}/payments`
    }
  })

  //
  const registrationId = useState('registrationId')
  const accessToken = useState('accessToken')
  const entityId = useState('entityId')

  //
  const dataParameters = ref('')
  const defaultParameters = ref([
    'amount=92.00',
    'currency=USD',
    'paymentType=DB',
    'standingInstruction.mode=REPEATED',
    'standingInstruction.type=RECURRING',
    'standingInstruction.source=MIT',
    'standingInstruction.initialTransactionId=REPLACE_ME',
  ])

  //
  const responseData = ref('')
  const showLoading = ref(false)

  // all session data from here
  const sessionMode = ref('')
  const sessionRegId = ref('')
  const sessionAccessToken = ref('')
  const sessiondataParametersRecurring = ref('')
  const sessionEntityId = ref('')

  /**
   * fetches data from the session and sets it to the local variables
   */
  async function getSessionData() {
    const { session, refresh } = await useSession()

    await refresh()

    sessionMode.value = session.value.mode
    sessionRegId.value = session.value.registrationId
    sessionAccessToken.value = session.value.accessToken
    sessionEntityId.value = session.value.entityId
    sessiondataParametersRecurring.value = session.value.dataParametersRecurring
  }

  /**
   * set up session data on click of the submit button
   */
  async function setSessionData() {
    const { refresh, update } = await useSession()

    await refresh()

    await update({
      mode: mode.value,
      registrationId: registrationId.value,
      accessToken: accessToken.value,
      entityId: entityId.value,
      dataParametersRecurring: dataParameters.value,
    })
  }

  /**
   * loads the session data as the main ui data
   */
  function loadSessionData() {
    mode.value = sessionMode.value
    registrationId.value = sessionRegId.value
    accessToken.value = sessionAccessToken.value
    entityId.value = sessionEntityId.value
    dataParameters.value = sessiondataParametersRecurring.value
  }

  /**
   *
   */
  async function submit() {
    showLoading.value = true
    responseData.value = ''

    await setSessionData()
    await getSessionData()

    try {
      const { data } = await useFetch('/api/payon/recurring', {
        method: 'post',
        body: {
          mode: mode.value,
          registrationId: registrationId.value,
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

  onMounted(async () => {
    dataParameters.value = arrayToFormatter(defaultParameters.value, '\n')

    await getSessionData()
    useGetCurrentUser()
  })
</script>
