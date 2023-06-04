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
  const fetchList = async () => {
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



  /**
   * ALL MODAL RELATED THINGIES
   */

  const isModalOpen = ref(false)
  const selectedId = ref('')
  const selectedTrx = ref()

  /**
   * Open the modal and set the selected trx ID for display
   * @param trxID - The selected transaciton ID
   */
  const openModal = (trxID: string) => {
    selectedId.value = trxID
    isModalOpen.value = true

    selectedTrx.value = records.value.filter((record: { id: string }) => {
      if (record.id === trxID) {
        return record
      }
    })[0]
  }
</script>

<template>
  <div v-if="currentUser">
    <PageTitle title="Burn 'em"></PageTitle>

    <Alert class="mb-3" color-style="bg-sky-900 text-slate-300">
      This integration sometimes <i>vomits horrible Eldritch nightmares</i>. Filter at your own risk.
    </Alert>

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
            <option v-for="paymentType in paymentTypes" :value="paymentType.value">{{ paymentType.name }}</option>
          </select>
        </div>
      </div>



      <div class="flex gap-2">
        <button class="btn" :class="{ 'loading': isPending }" @click="fetchList">Fetch List</button>
      </div>

      <Transition>
        <div v-if="records">
          <span class="block mb-1 ml-2 text-xs">Displaying {{ records.length }} Records</span>
          <div class="overflow-x-auto">
            <table class="table table-zebra table-compact w-full">
              <thead>
                <TableHeaderRow />
              </thead>
              <tbody>
                <tr class="hover" v-for="record in records" :key="record.id">
                  <td class="text-xs font-mono">
                    {{ record.timestamp }}
                  </td>

                  <td class="text-xs font-mono">
                    <button class="link" @click="openModal(record.id)">{{ record.id }}</button>
                  </td>

                  <td class="text-xs font-mono">
                    <p class="w-48 truncate">
                      {{ record.merchantTransactionId }}
                    </p>
                  </td>

                  <td class="text-xs font-mono">
                    {{ record.result.code }}
                  </td>

                  <td class="text-xs font-mono">
                    <p class="w-48 truncate">{{ record.result.description }}</p>
                  </td>

                  <td class="text-xs font-mono">
                    {{ record.paymentBrand }}
                  </td>

                  <td class="text-xs font-mono">
                    {{ record.currency }}
                  </td>

                  <td class="text-xs font-mono">
                    {{ record.amount }}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <TableHeaderRow />
              </tfoot>
            </table>
          </div>
        </div>

        <div v-else-if="errorResponse">

          <Alert colorStyle="alert-error">
            <span class="uppercase">
              {{ errorResponse.result.description }}
            </span>
          </Alert>

          <!-- <Textareadisplayonly label="Response" :data="errorResponse" /> -->
        </div>
      </Transition>
    </div>

    <!-- iz modal boi -->
    <div class="modal" :class="{ 'modal-open': isModalOpen }">
      <div class="modal-box max-w-5xl" v-if="selectedTrx">

        <!-- title and shit -->
        <div class="bg-sky-900 p-5 rounded-lg shadow flex flex-col gap-3">
          <div>
            <span class="font-mono text-xs text-sky-400 opacity-70">{{ selectedTrx.result.code }}</span>
            <p class="font-bold text-lg uppercase">{{ selectedTrx.result.description }}</p>
          </div>

          <div>
            <span class="font-mono text-xs bg-slate-900 rounded-full p-2">{{ selectedTrx.paymentBrand }}</span>
          </div>
        </div>

        <div class="flex flex-col gap-3 m-5">
          <!-- more trx deets -->
          <div class="flex flex-wrap gap-3">
            <!-- the generics -->
            <div class="flex flex-col gap-3">
              <ModalDisplayItem field-title="ID" v-if="selectedTrx.id">
                {{ selectedTrx.id }}
              </ModalDisplayItem>

              <ModalDisplayItem field-title="merchant Transaction Id" v-if="selectedTrx.merchantTransactionId">
                {{ selectedTrx.merchantTransactionId }}
              </ModalDisplayItem>

              <ModalDisplayItem field-title="descriptor" v-if="selectedTrx.descriptor">
                {{ selectedTrx.descriptor }}
              </ModalDisplayItem>

              <ModalDisplayItem field-title="payment Type" v-if="selectedTrx.paymentType">
                {{ selectedTrx.paymentType }}
              </ModalDisplayItem>

              <ModalDisplayItem field-title="amount" v-if="selectedTrx.amount">
                {{ selectedTrx.amount }} {{ selectedTrx.currency }}
              </ModalDisplayItem>
            </div>

            <!-- all card data everything -->
            <div class="flex flex-col gap-3" v-if="selectedTrx.card">
              <ModalDisplayItem field-title="BIN" v-if="selectedTrx.card.bin">
                {{ selectedTrx.card.bin }}
              </ModalDisplayItem>

              <ModalDisplayItem field-title="last 4 Digits" v-if="selectedTrx.card.last4Digits">
                {{ selectedTrx.card.last4Digits }}
              </ModalDisplayItem>

              <ModalDisplayItem field-title="expiry Month" v-if="selectedTrx.card.expiryMonth">
                {{ selectedTrx.card.expiryMonth }}
              </ModalDisplayItem>

              <ModalDisplayItem field-title="expiry Year" v-if="selectedTrx.card.expiryYear">
                {{ selectedTrx.card.expiryYear }}
              </ModalDisplayItem>

              <ModalDisplayItem field-title="holder" v-if="selectedTrx.card.holder">
                {{ selectedTrx.card.holder }}
              </ModalDisplayItem>

              <ModalDisplayItem field-title="type" v-if="selectedTrx.card.type">
                {{ selectedTrx.card.type }}
              </ModalDisplayItem>

              <ModalDisplayItem field-title="max Pan Length" v-if="selectedTrx.card.maxPanLength">
                {{ selectedTrx.card.maxPanLength }}
              </ModalDisplayItem>

              <ModalDisplayItem field-title="regulated Flag" v-if="selectedTrx.card.regulatedFlag">
                {{ selectedTrx.card.regulatedFlag }}
              </ModalDisplayItem>
            </div>

            <!-- all bank data everything -->
            <div v-if="selectedTrx.card">
              <div v-if="selectedTrx.card.issuer">
                <span class="block uppercase font-mono text-xs opacity-50">Bank Info</span>

                <div class="flex flex-col gap-3 bg-gray-900 shadow p-4 mt-2 rounded-lg">
                  <ModalDisplayItem field-title="Issuing Bank" v-if="selectedTrx.card.issuer.bank">
                    {{ selectedTrx.card.issuer.bank }}
                  </ModalDisplayItem>

                  <ModalDisplayItem field-title="phone" v-if="selectedTrx.card.issuer.phone">
                    {{ selectedTrx.card.issuer.phone }}
                  </ModalDisplayItem>

                  <ModalDisplayItem field-title="website" v-if="selectedTrx.card.issuer.website">
                    {{ selectedTrx.card.issuer.website }}
                  </ModalDisplayItem>
                </div>
              </div>
            </div>
          </div>

          <!-- custom params -->
          <div v-if="selectedTrx.customParameters">
            <span class="block uppercase font-mono text-xs opacity-50">custom Parameters</span>
            <div class="bg-gray-900 shadow p-4 rounded-lg mt-1">
              <p class="font-mono text-xs max-w-4xl truncate">
              <pre>{{ selectedTrx.customParameters }}</pre>
              </p>
            </div>
          </div>
        </div>



        <!-- close btn -->
        <div class="modal-action mx-5">
          <button class="btn" @click="isModalOpen = false">Close</button>
        </div>
      </div>
    </div>


  </div>
  <LoadingDisplay v-else />
</template>