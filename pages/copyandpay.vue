<template>
  <div>
    <PageTitle title="COPYandPAY">
      COPYandPAY is a SAQ-A compliant payment-form solution, making it both
      secure and simple-to-integrate.
    </PageTitle>

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
        <div class="mt-3">
          <button class="btn btn-primary" @click="submit">Submit</button>
        </div>
      </div>

      <div class="divider divider-horizontal mt-3" v-if="responseData"></div>

      <!-- right -->
      <div class="grid flex-grow">
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
                >Launch Widget</label
              >
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <modal modalId="cnp-modal" title="CopyandPay Widget">
      Checkout ID: {{ responseData.id }}
    </modal>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'

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
  const accessToken = ref(
    'OGE4Mjk0MTc0YjdlY2IyODAxNGI5Njk5MjIwMDE1Y2N8c3k2S0pzVDg='
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

  onMounted(() => {
    dataParameters.value = arrayToFormatter(defaultParameters.value, '\n')
  })

  /**
   * submit to the API!
   */
  async function submit() {
    try {
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
    } catch (error) {
      console.error(error)
    }
  }
</script>
