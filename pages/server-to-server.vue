<template>
  <div>
    <PageTitle title="Server-to-Server">
      This integration variant requires you to collect the card data which
      increases your PCI-compliance scope. If you want to minimize your
      PCI-compliance requirements, we recommend that you use COPYandPAY.
    </PageTitle>

    <!-- show endpoint -->
    <InputReadOnly
      label="Endpoint"
      v-model="modeText"
      :display-character-count="false"
      @copy-content="copyString(modeText)" />

    <!-- Params -->
    <Textarea label="Data Parameters" v-model="dataParameters"></Textarea>
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'

  definePageMeta({
    pageTitle: 'Kobeni | Server-to-Server',
    middleware: 'update-title',
  })

  //
  const mode = useState('mode')
  const modeText = computed(() => {
    if (mode.value == 'Test') {
      return 'https://eu-test.oppwa.com/v1/payments'
    } else {
      return 'https://eu-prod.oppwa.com/v1/payments'
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
    'paymentType=PA',
    'card.number=4200000000000000',
    'card.holder=Nicolas Cage',
    'card.expiryMonth=05',
    'card.expiryYear=2034',
    'card.cvv=123',
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
</script>
