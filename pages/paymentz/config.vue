<script setup>
  definePageMeta({
    pageTitle: 'Kobeni | Config',
  })

  // select mode
  const mode = useState('pzMode')
  const modeOptions = ref([
    {
      text: 'TEST',
      value: 'Test',
    },
    {
      text: 'PRODUCTION',
      value: 'Live',
    },
  ])

  //
  const partnerID = useState('partnerID')
  const memberID = useState('memberID')
  const merchantUsername = useState('merchantUsername')
  const amount = useState('amount')
  const merchantTransactionId = useState('merchantTransactionId')
  const merchantRedirectURL = useState('merchantRedirectURL')
  const merchantSecureKey = useState('merchantSecureKey')
</script>

<template>
  <div>
    <PageTitle title="Setup">
      The following data are required for generating a checksum to be used for
      integrity validation of the request by the gateway.
    </PageTitle>

    <div class="space-y-3">
      <!-- select environment -->
      <div class="form-control">
        <label class="label mb-1">
          <span class="label-text text-sky-400 font-bold">Environment</span>
        </label>
        <select class="select select-bordered" v-model="mode">
          <option v-for="option in modeOptions" :value="option.value">
            {{ option.text }}
          </option>
        </select>
      </div>

      <Input label="Partner ID" v-model="partnerID" />
      <Input label="Member ID" v-model="memberID" />
      <Input label="Merchant Username" v-model="merchantUsername" />
      <Input label="Secure Key" type="password" v-model="merchantSecureKey" />
      <Input
        label="Transaction Amount"
        helper-text="Always format with 2 decimals"
        place-holder="e.g. 1.00"
        v-model="amount" />
      <Input label="Transaction ID" v-model="merchantTransactionId" />
      <Input label="Redirect URL" v-model="merchantRedirectURL" />
    </div>
  </div>
</template>
