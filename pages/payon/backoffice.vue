<template>
  <div>
    <PageTitle title="Backoffice">
      Backoffice operations can be performed against initial payments that were
      generated using COPYandPAY or server-to-server. The referencedPaymentId is
      the value return in the id JSON field.
    </PageTitle>

    <!-- reference transaction -->
    <Input
      type="text"
      label="Reference Transaction"
      v-model="referenceTransaction" />

    <!-- show endpoint -->
    <InputReadOnly
      label="Endpoint"
      v-model="modeText"
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
        :data-tip="`${sessiondataParametersBackoffice}\nRefTrx=${sessionRefId}`">
        <button
          class="btn ml-3"
          @click="loadSessionData"
          v-if="sessiondataParametersBackoffice">
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
    pageTitle: 'Kobeni | Server-to-Server',
    middleware: 'update-title',
  })

  //
  const mode = useState('mode')
  const modeText = computed(() => {
    if (mode.value == 'Test') {
      return `https://eu-test.oppwa.com/v1/payments/${referenceTransaction.value}`
    } else {
      return `https://eu-prod.oppwa.com/v1/payments/${referenceTransaction.value}`
    }
  })

  //
  const referenceTransaction = useState('referenceTransaction')
  const accessToken = useState('accessToken')
  const entityId = useState('entityId')

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
  async function getSessionData() {
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
  async function setSessionData() {
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
  function loadSessionData() {
    mode.value = sessionMode.value
    referenceTransaction.value = sessionRefId.value
    accessToken.value = sessionAccessToken.value
    entityId.value = sessionEntityId.value
    dataParameters.value = sessiondataParametersBackoffice.value
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
      const { data } = await useFetch('/api/backoffice', {
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

  onMounted(async () => {
    dataParameters.value = arrayToFormatter(defaultParameters.value, '\n')

    await getSessionData()
  })
</script>