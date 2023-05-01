<script setup>
  useHead({
    title: 'Kobeni | Backoffice',
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

    dateFrom.value = `${date.getFullYear()}-${month}-01` // always init at the 1st day of the month
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

    if (isEnabled)
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
                <th>No.</th>
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
              <tr class="hover" v-for="(trx, index) in transactionList">
                <td class="font-mono">{{ index + 1 }}</td>
                <td>{{ trx.transactionDate }}</td>
                <td>
                  <div class="btn-group">
                    <button class="btn btn-sm font-mono" @click="toggleModal(true, trx.systemPaymentId)">
                      {{ trx.systemPaymentId }}
                    </button>
                    <button class="btn btn-sm" @click="copyString(trx.systemPaymentId)">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path
                          d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" />
                        <path
                          d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z" />
                      </svg>
                    </button>
                  </div>
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

          <label class="btn btn-sm btn-circle absolute right-2 top-2" v-if="selectedTrxData"
            @click="toggleModal(false)">✕</label>

          <div v-if="selectedTrxData">
            <div class="flex flex-col gap-5 mt-7">
              <!-- header status -->
              <div class="stats shadow bg-slate-800 p-3">
                <div class="stat">
                  <div class="stat-title font-mono text-violet-400">
                    <span class="text-xs">#</span>{{ selectedTrx }}
                  </div>
                  <div class="stat-value text-xl">{{ selectedTrxData.result.description.toUpperCase() }}</div>
                  <div class="stat-desc font-mono ">{{ selectedTrxData.timestamp }}</div>
                </div>

                <div class="stat">
                  <div class="stat-title font-mono text-violet-400">
                    {{ selectedTrxData.currency }} <div class="badge" v-if="selectedTrxData.paymentBrand">{{
                      selectedTrxData.paymentBrand }}</div>
                  </div>
                  <div class="stat-value font-mono text-xl">{{ selectedTrxData.amount }}</div>
                  <div class="stat-desc font-mono ">
                    <span v-if="selectedTrxData.paymentMode">{{ selectedTrxData.paymentMode }} - </span>
                    {{ selectedTrxData.status }}
                  </div>
                </div>
              </div>

              <!-- content in columns -->
              <div class="flex gap-5  mx-5">
                <!-- statuses -->
                <div class="flex-1 space-y-3">

                  <div v-if="selectedTrxData.merchantTransactionId">
                    <h1 class="font-medium text-sky-400">Merchant Transaction ID</h1>
                    <span class="text-sm font-mono">
                      {{ selectedTrxData.merchantTransactionId }}
                    </span>
                  </div>

                  <div>
                    <h1 class="font-medium text-sky-400">Result Code</h1>
                    <div class="badge font-mono">
                      {{ selectedTrxData.result.code }}
                    </div>
                  </div>

                  <div v-if="selectedTrxData.bankReferenceId">
                    <h1 class="font-medium text-sky-400">Bank Reference ID</h1>
                    <span class="text-sm">
                      {{ selectedTrxData.bankReferenceId }}
                    </span>
                  </div>

                  <div v-if="selectedTrxData.remark">
                    <h1 class="font-medium text-sky-400">Bank Remark</h1>
                    <span class="text-sm">
                      {{ selectedTrxData.remark }}
                    </span>
                  </div>

                  <div v-if="selectedTrxData.transactionStatus">
                    <h1 class="font-medium text-sky-400">Transaction Status</h1>
                    <div class="badge">
                      {{ selectedTrxData.transactionStatus }}
                    </div>
                  </div>

                  <div v-if="selectedTrxData.eci">
                    <h1 class="font-medium text-sky-400">ECI</h1>
                    <span class="text-sm">
                      {{ selectedTrxData.eci }}
                    </span>
                  </div>

                  <div v-if="selectedTrxData.orderDescription">
                    <h1 class="font-medium text-sky-400">Order Description</h1>
                    <span class="text-sm">
                      {{ selectedTrxData.orderDescription }}
                    </span>
                  </div>
                </div>

                <!-- customer & card -->
                <div class="flex-1 space-y-3">
                  <div v-if="selectedTrxData.firstName || selectedTrxData.lastName">
                    <h1 class="font-medium text-sky-400">Name</h1>
                    <span class="text-sm">
                      {{ selectedTrxData.firstName }} {{ selectedTrxData.lastName }}
                    </span>
                  </div>

                  <div v-if="selectedTrxData.customer.email">
                    <h1 class="font-medium text-sky-400">Email</h1>
                    <span class="text-sm">
                      {{ selectedTrxData.customer.email }}
                    </span>
                  </div>

                  <div v-if="selectedTrxData.card.bin">
                    <h1 class="font-medium text-sky-400">BIN</h1>
                    <span class="text-sm font-mono">
                      {{ selectedTrxData.card.bin }}
                    </span>
                  </div>

                  <div v-if="selectedTrxData.card.last4Digits">
                    <h1 class="font-medium text-sky-400">Last 4 Digits</h1>
                    <span class="text-sm font-mono">
                      {{ selectedTrxData.card.last4Digits }}
                    </span>
                  </div>

                  <div v-if="selectedTrxData.card.holder">
                    <h1 class="font-medium text-sky-400">Card Holder</h1>
                    <span class="text-sm">
                      {{ selectedTrxData.card.holder }}
                    </span>
                  </div>

                  <div v-if="selectedTrxData.card.expiryMonth || selectedTrxData.card.expiryYear">
                    <h1 class="font-medium text-sky-400">Expiry</h1>
                    <span class="text-sm font-mono">
                      {{ selectedTrxData.card.expiryMonth }} / {{ selectedTrxData.card.expiryYear }}
                    </span>
                  </div>
                </div>

                <!-- data -->
                <div class="flex-1 space-y-3">
                  <div v-if="selectedTrxData.descriptor">
                    <h1 class="font-medium text-sky-400">Descriptor</h1>
                    <span class="text-sm">
                      {{ selectedTrxData.descriptor }}
                    </span>
                  </div>

                  <div v-if="selectedTrxData.companyName">
                    <h1 class="font-medium text-sky-400">Company Name</h1>
                    <span class="text-sm">
                      {{ selectedTrxData.companyName }}
                    </span>
                  </div>

                  <div v-if="selectedTrxData.merchantContact">
                    <h1 class="font-medium text-sky-400">Merchant Contact</h1>
                    <span class="text-sm">
                      {{ selectedTrxData.merchantContact }}
                    </span>
                  </div>

                  <div v-if="selectedTrxData.terminalId">
                    <h1 class="font-medium text-sky-400">Terminal ID</h1>
                    <span class="text-sm">
                      {{ selectedTrxData.terminalId }}
                    </span>
                  </div>

                  <div v-if="selectedTrxData.checksum">
                    <h1 class="font-medium text-sky-400">Checksum</h1>
                    <span class="text-sm font-mono">
                      {{ selectedTrxData.checksum }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="divider"></div>
            </div>

            <!-- buttons here -->
            <div class="flex flex-row-reverse gap-2">


              <button class="btn btn-warning gap-2" v-if="selectedTrxData.result.code == '00001'">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M8.25 9.75h4.875a2.625 2.625 0 010 5.25H12M8.25 9.75L10.5 7.5M8.25 9.75L10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z" />
                </svg>
                Refund
              </button>

              <button class="btn gap-2" @click="copyEntireResponse(selectedTrxData)">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                </svg>
                Data
              </button>
            </div>
          </div>

          <progress class="progress" v-else></progress>

        </div>
      </div>
    </div>
  </div>

  <div class="flex" v-else>
    <button class="btn btn-ghost btn-block loading"></button>
  </div>
</template>