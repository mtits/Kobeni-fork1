<template>
  <div>
    <PageTitle title="COPYandPAY">
      COPYandPAY is a SAQ-A compliant payment-form solution, making it both
      secure and simple-to-integrate.
    </PageTitle>

    <!-- select endpoint -->
    <div class="form-control w-full mt-3">
      <label class="label mb-1">
        <span class="label-text text-sky-400 font-bold">Endpoint</span>
      </label>
      <select class="select select-bordered w-full" v-model="endPoint">
        <option v-for="option in endPoints" :value="option.value">
          {{ option.text }}
        </option>
      </select>
    </div>

    <Input label="Access Token" type="password" v-model="accessToken" />

    <div class="flex w-full mt-3">
      <!-- left -->
      <div class="grid flex-grow">
        <Textarea label="Data Parameters" v-model="dataParameters"></Textarea>

        <!-- submit btn -->
        <div class="mt-3">
          <button class="btn btn-primary" @click="submit">Submit</button>
        </div>
      </div>

      <div class="divider divider-horizontal mt-3" v-if="responseData"></div>

      <!-- right -->
      <div class="grid flex-grow">
        <Loading :showLoading="showLoading" />

        <Transition>
          <div v-if="responseData">
            <Textareadisplayonly
              label="Response Data"
              :data="responseData"></Textareadisplayonly>

            <div class="btn-group mt-3 place-items-center">
              <button class="btn" @click="copyEntireResponse(responseData)">
                Copy Response
              </button>

              <button
                class="btn"
                v-if="responseData.id"
                @click="copyCheckoutID(responseData.id)">
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
        </Transition>
      </div>
    </div>

    <modal modalId="cnp-modal" title="CopyandPay Widget" v-if="responseData.id">
      Checkout ID: {{ checkoutId }}
      <Cnpform
        shopper-result-url="https://docs.oppwa.com/tutorials/integration-guide" />
    </modal>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'

  useHead({
    title: 'Kobeni | CopyandPay',
  })

  const endPoint = ref('https://eu-test.oppwa.com/v1/checkouts')
  const endPoints = ref([
    {
      text: 'https://eu-test.oppwa.com/v1/checkouts',
      value: 'https://eu-test.oppwa.com/v1/checkouts',
    },
    {
      text: 'https://eu-prod.oppwa.com/v1/checkouts',
      value: 'https://eu-prod.oppwa.com/v1/checkouts',
    },
  ])
  const accessToken = useState(
    'accessToken',
    () => 'OGE4Mjk0MTc0YjdlY2IyODAxNGI5Njk5MjIwMDE1Y2N8c3k2S0pzVDg='
  )
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

  onMounted(() => {
    dataParameters.value = arrayToFormatter(defaultParameters.value, '\n')
  })

  let showLoading = ref(false)
  /**
   * submit to the API!
   */
  async function submit() {
    try {
      showLoading.value = true
      responseData.value = ''

      const response = await axios({
        method: 'post',
        url: './api/copyandpay',
        data: {
          endPoint: endPoint.value,
          accessToken: accessToken.value,
          dataParameters: textAreaToURLParams(dataParameters.value),
        },
      })

      responseData.value = response.data

      if (responseData.value.id) {
        checkoutId.value = responseData.value.id
      }
    } catch (error) {
      console.error(error)
    } finally {
      showLoading.value = false
    }
  }

  /**
   * create the script tag and append to the document to display the widgy
   */
  function createScriptTag() {
    // check if existing widgetScript element exists in the HTML head and remove it
    if (document.head.contains(document.getElementById('widget-script-tag'))) {
      console.info('widget-script-tag element exists, removing now.')
      document.head.removeChild(document.getElementById('widget-script-tag'))
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
    document.querySelector('head').append(widgetScript)
  }
</script>
