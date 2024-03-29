<script setup>
  usePageHead('COPYandPAY')

  const currentUser = useState('currentUser')

  //
  const mode = useState('mode')

  const modeText = computed(() => {
    const subDomain = mode.value == 'Test' ? 'eu-test' : 'eu-prod'
    return `https://${subDomain}.oppwa.com/v1/checkouts`
  })

  //
  const accessToken = useState('accessToken')
  const entityId = useState('entityId')

  //
  const dataParameters = ref('')
  const defaultParameters = ref([
    'amount=1.00',
    'currency=USD',
    'paymentType=DB',
    'billing.city=South Jadyn',
    'billing.country=US',
    'billing.street1=645 Delmer Vista Suite 927',
    'billing.postcode=15705-9357',
    'customer.email=test@test.com',
    'customer.givenName=John',
    'customer.surname=Wick',
  ])
  const responseData = ref('')
  const checkoutId = useState('checkoutId')
  const cnpModal = useState('cnpModal')
  const shopperResultURLPayon = useState('shopperResultUrlPayon')
  const showLoading = ref(false)

  // trx ID
  const trxId = useState('payonTrxId')

  // widget states
  const autoLaunchWidget = useState('autoLaunchWidget')
  const selectedBrands = useState('selectedBrands')
  const selectedBrandsFormatted = computed(() => {
    return arrayToFormatter(selectedBrands.value, ' ')
  })

  // all session data from here
  const sessionMode = ref('')
  const sessionBrands = ref('')
  const sessionAccessToken = ref('')
  const sessionDataParameters = ref('')
  const sessionEntityId = ref('')

  /**
   * fetches data from the session and sets it to the local variables
   */
  const getSessionData = async () => {
    const { session, refresh } = await useSession()

    await refresh()

    sessionMode.value = session.value.mode
    sessionBrands.value = session.value.brands
    sessionAccessToken.value = session.value.accessToken
    sessionEntityId.value = session.value.entityId
    sessionDataParameters.value = session.value.dataParameters
  }

  /**
   * loads the session data as the main ui data
   */
  const loadSessionData = () => {
    mode.value = sessionMode.value
    selectedBrands.value = sessionBrands.value
    accessToken.value = sessionAccessToken.value
    entityId.value = sessionEntityId.value
    dataParameters.value = sessionDataParameters.value
  }

  /**
   * set up session data on click of the submit button
   */
  const setSessionData = async () => {
    const { refresh, update } = await useSession()

    await refresh()

    await update({
      mode: mode.value,
      brands: selectedBrands.value,
      accessToken: accessToken.value,
      entityId: entityId.value,
      dataParameters: dataParameters.value,
    })
  }

  /**
   * submit to the API!
   */
  const submit = async () => {
    showLoading.value = true
    responseData.value = ''

    // push the sessions to.. well.. sessions
    await setSessionData()
    await getSessionData()

    //
    try {
      const { data } = await useFetch('/api/payon/copyandpay', {
        method: 'post',
        body: {
          mode: mode.value,
          accessToken: accessToken.value,
          dataParameters: `${textAreaToURLParams(
            dataParameters.value
          )}&entityId=${entityId.value}&merchantTransactionId=${trxId.value}`,
        },
      })

      responseData.value = data.value

      // save states
      if (responseData.value.id) {
        checkoutId.value = responseData.value.id
      }

      // open the modal and call the form
      if (autoLaunchWidget.value) {
        cnpModal.value = true
        createScriptTag()
      }
    } catch (error) {
      console.error(error)
    } finally {
      showLoading.value = false
    }

    // generate a new trx ID after a submit
    trxId.value = generateTrxId('kbn', 6)
    // console.info(`New merchantTransactionId: ${trxId.value}`)
  }

  /**
   * sets the wpwlOptions based on config-payon before launching the widget
   */
  const setWpwlOptions = () => {
    wpwlOptions = {
      inlineFlow: [],
      locale: useState('locale').value,
      style: useState('widgetStyle').value,
      maskCvv: useState('maskCvv').value,
      requireCvv: useState('requireCvv').value,
      showCVVHint: useState('showCVVHint').value,
      allowEmptyCvv: useState('allowEmptyCvv').value,
      validation: useState('validation').value,
      showLabels: useState('showLabels').value,
      showPlaceholders: useState('showPlaceholders').value,
      disableCardExpiryDateValidation: useState(
        'disableCardExpiryDateValidation'
      ).value,

      //
      spinner: {
        color: '#38bdf8',
      },

      //
      labels: {},

      // sets the placeholder for number and cvv, because iFrames, that's why
      iframeStyles: {
        'card-number-placeholder': {
          color: 'rgb(107 114 128)',
        },
        'cvv-placeholder': {
          color: 'rgb(107 114 128)',
        },

        'background-color': 'rgb(229 231 235)',
      },

      onReady: function () {
        // create the field
        var thingy =
          '<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/tBhQJ7yWR0rSAeAMLa" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><br />'

        // add the field
        $('form.wpwl-form-card').find('.wpwl-button').before(thingy)
      },
    }

    if (useState('labelBrand').value != '') {
      wpwlOptions.labels.brand = useState('labelBrand').value
    }

    if (useState('cardNumber').value != '') {
      wpwlOptions.labels.cardNumber = useState('cardNumber').value
    }

    if (useState('expiryDate').value != '') {
      wpwlOptions.labels.expiryDate = useState('expiryDate').value
    }

    if (useState('cardHolder').value != '') {
      wpwlOptions.labels.cardHolder = useState('cardHolder').value
    }

    if (useState('cvv').value != '') {
      wpwlOptions.labels.cvv = useState('cvv').value
    }

    if (useState('payNowLabel').value != '') {
      wpwlOptions.labels.submit = useState('payNowLabel').value
    }

    // BINlist
    if (useState('binListBrandDetection').value) {
      wpwlOptions.brandDetection = true,
        wpwlOptions.brandDetectionType = 'binlist'
    }

    // Paypal BNPL
    if (useState('paypalBNPL').value) {
      wpwlOptions.inlineFlow.push('PAYPAL')
      wpwlOptions.paypal = {
        sdkParams: {
          components: "buttons,messages",
          "enable-funding": "paylater",
          "disable-funding": "card",
          "buyer-country": useState('paypalBNPLBuyerCountry').value
        }
      }

    }

    // Klarna Inlines
    if (useState('klarnaInline').value) {
      wpwlOptions.inlineFlow.push('KLARNA_PAYMENTS_PAYNOW')
      wpwlOptions.inlineFlow.push('KLARNA_PAYMENTS_PAYLATER')
      wpwlOptions.inlineFlow.push('KLARNA_PAYMENTS_SLICEIT')
    }

    // display the options to the user
    console.table(wpwlOptions)
  }

  /**
   * create the script tag and append to the document to display the widgy
   */
  const createScriptTag = () => {
    setWpwlOptions()

    // open the modal first
    cnpModal.value = true

    // update the value of the checkoutId from the responseData
    if (responseData.value.id) {
      checkoutId.value = responseData.value.id
    }

    // create the new script tag and append to head
    const widgetScript = document.createElement('script')
    widgetScript.id = 'widget-script-tag'

    // eval subdomain
    const subDomain = mode.value == 'Test' ? 'eu-test' : 'eu-prod'
    widgetScript.src = `https://${subDomain}.oppwa.com/v1/paymentWidgets.js?checkoutId=${responseData.value.id}`

    // append to head
    document.head.append(widgetScript)
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
    <PageTitle title="COPYandPAY">
      COPYandPAY is a SAQ-A compliant payment-form solution, making it both
      secure and simple-to-integrate.
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

      <Textarea label="Data Parameters" v-model="dataParameters"></Textarea>

      <div class="text-xs">
        Current Active Brands:
        <span class="space-x-1">
          <span class="badge badge-warning badge-xs" v-for="brands in selectedBrands">
            {{ brands }}</span>
        </span>
      </div>

      <!-- submit btn -->
      <button class="btn btn-primary" :class="{ loading: showLoading }" @click="submit">
        Submit
      </button>

      <div class="tooltip tooltip-bottom z-20" :data-tip="sessionDataParameters">
        <button class="btn w-full" v-if="sessionDataParameters" @click="loadSessionData">
          Load Previous Data
        </button>
      </div>

      <!-- botton -->
      <Transition>
        <Textareadisplayonly label="Response Data" :data="responseData" v-if="responseData"></Textareadisplayonly>
      </Transition>

      <!-- btn group -->
      <div class="btn-group">
        <button class="btn w-1/3 gap-2" v-if="responseData" @click="copyEntireResponse(responseData)">
          <IconCopy />
          Response
        </button>

        <button class="btn w-1/3 gap-2" v-if="responseData.id" @click="copyString(responseData.id)">
          <IconCopy />
          Checkout ID
        </button>

        <label for="cnp-modal" class="btn btn-primary w-1/3 gap-2" v-if="responseData.id" @click="createScriptTag">
          <IconRocket />
          Launch Widget
        </label>
      </div>
    </div>

    <!-- cnp modal here -->
    <modal title="CopyandPay Widget" :isModalOpen="cnpModal" v-if="checkoutId">
      <Cnpform :shopper-result-url="shopperResultURLPayon" :brands="selectedBrandsFormatted" />
    </modal>
  </div>

  <LoadingDisplay v-else />
</template>
