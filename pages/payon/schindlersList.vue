<script setup lang="ts">
  usePageHead("Schindler's list")

  const currentUser = useState('currentUser')
  const mode = useState('mode')
  const accessToken = useState('accessToken')
  const entityId = useState('entityId')

  const dateFrom = ref('')
  const dateTo = ref('')
  const today = new Date()

  dateFrom.value = `${today.getFullYear()}-${expectoPrefixTheZeroNum(today.getMonth() + 1)}-01`
  dateTo.value = `${today.getFullYear()}-${expectoPrefixTheZeroNum(today.getMonth() + 1)}-${expectoPrefixTheZeroNum(today.getDate())}`

  const paymentTypes = ref([
    { name: 'Preauth', value: 'PA' },
    { name: 'Capture', value: 'CP' },
    { name: 'Reverse', value: 'RV' },
    { name: 'Debit', value: 'DB' },
    { name: 'Refund', value: 'RF' },
    { name: 'Three D Secure', value: '3D' },
    { name: 'Risk Intelligence', value: 'RI' },
  ])

  const selectedPaymentType = ref('PA')
  const isPending = ref(false)
  const records = ref()
  const errorResponse = ref()

  /**
   * 
   */
  const getDates = async () => {
    try {
      isPending.value = true
      records.value = undefined
      errorResponse.value = undefined

      const { data } = await useFetch('/api/payon/schindlerslist', {
        method: 'post',
        body: {
          mode: mode.value,
          entityId: entityId.value,
          accessToken: accessToken.value,
          dateFrom: dateFrom.value,
          dateTo: dateTo.value,
          paymentTypes: selectedPaymentType.value
        },
      })

      if (data.value.records)
        records.value = data.value.records

      errorResponse.value = data.value
      //
    } catch (error) {
      console.error(error)

      // 
    } finally {
      isPending.value = false
    }

  }
</script>

<template>
  <div v-if="currentUser">
    <PageTitle title="Burn 'em"></PageTitle>

    <div class="flex flex-col gap-2">
      <div class="flex gap-2">
        <!-- date from -->
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text">From (defaults to the 1st day of the month)</span>
          </label>
          <input type="date" placeholder="Type here" class="input input-bordered w-full max-w-xs" v-model="dateFrom" />
        </div>

        <!-- date to -->
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text">To (defaults to today)</span>
          </label>
          <input type="date" placeholder="Type here" class="input input-bordered w-full max-w-xs" v-model="dateTo" />
        </div>

        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text">Payment Type</span>
          </label>

          <select class="select select-bordered" v-model="selectedPaymentType">
            <option v-for="type in paymentTypes" :value="type.value">{{ type.name }}</option>
          </select>
        </div>
      </div>

      <Alert title="Info" color-style="bg-sky-900 text-slate-300">
        This integration sometimes vomits horrible Eldritch nightmares. Filter at your own risk.
      </Alert>

      <div class="flex gap-2">
        <button class="btn" :class="{ 'loading': isPending }" @click="getDates">Fetch List</button>
      </div>

      <Transition>
        <div v-if="records">
          <span class="block mb-1 ml-2 text-xs">Displaying {{ records.length }} Records</span>
          <div class="overflow-x-auto">
            <table class="table table-zebra table-compact w-full">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>ID</th>
                  <th>Merchant Transaction ID</th>
                  <th>Result Code</th>
                  <th>Result Description</th>
                  <th>Brand</th>
                  <th>Currency</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr class="hover" v-for="record in records" :key="record.id">
                  <td class="text-xs font-mono">{{ record.timestamp }}</td>
                  <td class="text-xs font-mono">{{ record.id }}</td>
                  <td class="text-xs font-mono">{{ record.merchantTransactionId }}</td>
                  <td class="text-xs font-mono">{{ record.result.code }}</td>
                  <td class="text-xs font-mono">
                    <p class="max-w-xs truncate">{{ record.result.description }}</p>
                  </td>
                  <td class="text-xs font-mono">{{ record.paymentBrand }}</td>
                  <td class="text-xs font-mono">{{ record.currency }}</td>
                  <td class="text-xs font-mono">{{ record.amount }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th>Timestamp</th>
                  <th>ID</th>
                  <th>Merchant Transaction ID</th>
                  <th>Result Code</th>
                  <th>Result Description</th>
                  <th>Brand</th>
                  <th>Currency</th>
                  <th>Amount</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div v-else-if="errorResponse">
          <Textareadisplayonly label="Response" :data="errorResponse" />
        </div>
      </Transition>
    </div>
  </div>

  <LoadingDisplay v-else />
</template>