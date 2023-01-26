<script setup>
  definePageMeta({
    pageTitle: 'Kobeni | Standard Checkout',
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
    // todo: create form and submit!

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
    <div class="flex flex-col space-y-3">
      <!-- show endpoint -->
      <InputReadOnly
        label="Endpoint"
        v-model="modeText"
        :mode="mode"
        :display-character-count="false"
        @copy-content="copyString(modeText)" />

      <Textarea label="Data Parameters" v-model="dataParameters"></Textarea>

      <Alert title="Transaction ID" color-style="bg-sky-900 text-slate-300">
        {{ merchantTransactionId }}
      </Alert>

      <button class="btn btn-primary" @click="submit">Submit</button>
    </div>
  </div>

  <div class="flex" v-else>
    <button class="btn btn-ghost btn-block loading"></button>
  </div>
</template>
