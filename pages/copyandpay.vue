<template>
  <div>
    <PageTitle title="COPYandPAY">
      COPYandPAY is a SAQ-A compliant payment-form solution, making it both
      secure and simple-to-integrate.
    </PageTitle>

    <!-- select endpoint -->
    <div class="form-control mt-3">
      <label class="label mb-1">
        <span class="label-text text-sky-400 font-bold">Endpoint</span>
      </label>
      <select class="select max-w-sm" v-model="endPoint">
        <option v-for="option in endPoints" :value="option.value">
          {{ option.text }}
        </option>
      </select>
      <label class="label">
        <span class="label-text-alt"
          ><kbd>{{ endPoint }}</kbd>
        </span>
      </label>
    </div>

    <div class="flex flex-col w-full">
      <!-- top -->
      <div class="grid flex-grow">
        <Textarea label="Data Parameters" v-model="dataParameters"></Textarea>

        <!-- submit btn -->
        <div class="mt-3">
          <button
            class="btn btn-primary"
            :class="{ loading: showLoading }"
            @click="submit">
            Submit
          </button>
        </div>
      </div>

      <!-- <div class="divider" v-if="responseData"></div> -->

      <!-- botton -->
      <Transition mode="out-in">
        <div class="grid flex-grow" v-if="responseData">
          <div v-if="responseData">
            <Textareadisplayonly
              label="Response Data"
              :data="responseData"></Textareadisplayonly>

            <!-- btn group -->
            <div class="btn-group mt-3 place-items-center">
              <button class="btn" @click="copyResponse(responseData)">
                Copy Response
              </button>

              <button
                class="btn"
                v-if="responseData.id"
                @click="copyID(responseData.id)">
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

    <!-- Toast for copy buttons -->
    <Transition>
      <div class="toast toast-end" v-if="showAlert">
        <Alert title="Done" color-style="alert-info"
          >Data copied to clipboard.</Alert
        >
      </div>
    </Transition>

    <!-- cnp modal here -->
    <modal title="CopyandPay Widget" :isModalOpen="cnpModal" v-if="checkoutId">
      <Cnpform :shopper-result-url="shopperResultURLPayon" />
    </modal>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'

  definePageMeta({
    pageTitle: 'Kobeni | CopyandPay',
    middleware: 'update-title',
  })

  const endPoint = ref('https://eu-test.oppwa.com/v1/checkouts')
  const endPoints = ref([
    {
      text: 'Test',
      value: 'https://eu-test.oppwa.com/v1/checkouts',
    },
    {
      text: 'Live',
      value: 'https://eu-prod.oppwa.com/v1/checkouts',
    },
  ])
  const accessToken = useState('accessToken')
  const dataParameters = ref('')
  const defaultParameters = ref([
    'entityId=8a8294174b7ecb28014b9699220015ca',
    'amount=1.00',
    'currency=USD',
    'paymentType=PA',
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
  const showAlert = ref(false)

  // widget states
  const autoLaunchWidget = useState('autoLaunchWidget')

  onMounted(() => {
    dataParameters.value = arrayToFormatter(defaultParameters.value, '\n')
  })

  /**
   * submit to the API!
   */
  async function submit() {
    try {
      showLoading.value = true
      responseData.value = ''

      const { data } = await useFetch('/api/copyandpay', {
        method: 'post',
        body: {
          endPoint: endPoint.value,
          accessToken: accessToken.value,
          dataParameters: textAreaToURLParams(dataParameters.value),
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
        submit: 'PAY NOW',
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
    if (endPoint.value == 'https://eu-test.oppwa.com/v1/checkouts') {
      subDomain = 'eu-test'
    } else {
      subDomain = 'eu-prod'
    }

    widgetScript.src = `https://${subDomain}.oppwa.com/v1/paymentWidgets.js?checkoutId=${responseData.value.id}`

    // append to head
    document.head.append(widgetScript)
  }

  /**
   * Stringify data and copy to clipboard
   * @param {Object} data
   */
  function copyResponse(data) {
    showAlert.value = true
    copyEntireResponse(data)

    setTimeout(() => {
      showAlert.value = false
    }, 1500)
  }

  /**
   * copy checkout ID to clipboard
   * @param {String} data
   */
  function copyID(data) {
    showAlert.value = true
    copyString(data)

    setTimeout(() => {
      showAlert.value = false
    }, 1500)
  }
</script>
