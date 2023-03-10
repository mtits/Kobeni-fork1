<script setup>
definePageMeta({
  pageTitle: 'Kobeni | Config',
})

const currentUser = useState('currentUser')

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
const partnerName = useState('partnerName') // ToType
const memberID = useState('memberID')
const merchantUsername = useState('merchantUsername')
const amount = useState('amount')
const merchantTransactionId = useState('merchantTransactionId')
const merchantRedirectURL = useState('merchantRedirectURL')
const merchantSecureKey = useState('merchantSecureKey')

/**
 *
 */
const generateID = () => {
  merchantTransactionId.value = generateTrxId('kbn', 6)
}
</script>

<template>
  <div v-if="currentUser">
    <PageTitle title="Setup">
      The following data are required for generating a checksum to be used for
      integrity validation of the request by the gateway.
    </PageTitle>

    <div class="flex flex-col gap-14">
      <!-- blank dev for equal space between header and content below -->
      <div></div>

      <!-- environment -->
      <div class="flex gap-10">
        <div class="flex-none w-96">
          <div class="prose">
            <h3 class="text-sky-400 font-bold">Environment</h3>
          </div>

          <p class="text-sm">
            This determines which subdomain to use throughout the request.
          </p>
        </div>

        <div class="flex-1">
          <!-- select environment -->
          <div class="form-control">
            <select class="select select-bordered" v-model="mode">
              <option v-for="option in modeOptions" :value="option.value">
                {{ option.text }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <!-- partner details -->
      <div class="flex gap-10">
        <div class="flex-none w-96">
          <div class="prose">
            <h3 class="text-sky-400 font-bold">Partner</h3>
          </div>

          <p class="text-sm">
            Details about the PSP (partner). These details can be found in the
            gateway interface.
          </p>
        </div>

        <div class="flex-1 space-y-3">
          <Input label="ID" v-model="partnerID" />
          <Input label="Name (ToType)" v-model="partnerName" />
        </div>
      </div>

      <div class="divider"></div>

      <!-- merchant details -->
      <div class="flex gap-10">
        <div class="flex-none w-96">
        <div class="prose">
          <h3 class="text-sky-400 font-bold">Merchant</h3>
        </div>

          <p class="text-sm">
            Details about the Merchant (member). These are usually sent via
            email, or can be also be accessed in the gateway.
          </p>
        </div>

        <div class="flex-1 space-y-3">
          <Input label="ID" v-model="memberID" />
          <Input label="Username" v-model="merchantUsername" />
          <Input label="Secure Key" type="password" v-model="merchantSecureKey" />
        </div>
      </div>

      <div class="divider"></div>

      <!-- misc. -->
      <div class="flex gap-10">
        <div class="flex-none w-96">
          <div class="prose">
            <h3 class="text-sky-400 font-bold">Others</h3>
          </div>

          <p class="text-sm">
            These items are normally added in the request but will be more
            convenient if added here for generating the checksum and other
            authentication details.
          </p>
        </div>

        <div class="flex-1 space-y-3">
          <Input label="Transaction Amount" helper-text="Always format with 2 decimals" place-holder="e.g. 1.00"
            v-model="amount" />

          <!-- <Input
                label="Transaction ID"
                helper-text="This value changes everytime a new request is sent."
                v-model="merchantTransactionId" /> -->

          <!-- merchantTransactionId -->
          <div class="form-control">
            <label class="label mb-1">
              <span class="label-text text-sky-400 font-bold">
                Transaction ID
              </span>
            </label>
            <div class="input-group">
              <input type="text" class="input input-bordered w-full" v-model="merchantTransactionId" />

              <!-- btn -->
              <button class="btn btn-square" @click="generateID">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              </button>
            </div>
            <label class="label">
              <span class="label-text-alt">
                This value also changes everytime a new request is sent.
              </span>
            </label>
          </div>

          <Input label="Redirect URL" v-model="merchantRedirectURL" />
        </div>
      </div>
    </div>
  </div>

  <div class="flex" v-else>
    <button class="btn btn-ghost btn-block loading"></button>
  </div>
</template>
