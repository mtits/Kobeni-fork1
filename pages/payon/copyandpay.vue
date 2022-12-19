<script setup>
  definePageMeta({
    pageTitle: 'Kobeni | CopyandPay',
  })

  const currentUser = useState('currentUser')

  //
  const mode = useState('mode')
  const modeText = computed(() => {
    if (mode.value == 'Test') {
      return 'https://eu-test.oppwa.com/v1/checkouts'
    } else {
      return 'https://eu-prod.oppwa.com/v1/checkouts'
    }
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
          )}&entityId=${entityId.value}`,
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
  }

  /**
   * sets the wpwlOptions based on config-payon before launching the widget
   */
  const setWpwlOptions = () => {
    wpwlOptions = {
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
      labels: {
        submit: useState('payNowLabel').value,
      },

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

    let subDomain = ''

    // eval env mode
    if (mode.value == 'Test') {
      subDomain = 'eu-test'
    } else {
      subDomain = 'eu-prod'
    }

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

    <div class="flex flex-col space-y-3">
      <!-- show endpoint -->
      <InputReadOnly
        label="Endpoint"
        v-model="modeText"
        :mode="mode"
        :display-character-count="false"
        @copy-content="copyString(modeText)" />

      <Alert title="Info" color-style="bg-sky-900 text-slate-300">
        Be sure to add the parameter <kbd>entityId</kbd> in the
        <NuxtLink
          class="link font-semibold"
          to="/payon/config/configure-merchant"
          >Configure Merchant</NuxtLink
        >
        menu. Do not add it here.
      </Alert>

      <Textarea label="Data Parameters" v-model="dataParameters"></Textarea>

      <div class="text-xs">
        Current Active Brands:
        <span class="space-x-1">
          <span
            class="badge badge-warning badge-xs"
            v-for="brands in selectedBrands">
            {{ brands }}</span
          >
        </span>
      </div>

      <!-- submit btn -->
      <button
        class="btn btn-primary"
        :class="{ loading: showLoading }"
        @click="submit">
        Submit
      </button>

      <div
        class="tooltip tooltip-bottom z-20"
        :data-tip="sessionDataParameters">
        <button
          class="btn w-full"
          v-if="sessionDataParameters"
          @click="loadSessionData">
          Load Previous Data
        </button>
      </div>

      <!-- botton -->
      <Transition>
        <Textareadisplayonly
          label="Response Data"
          :data="responseData"
          v-if="responseData"></Textareadisplayonly>
      </Transition>

      <!-- btn group -->
      <div class="btn-group">
        <button
          class="btn w-1/3 gap-2"
          v-if="responseData"
          @click="copyEntireResponse(responseData)">
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
          class="btn w-1/3 gap-2"
          v-if="responseData.id"
          @click="copyString(responseData.id)">
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
          Checkout ID
        </button>

        <label
          for="cnp-modal"
          class="btn btn-primary w-1/3 gap-2"
          v-if="responseData.id"
          @click="createScriptTag">
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
              d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
          </svg>
          Launch Widget
        </label>
      </div>
    </div>

    <!-- cnp modal here -->
    <modal title="CopyandPay Widget" :isModalOpen="cnpModal" v-if="checkoutId">
      <Cnpform
        :shopper-result-url="shopperResultURLPayon"
        :brands="selectedBrandsFormatted" />
    </modal>
  </div>

  <div class="flex" v-else>
    <button class="btn btn-ghost btn-block loading"></button>
  </div>
</template>
