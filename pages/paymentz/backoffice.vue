<script setup>
definePageMeta({
  pageTitle: 'Kobeni | Backoffice',
})

// 
const currentUser = useState('currentUser')

// endpoint states
const mode = useState('pzMode')
const modeText = computed(() => {
  return mode.value == 'Test'
    ? 'https://preprod.prtpg.com/transactionServices/REST/v1/getTransactionList'
    : 'https://secure.prtpg.com/transactionServices/REST/v1/getTransactionList'
})

// Dates
const dateFrom = ref('')
const dateTo = ref('')

// 
const memberID = useState('memberID')
const merchantSecureKey = useState('merchantSecureKey')
const merchantUsername = useState('merchantUsername')
const partnerID = useState('partnerID')


/**
 * set "dateFrom" to date today
 */
onMounted(() => {
  const date = new Date()

  // format to add the zeroes
  const month = (date.getMonth() + 1 < 10) ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  const day = (date.getDate() < 10) ? `0${date.getDate()}` : date.getDate()

  const formattedDate = `${date.getFullYear()}-${month}-${day}`
  // console.info(formattedDate)

  dateFrom.value = formattedDate
  dateTo.value = formattedDate
})

const isLoading = ref(false)
const isError = ref(false)
const errorMsg = ref('')

const transactionList = ref('')

/**
 * 
 */
async function submit() {
  isLoading.value = true
  transactionList.value = ''
  isError.value = false
  errorMsg.value = ''

  // checksum hash "memberId|secretKey"
  const checksum = generateHash(`${memberID.value}|${merchantSecureKey.value}`)

  // required date format is "MM/DD/YYYY" 
  const dateFromArray = dateFrom.value.split('-')
  const fromDate = `${dateFromArray[1]}/${dateFromArray[2]}/${dateFromArray[0]}`

  const dateToArray = dateTo.value.split('-')
  const toDate = `${dateToArray[1]}/${dateToArray[2]}/${dateToArray[0]}`

  let accessToken = ''

  try {

    // todo: generate token
    const { data } = await useFetch('/api/pz/generateAuthToken', {
      method: 'post',
      body: {
        mode: mode.value,
        partnerID: partnerID.value,
        merchantUsername: merchantUsername.value,
        merchantSecureKey: merchantSecureKey.value,
      },
    })


    if (data.value.AuthToken) {
      console.info('Token generated')
      accessToken = data.value.AuthToken

      // submit
      try {
        const { data } = await useFetch('/api/pz/fetchList', {
          method: 'post',
          headers: { accessToken: accessToken },
          body: {
            mode: mode.value,
            memberID: memberID.value,
            checksum: checksum,
            from: fromDate,
            to: toDate
          },
        })

        if (data.value.transaction) {
          transactionList.value = data.value.transaction
        } else {
          isError.value = true
          errorMsg.value = 'No records found'
        }

        // console.info(data.value)
      } catch (error) {
        console.error(error)
      } finally {
        isLoading.value = false
      }
    } else {
      isError.value = true
      errorMsg.value = 'Failed to generate token'
      isLoading.value = false
    }

  } catch (error) {
    console.error(error)
  }


}
</script>

<template>
  <div v-if="currentUser">
    <PageTitle title="Backoffice">
    </PageTitle>

    <div class="flex flex-col gap-2">
      <!-- show endpoint -->
      <InputReadOnly label="Endpoint" v-model="modeText" :mode="mode" :display-character-count="false"
        @copy-content="copyString(modeText)" />

      <div class="flex flex-wrap gap-2 content-end">
        <!-- Date From -->
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text text-sky-400 font-bold">From</span>
          </label>
          <input type="date" class="input input-bordered" v-model="dateFrom">
        </div>

        <!-- Date To -->
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text text-sky-400 font-bold">To</span>
          </label>
          <input type="date" class="input input-bordered" v-model="dateTo">
        </div>

      </div>

      <button class="btn btn-primary my-2" :class="{ 'loading': isLoading }" @click="submit">Fetch Transactions</button>

      <Transition>
        <Alert colorStyle="alert-error" v-if="isError">
          {{ errorMsg }}
        </Alert>
      </Transition>

      <Transition>
        <div class=" overflow-x-auto" v-if="transactionList">
          <table class="table table-compact table-zebra w-full">
            <thead>
              <tr>
                <th>Date</th>
                <th>Tracking ID</th>
                <th>Amount</th>
                <th>Currency</th>
                <th>Merchant Transaction ID</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr class="hover" v-for="trx in transactionList">
                <td>{{ trx.transactionDate }}</td>
                <td>{{ trx.systemPaymentId }}</td>
                <td>{{ trx.amount }}</td>
                <td>{{ trx.currency }}</td>
                <td>{{ trx.merchantTransactionId }}</td>
                <td>{{ trx.transactionStatus }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th>Date</th>
                <th>Tracking ID</th>
                <th>Amount</th>
                <th>Currency</th>
                <th>Merchant Transaction ID</th>
                <th>Status</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </Transition>
    </div>
  </div>

  <div class="flex" v-else>
    <button class="btn btn-ghost btn-block loading"></button>
  </div>
</template>