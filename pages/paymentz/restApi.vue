<script setup>
  definePageMeta({
    pageTitle: 'Kobeni | REST API',
  })

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
    'orderDescription=This is a REST API test transaction.',
    'country=PH',
    'city=Makati',
    'state=NCR',
    'postcode=1227',
    'street=Valero',
    'telnocc=63',
    'phone=9854785236',
    'email=flex.gateway@payreto.com',
    'ip=192.168.0.1',
    'card.number=5105105105105100',
    'card.expiryMonth=01',
    'card.expiryYear=2030',
    'card.cvv=123',
    'paymentBrand=MC',
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
  const submit = async () => {
    // todo: generate hash <memberId>|<secureKey>|<merchantTransactionId>|<amount>
    const dataString = `${memberID.value}|${merchantSecureKey.value}|${merchantTransactionId.value}|${amount.value}`
    const generatedMd5Hash = generateHash(dataString)
    console.info(
      `Generated md5 hash for "${dataString}" is "${generatedMd5Hash}"`
    )

    // todo: generate token
    // todo: append all params
    // todo: submit

    // generate a new trx ID after submitting the form
    merchantTransactionId.value = generateTrxId('kbn', 6)
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
