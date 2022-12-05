<template>
  <div>
    <PageTitle title="Server-to-Server">
      This integration variant requires you to collect the card data which
      increases your PCI-compliance scope. If you want to minimize your
      PCI-compliance requirements, we recommend that you use COPYandPAY.
    </PageTitle>

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
        :data-tip="sessiondataParametersServerToServer">
        <button
          class="btn ml-3"
          @click="loadSessionData"
          v-if="sessiondataParametersServerToServer">
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

      <button
        class="btn"
        @click="copyString(responseData.registrationId)"
        v-if="responseData.registrationId">
        Copy Registration ID
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
      return 'https://eu-test.oppwa.com/v1/payments'
    } else {
      return 'https://eu-prod.oppwa.com/v1/payments'
    }
  })

  //
  const accessToken = useState('accessToken')
  const entityId = useState('entityId')
  const referenceTransaction = useState('referenceTransaction')
  const registrationId = useState('registrationId')

  //
  const dataParameters = ref('')
  const defaultParameters = ref([
    'amount=1.00',
    'currency=USD',
    'paymentType=PA',
    'paymentBrand=VISA',
    'card.number=4200000000000000',
    'card.holder=Nicolas Cage',
    'card.expiryMonth=05',
    'card.expiryYear=2034',
    'card.cvv=123',
    'billing.city=South Jadyn',
    'billing.country=US',
    'billing.street1=645 Delmer Vista Suite 927',
    'billing.postcode=15705-9357',
    'customer.email=test@test.com',
    'customer.givenName=John',
    'customer.surname=Wick',
  ])

  //
  const responseData = ref('')
  const showLoading = ref(false)

  // all session data from here
  const sessionMode = ref('')
  const sessionAccessToken = ref('')
  const sessiondataParametersServerToServer = ref('')
  const sessionEntityId = ref('')

  /**
   * fetches data from the session and sets it to the local variables
   */
  async function getSessionData() {
    const { session, refresh } = await useSession()

    await refresh()

    sessionMode.value = session.value.mode
    sessionAccessToken.value = session.value.accessToken
    sessionEntityId.value = session.value.entityId
    sessiondataParametersServerToServer.value =
      session.value.dataParametersServerToServer
  }

  /**
   * set up session data on click of the submit button
   */
  async function setSessionData() {
    const { refresh, update } = await useSession()

    await refresh()

    await update({
      mode: mode.value,
      accessToken: accessToken.value,
      entityId: entityId.value,
      dataParametersServerToServer: dataParameters.value,
    })
  }

  /**
   * loads the session data as the main ui data
   */
  function loadSessionData() {
    mode.value = sessionMode.value
    accessToken.value = sessionAccessToken.value
    entityId.value = sessionEntityId.value
    dataParameters.value = sessiondataParametersServerToServer.value
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
      const { data } = await useFetch('/api/server-2-server', {
        method: 'post',
        body: {
          mode: mode.value,
          accessToken: accessToken.value,
          dataParameters: `${textAreaToURLParams(
            dataParameters.value
          )}&entityId=${entityId.value}`,
        },
      })

      responseData.value = data.value
      referenceTransaction.value = responseData.value.id

      if (responseData.value.registrationId) {
        registrationId.value = responseData.value.registrationId
      }
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
