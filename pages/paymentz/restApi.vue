<script setup>
  usePageHead('REST API')

  const currentUser = useState('currentUser')

  // endpoint states
  const mode = useState('pzMode')
  const modeText = computed(() => {
    return mode.value == 'Test'
      ? 'https://preprod.prtpg.com/transactionServices/REST/v1/payments'
      : 'https://secure.prtpg.com/transactionServices/REST/v1/payments'
  })

  // parameters
  const dataParameters = ref('')
  const defaultParameters = ref([
    'orderDescriptor=This is a REST API test transaction',
    'shipping.country=PH',
    'shipping.city=Makati',
    'shipping.state=NCR',
    'shipping.postcode=1227',
    'shipping.street1=Valero',
    'customer.telnocc=63',
    'customer.phone=9294112356',
    'customer.email=flex.gateway@payreto.com',
    'customer.givenName=John',
    'customer.surname=Wick',
    'customer.birthDate=19930528',
    'customer.ip=192.168.0.1',
    'card.number=4111110000000021',
    'card.expiryMonth=12',
    'card.expiryYear=2030',
    'card.cvv=123',
    'currency=REPLACE_ME',
    'paymentBrand=REPLACE_ME',
    'paymentMode=REPLACE_ME',
    'paymentType=REPLACE_ME',
    'authentication.terminalId=REPLACE_ME',
  ])

  const memberID = useState('memberID')
  const merchantUsername = useState('merchantUsername')

  const partnerID = useState('partnerID')

  const amount = useState('amount')
  const merchantRedirectURL = useState('merchantRedirectURL')
  const merchantSecureKey = useState('merchantSecureKey')
  const merchantTransactionId = useState('merchantTransactionId')

  const responseDataToken = ref('')
  const authToken = ref('')

  const isLoading = ref(false)
  const btnLabel = ref('Submit')
  const isButtonError = ref(false)
  const responseData = ref('')

  /**
   *
   */
  const submit = async () => {
    // generate hash
    const dataString = `${memberID.value}|${merchantSecureKey.value}|${merchantTransactionId.value}|${amount.value}`
    const generatedMd5Hash = generateHash(dataString)
    console.info(`Generated md5 hash for "${dataString}"`)

    // clear old token
    authToken.value = ''

    // generate token
    await generateToken()

    // append all params
    const dataParamString = textAreaToURLParams(dataParameters.value)
    const dataParamStringAdd = new URLSearchParams({
      'authentication.memberId': memberID.value,
      'authentication.checksum': generatedMd5Hash,
      amount: amount.value,
      merchantTransactionId: merchantTransactionId.value,
      merchantRedirectUrl: merchantRedirectURL.value,
    })

    const payloadData = `${dataParamString}&${dataParamStringAdd.toString()}`

    // todo: submit
    if (authToken.value !== '') {
      try {
        isLoading.value = true
        btnLabel.value = 'Submitting Transaction'
        responseData.value = ''
        isButtonError.value = false

        const { data } = await useFetch('/api/pz/restApi', {
          method: 'post',
          headers: { accessToken: authToken.value },
          body: {
            mode: mode.value,
            payload: payloadData,
          },
        })

        responseData.value = data.value

        //
      } catch (error) {
        console.error(error)

        //
      } finally {
        btnLabel.value = 'Submit'
        isLoading.value = false
      }
    }

    // generate a new trx ID after submitting the request
    merchantTransactionId.value = generateTrxId('kbn', 6)
  }

  /**
   * Generates the Auth Token before submitting to the Payment endpoint
   */
  async function generateToken() {
    try {
      isLoading.value = true
      isButtonError.value = false
      btnLabel.value = 'Generating Token'

      const { data } = await useFetch('/api/pz/generateAuthToken', {
        method: 'post',
        body: {
          mode: mode.value,
          partnerID: partnerID.value,
          merchantUsername: merchantUsername.value,
          merchantSecureKey: merchantSecureKey.value,
        },
      })

      responseDataToken.value = data.value

      if (responseDataToken.value.AuthToken) {
        authToken.value = responseDataToken.value.AuthToken
      } else {
        console.error(responseDataToken.value)
        isButtonError.value = true
        authToken.value = ''

        btnLabel.value = 'Token Generation Failed'
      }
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * parse array into string with new lines
   */
  onMounted(() => {
    dataParameters.value = arrayToFormatter(defaultParameters.value, '\n')
  })
</script>

<template>
  <div v-if="currentUser">
    <PageTitle title="REST API">
      REST API is one of ways to integrate with the PaymentZ platform and
      provides full opportunities for interaction with the payment platform. The
      REST API supports the ability to perform purchases, recurring payments,
      refunds and payouts. For issuing of payments by using REST APIs, you need
      to develop your own payment interface, with full UI control. For payment
      processing by using payment cards, your payment interface needs to be a
      PCI-compliant.
    </PageTitle>

    <div class="flex flex-col gap-3">
      <!-- show endpoint -->
      <InputReadOnly label="Endpoint" v-model="modeText" :mode="mode" :display-character-count="false"
        @copy-content="copyString(modeText)" />

      <Textarea label="Data Parameters" v-model="dataParameters"></Textarea>

      <Alert title="Transaction ID" color-style="bg-sky-900 text-slate-300">
        {{ merchantTransactionId }}
      </Alert>

      <button class="btn btn-primary" :class="{ loading: isLoading, 'btn-error': isButtonError }" @click="submit">
        {{ btnLabel }}
      </button>

      <Transition>
        <Textareadisplayonly label="Response Data" :data="responseData" v-if="responseData"></Textareadisplayonly>
      </Transition>

      <button class="btn w-full gap-2" v-if="responseData" @click="copyEntireResponse(responseData)">
        <IconCopy />
        Response
      </button>
    </div>
  </div>

  <LoadingDisplay v-else />
</template>
