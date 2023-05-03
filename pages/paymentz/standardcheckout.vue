<script setup>
  useHead({
    title: 'Kobeni | Standard Checkout',
  })

  const currentUser = useState('currentUser')

  const mode = useState('pzMode')
  const modeText = computed(() => {
    return mode.value == 'Test'
      ? 'https://preprod.prtpg.com/transaction/Checkout'
      : 'https://secure.prtpg.com/transaction/Checkout'
  })

  //
  const dataParameters = ref('')
  const defaultParameters = ref([
    'orderDescription=This is a Standard Checkout test transaction.',
    'country=PH',
    'city=Makati',
    'state=NCR',
    'postcode=1227',
    'street=Valero',
    'telnocc=63',
    'phone=9854785236',
    'email=flex.gateway@payreto.com',
    'ip=192.168.0.1',
    'currency=REPLACE_ME',
    'terminalid=REPLACE_ME',
    'paymentMode=REPLACE_ME',
    'paymentBrand=REPLACE_ME',
  ])

  const memberID = useState('memberID')
  const partnerName = useState('partnerName') // ToType
  const amount = useState('amount')
  const merchantRedirectURL = useState('merchantRedirectURL')
  const merchantSecureKey = useState('merchantSecureKey')
  const merchantTransactionId = useState('merchantTransactionId')

  /**
   *
   */
  onMounted(() => {
    dataParameters.value = arrayToFormatter(defaultParameters.value, '\n')
  })

  /**
   *
   */
  const submit = () => {
    // eval if Standard-Checkout-Form already exists and remove it from DOM before creating a new one
    let stdCheckoutFormSearch = document.getElementById(
      'standard-checkout-form'
    )
    if (!!document.getElementById('standard-checkout-form')) {
      stdCheckoutFormSearch.remove()
      console.info('Removed duplicate checkout form.')
    }

    // generate hash
    const dataString = `${memberID.value}|${partnerName.value}|${amount.value}|${merchantTransactionId.value}|${merchantRedirectURL.value}|${merchantSecureKey.value}`
    const generatedMd5Hash = generateHash(dataString)
    console.info(`Generated md5 hash: ${generatedMd5Hash}`)

    // create form
    const stdCheckoutForm = document.createElement('form')
    stdCheckoutForm.setAttribute('method', 'POST')
    stdCheckoutForm.setAttribute('action', modeText.value)
    stdCheckoutForm.setAttribute('target', '_blank')
    stdCheckoutForm.setAttribute('id', 'standard-checkout-form')

    // create inputs and append to the form
    const paramArray = dataParameters.value.split('\n')

    paramArray.push(`checksum=${generatedMd5Hash}`)
    paramArray.push(`memberId=${memberID.value}`)
    paramArray.push(`totype=${partnerName.value}`)
    paramArray.push(`amount=${amount.value}`)
    paramArray.push(`merchantTransactionId=${merchantTransactionId.value}`)
    paramArray.push(`merchantRedirectUrl=${merchantRedirectURL.value}`)

    paramArray.forEach((parameterItem) => {
      const data = parameterItem.split('=')

      // create the input and append to form
      const textInput = document.createElement('input')
      textInput.setAttribute('type', 'hidden')
      textInput.setAttribute('name', data[0])
      textInput.setAttribute('value', data[1])
      stdCheckoutForm.appendChild(textInput)

      document.body.appendChild(stdCheckoutForm)
    })

    // console.info('Data:', paramArray)
    stdCheckoutForm.submit()

    // generate a new trx ID after submitting the form
    merchantTransactionId.value = generateTrxId('kbn', 6)
  }
</script>

<template>
  <div v-if="currentUser">
    <PageTitle title="Standard Checkout">
      In Standard Checkout, the merchant needs to post the intial request to the
      hosted checkout page where customer will provide card/account details.
      Once the payment is verified customer is redirected back to the
      <kbd>merchantRedirectUrl</kbd> along with the payment status.
    </PageTitle>

    <!-- text area for the parameters needed -->
    <div class="flex flex-col gap-3">
      <!-- show endpoint -->
      <InputReadOnly label="Endpoint" v-model="modeText" :mode="mode" :display-character-count="false"
        @copy-content="copyString(modeText)" />

      <Textarea label="Data Parameters" v-model="dataParameters"></Textarea>

      <Alert title="Transaction ID" color-style="bg-sky-900 text-slate-300">
        {{ merchantTransactionId }}
      </Alert>

      <button class="btn btn-primary" @click="submit">Submit</button>
    </div>
  </div>

  <LoadingDisplay v-else />
</template>
