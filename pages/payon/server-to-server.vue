<script setup>
  import axios from 'axios'
  usePageHead('Server-to-Server')

  const currentUser = useState('currentUser')

  //
  const mode = useState('mode')

  const modeText = computed(() => {
    const subDomain = mode.value == 'Test' ? 'eu-test' : 'eu-prod'
    return `https://${subDomain}.oppwa.com/v1/payments`
  })

  //
  const accessToken = useState('accessToken')
  const entityId = useState('entityId')
  const referenceTransaction = useState('referenceTransaction')
  const registrationId = useState('registrationId')
  const shopperResultURLPayon = useState('shopperResultUrlPayon')

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
    'customer.browser.acceptHeader=text/html',
    'customer.browser.screenColorDepth=48',
    'customer.browser.javaEnabled=false',
    'customer.browser.javascriptEnabled=true',
    'customer.browser.language=en',
    'customer.browser.screenHeight=1200',
    'customer.browser.screenWidth=1600',
    'customer.browser.timezone=60',
    'customer.browser.challengeWindow=4',
    'customer.browser.userAgent=Mozilla/4.0 (MSIE 6.0; Windows NT 5.0)'
  ])

  const userIp = await fetchUserIp()
  defaultParameters.value.push(`customer.ip=${userIp}`)
  dataParameters.value = arrayToFormatter(defaultParameters.value, '\n')

  //
  const responseData = ref('')
  const showLoading = ref(false)

  // all session data from here
  const sessionMode = ref('')
  const sessionAccessToken = ref('')
  const sessiondataParametersServerToServer = ref('')
  const sessionEntityId = ref('')

  // 
  const trxId = useState('payonTrxId')

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
  const setSessionData = async () => {
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
  const loadSessionData = () => {
    mode.value = sessionMode.value
    accessToken.value = sessionAccessToken.value
    entityId.value = sessionEntityId.value
    dataParameters.value = sessiondataParametersServerToServer.value
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
      const { data } = await useFetch('/api/payon/server-2-server', {
        method: 'post',
        body: {
          mode: mode.value,
          accessToken: accessToken.value,
          dataParameters: `${textAreaToURLParams(
            dataParameters.value
          )}&entityId=${entityId.value}&merchantTransactionId=${trxId.value}&shopperResultUrl=${shopperResultURLPayon.value}`,
        },
      })

      responseData.value = data.value

      // save the trx as referemce fpr backoffice operations
      if (data.value.id)
        referenceTransaction.value = data.value.id

      // same for registration ids
      if (responseData.value.registrationId)
        registrationId.value = responseData.value.registrationId

    } catch (error) {
      console.error(error)
    } finally {
      showLoading.value = false
    }


    trxId.value = generateTrxId('kbn', 6)
    // console.info(`New merchantTransactionId: ${trxId.value}`)
  }

  /**
   *
   */
  onMounted(async () => {



    await getSessionData()
  })
</script>

<template>
  <div v-if="currentUser">
    <PageTitle title="Server-to-Server">
      This integration variant requires you to collect the card data which
      increases your PCI-compliance scope. If you want to minimize your
      PCI-compliance requirements, we recommend that you use COPYandPAY.
    </PageTitle>

    <div class="flex flex-col gap-3">
      <!-- show endpoint -->
      <InputReadOnly label="Endpoint" v-model="modeText" :mode="mode" :display-character-count="false"
        @copy-content="copyString(modeText)" />

      <Alert title="Info" color-style="bg-sky-900 text-slate-300">
        Be sure to add the <kbd class="kbd kbd-sm">entityId</kbd> parameter in
        the
        <NuxtLink class="link font-semibold" to="/payon/config/configure-merchant">
          Configure Merchant
        </NuxtLink>
        menu, do not add it here. Additionally, the field <kbd class="kbd kbd-sm">merchantTransactionId</kbd> is
        automatically generated and added.
      </Alert>

      <!-- Params -->
      <Textarea label="Data Parameters" v-model="dataParameters"></Textarea>

      <button class="btn btn-primary" :class="{ loading: showLoading }" @click="submit">
        Submit
      </button>

      <Transition>
        <div class="tooltip tooltip-bottom z-20" :data-tip="sessiondataParametersServerToServer">
          <button class="btn w-full" @click="loadSessionData" v-if="sessiondataParametersServerToServer">
            Load Previous Data
          </button>
        </div>
      </Transition>

      <Transition>
        <Textareadisplayonly label="Response Data" :data="responseData" v-if="responseData" />
      </Transition>

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
  </div>

  <LoadingDisplay v-else />
</template>
