<template>
  <div>
    <PageTitle title="COPYandPAY">
      COPYandPAY is a SAQ-A compliant payment-form solution, making it both
      secure and simple-to-integrate.
    </PageTitle>

    <Input label="Endpoint" v-model="endPoint" />

    <Input label="Access Token" type="password" v-model="accessToken" />

    <Textarea label="Data Parameters" v-model="dataParameters"></Textarea>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from 'vue'

  const endPoint = ref('https://eu-test.oppwa.com/v1/checkouts')
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

  onMounted(() => {
    dataParameters.value = arrayToFormatter(defaultParameters.value, '\n')
  })
</script>
