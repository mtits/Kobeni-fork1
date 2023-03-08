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

// 
const statusList = ref(['ALL', 'begun', 'authstarted', 'authsuccessful', 'authfailed', 'authcancelled', 'cancelstarted', 'cancelled', 'capturestarted', 'capturesuccess', 'capturefailed', 'markedforreversal', 'reversed', 'chargeback', 'failed', 'payoutstarted', 'payoutsuccessful', 'payoutfailed'])
const selectedStatus = ref('ALL')

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
const errorColorStyle = ref('alert-error')

/**
 * sets the states to display the alert msg
 * @param {string} colorStyle 
 * @param {string} errorMsg 
 */
function displayError(colorStyle, msg) {
  isError.value = true
  errorColorStyle.value = colorStyle
  errorMsg.value = msg
  isLoading.value = false
}

/**
 * reset states
 */
function clearStates() {
  isLoading.value = true
  transactionList.value = ''
  isError.value = false
  errorMsg.value = ''
}

const transactionList = ref('')
const authToken = useState('authToken')


/**
 * 
 */
async function submit() {
  clearStates()

  // checksum hash "memberId|secretKey"
  const checksum = generateHash(`${memberID.value}|${merchantSecureKey.value}`)

  // required date format is "MM/DD/YYYY" 
  const dateFromArray = dateFrom.value.split('-')
  const fromDate = `${dateFromArray[1]}/${dateFromArray[2]}/${dateFromArray[0]}`

  const dateToArray = dateTo.value.split('-')
  const toDate = `${dateToArray[1]}/${dateToArray[2]}/${dateToArray[0]}`


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
      authToken.value = data.value.AuthToken

      // submit
      try {
        const { data } = await useFetch('/api/pz/fetchList', {
          method: 'post',
          headers: { accessToken: authToken.value },
          body: {
            mode: mode.value,
            memberID: memberID.value,
            checksum: checksum,
            from: fromDate,
            to: toDate,
            status: selectedStatus.value
          },
        })

        if (data.value.transaction) {
          transactionList.value = data.value.transaction
        } else {
          displayError('alert-warning', 'No records found')
        }

        // console.info(data.value)
      } catch (error) {
        console.error(error)
      } finally {
        isLoading.value = false
      }
    } else {
      displayError('alert-error', 'Failed to generate token')
      isLoading.value = false
    }

  } catch (error) {
    console.error(error)
  }
}



const isModalEnabled = ref(false)
const selectedTrx = ref('')
const selectedTrxData = ref('')

/**
 * 
 */
async function queryTransaction() {
  // clear data
  selectedTrxData.value = ''

  try {
    const { data } = await useFetch('/api/pz/query', {
      method: 'post',
      headers: { accessToken: authToken.value },
      body: {
        mode: mode.value,
        memberId: memberID.value,
        id: selectedTrx.value,
        checksum: generateHash(`${memberID.value}|${merchantSecureKey.value}|${selectedTrx.value}`) // <memberId>|<secureKey>|<paymentId>
      },
    })

    selectedTrxData.value = data.value

    // 
  } catch (error) {
    console.error(error)
  }

}

/**
 * toggles the "isModalEnabled" state and add a ref to the trx to display in the modal
 * @param {boolean} isEnabled 
 * @param {string} trxRef 
 */
