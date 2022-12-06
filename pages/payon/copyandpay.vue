<template>
  <div>
    <PageTitle title="COPYandPAY">
      COPYandPAY is a SAQ-A compliant payment-form solution, making it both
      secure and simple-to-integrate.
    </PageTitle>

    <!-- show endpoint -->
    <InputReadOnly
      label="Endpoint"
      v-model="modeText"
      :mode="mode"
      :display-character-count="false"
      @copy-content="copyString(modeText)" />

    <div class="flex flex-col w-full">
      <!-- top -->
      <div class="grid flex-grow">
        <Textarea label="Data Parameters" v-model="dataParameters"></Textarea>

        <Alert class="my-6" title="Info" color-style=" alert-info">
          Be sure to add the parameter <kbd>entityId</kbd> in the
          <NuxtLink
            class="link link-hover font-semibold"
            to="/payon/config/configure-merchant"
            >Setup</NuxtLink
          >
          menu. Do not add it here.
        </Alert>

        <!-- buttons -->
        <div>
          <!-- submit btn -->
          <div
            class="tooltip tooltip-bottom"
            data-tip="Submitting this will replace the previous data.">
            <button
              class="btn btn-primary"
              :class="{ loading: showLoading }"
              @click="submit">
              Submit
            </button>
          </div>

          <Transition>
            <div
              class="tooltip tooltip-right"
              :data-tip="sessionDataParameters">
              <button
                class="btn ml-3"
                v-if="sessionDataParameters"
                @click="loadSessionData">
                Load Previous Data
              </button>
            </div>
          </Transition>
        </div>
      </div>

      <!-- botton -->
      <Transition mode="out-in">
        <div class="grid flex-grow" v-if="responseData">
          <div v-if="responseData">
            <Textareadisplayonly
              label="Response Data"
              :data="responseData"></Textareadisplayonly>

            <!-- btn group -->
            <div class="btn-group mt-3 place-items-center">
              <button class="btn" @click="copyEntireResponse(responseData)">
                Copy Response
              </button>

              <button
                class="btn"
                v-if="responseData.id"
                @click="copyString(responseData.id)">
                Copy Checkout ID
              </button>

              <label
                for="cnp-modal"
                class="btn btn-primary"
                v-if="responseData.id"
                @click="createScriptTag"
                >Launch Widget</label
              >
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <!-- cnp modal here -->
    <modal title="CopyandPay Widget" :isModalOpen="cnpModal" v-if="checkoutId">
      <Cnpform
        :shopper-result-url="shopperResultURLPayon"
        :brands="selectedBrandsFormatted" />
    </modal>
  </div>
</template>

<script setup>
  import { ref, onMounted, computed } from 'vue'

  definePageMeta({
    pageTitle: 'Kobeni | CopyandPay',
  })

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
  async function getSessionData() {
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
  function loadSessionData() {
    mode.value = sessionMode.value
    selectedBrands.value = sessionBrands.value
    accessToken.value = sessionAccessToken.value
    entityId.value = sessionEntityId.value
    dataParameters.value = sessionDataParameters.value
  }

  /**
   * set up session data on click of the submit button
   */
  async function setSessionData() {
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
  async function submit() {
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
  function setWpwlOptions() {
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
  function createScriptTag() {
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