function toggleModal(isEnabled, trxRef = '') {
  isModalEnabled.value = isEnabled
  selectedTrx.value = trxRef

  if (isEnabled == true)
    queryTransaction()
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

        <!-- TODO: status filters -->
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text text-sky-400 font-bold">Status</span>
          </label>
          <select class="select select-bordered" v-model="selectedStatus">
            <option v-for="status in statusList" :value="status">{{ status }}</option>
          </select>
        </div>
      </div>

      <button class="btn btn-primary my-2" :class="{ 'loading': isLoading }" @click="submit">Fetch Transactions</button>

      <Transition>
        <Alert :colorStyle="errorColorStyle" v-if="isError">
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
                <th>Brand</th>
                <th>BIN</th>
                <th>Last 4 Digits</th>
                <th>Transaction ID</th>
                <th>Status</th>
                <th>Remark</th>
              </tr>
            </thead>
            <tbody>
              <tr class="hover" v-for="trx in transactionList">
                <td>{{ trx.transactionDate }}</td>
                <td>
                  <a class="btn btn-sm" @click="toggleModal(true, trx.systemPaymentId)">
                    {{ trx.systemPaymentId }}
                  </a>
                </td>
                <td class="font-mono">
                  {{ trx.amount }}
                </td>
                <td>{{ trx.currency }}</td>
                <td>{{ trx.paymentBrand }}</td>
                <td class="font-mono">
                  {{ trx.card.bin }}
                </td>
                <td class="font-mono">{{ trx.card.lastFourDigits }}</td>
                <td>{{ trx.merchantTransactionId }}</td>
                <td>{{ trx.transactionStatus }}</td>
                <td>{{ trx.remark }}</td>
              </tr>
            </tbody>
          </table>

        </div>
      </Transition>

      <!-- modal -->
      <div class="modal" :class="{ 'modal-open': isModalEnabled }">
        <div class="modal-box w-11/12 max-w-4xl">
          <label class="btn btn-sm btn-circle absolute right-2 top-2" @click="toggleModal(false)">✕</label>

          <h3 class="text-lg font-bold text-sky-400">{{ selectedTrx }}</h3>

          <div class="flex flex-col" v-if="selectedTrxData">

            <div class="flex gap-3 mt-6">

              <!-- statuses -->
              <div class="space-y-2">
                <div>
                  <h1 class="font-medium text-sky-400">Result Code</h1>
                  <span class="text-sm">
                    {{ selectedTrxData.result.code }}
                  </span>
                </div>

                <div>
                  <h1 class="font-medium text-sky-400">Description</h1>
                  <span class="text-sm">
                    {{ selectedTrxData.result.description }}
                  </span>
                </div>
              </div>

              <!-- data -->
              <div class="space-y-2">
                <div>
                  <h1 class="font-medium text-sky-400">Status</h1>
                  <span class="text-sm">
                    {{ selectedTrxData.status }}
                  </span>
                </div>

                <div>
                  <h1 class="font-medium text-sky-400">Brand</h1>
                  <span class="text-sm">
                    {{ selectedTrxData.paymentBrand }}
                  </span>
                </div>

                <div>
                  <h1 class="font-medium text-sky-400">Payment Mode</h1>
                  <span class="text-sm">
                    {{ selectedTrxData.paymentMode }}
                  </span>
                </div>

                <div>
                  <h1 class="font-medium text-sky-400">Amount</h1>
                  <span class="text-sm font-mono">
                    {{ selectedTrxData.amount }}
                  </span>
                </div>

                <div>
                  <h1 class="font-medium text-sky-400">Currency</h1>
                  <span class="text-sm">
                    {{ selectedTrxData.currency }}
                  </span>
                </div>

                <div>
                  <h1 class="font-medium text-sky-400">Descriptor</h1>
                  <span class="text-sm">
                    {{ selectedTrxData.descriptor }}
                  </span>
                </div>
              </div>

              <!-- card -->
              <div class="space-y-2">
                <div>
                  <h1 class="font-medium text-sky-400">BIN</h1>
                  <span class="text-sm font-mono">
                    {{ selectedTrxData.card.bin }}
                  </span>
                </div>

                <div>
                  <h1 class="font-medium text-sky-400">Last 4 Digits</h1>
                  <span class="text-sm font-mono">
                    {{ selectedTrxData.card.last4Digits }}
                  </span>
                </div>

                <div>
                  <h1 class="font-medium text-sky-400">Card Holder</h1>
                  <span class="text-sm">
                    {{ selectedTrxData.card.holder }}
                  </span>
                </div>

                <div>
                  <h1 class="font-medium text-sky-400">Expiry</h1>
                  <span class="text-sm font-mono">
                    {{ selectedTrxData.card.expiryMonth }} / {{ selectedTrxData.card.expiryYear }}
                  </span>
                </div>
              </div>

              <!-- customer -->
              <div class="space-y-2">
                <div>
                  <h1 class="font-medium text-sky-400">First Name</h1>
                  <span class="text-sm">
                    {{ selectedTrxData.firstName }}
                  </span>
                </div>

                <div>
                  <h1 class="font-medium text-sky-400">Last Name</h1>
                  <span class="text-sm">
                    {{ selectedTrxData.lastName }}
                  </span>
                </div>

                <div>
                  <h1 class="font-medium text-sky-400">Email</h1>
                  <span class="text-sm">
                    {{ selectedTrxData.customer.email }}
                  </span>
                </div>
              </div>

              <!-- misc. -->
              <div class="space-y-2">
                <div>
                  <h1 class="font-medium text-sky-400">Timestamp</h1>
                  <span class="text-sm">
                    {{ selectedTrxData.timestamp }}
                  </span>
                </div>

                <div>
                  <h1 class="font-medium text-sky-400">Merchant Transaction ID</h1>
                  <span class="text-sm">
                    {{ selectedTrxData.merchantTransactionId }}
                  </span>
                </div>

                <div>
                  <h1 class="font-medium text-sky-400">Bank Remark</h1>
                  <span class="text-sm">
                    {{ selectedTrxData.remark }}
                  </span>
                </div>

                <div>
                  <h1 class="font-medium text-sky-400">Transaction Status</h1>
                  <span class="text-sm">
                    {{ selectedTrxData.transactionStatus }}
                  </span>
                </div>

                <div>
                  <h1 class="font-medium text-sky-400">Checksum</h1>
                  <span class="text-sm">
                    {{ selectedTrxData.checksum }}
                  </span>
                </div>

                <div>
                  <h1 class="font-medium text-sky-400">Order Description</h1>
                  <span class="text-sm">
                    {{ selectedTrxData.orderDescription }}
                  </span>
                </div>

                <div>
                  <h1 class="font-medium text-sky-400">Company Name</h1>
                  <span class="text-sm">
                    {{ selectedTrxData.companyName }}
                  </span>
                </div>

                <div>
                  <h1 class="font-medium text-sky-400">Merchant Contact</h1>
                  <span class="text-sm">
                    {{ selectedTrxData.merchantContact }}
                  </span>
                </div>

                <div>
                  <h1 class="font-medium text-sky-400">Terminal ID</h1>
                  <span class="text-sm">
                    {{ selectedTrxData.terminalId }}
                  </span>
                </div>

                <div>
                  <h1 class="font-medium text-sky-400">Bank Reference ID</h1>
                  <span class="text-sm">
                    {{ selectedTrxData.bankReferenceId }}
                  </span>
                </div>
              </div>

            </div>


          </div>

          <button class="btn btn-ghost btn-block loading" v-else></button>
        </div>
      </div>
    </div>
  </div>

  <div class="flex" v-else>
    <button class="btn btn-ghost btn-block loading"></button>
  </div>
</template>