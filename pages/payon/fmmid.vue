<script setup>
  definePageMeta({
    pageTitle: 'Kobeni | Format Thy MID',
  })

  const currentUser = useState('currentUser')

  const MID = ref('69420')
  const merchantName = ref('Cognito Inc.')
  const jcbAcquirerBIN = ref('')

  const visaRequestorID = computed(() => {
    return `10066501*${MID.value}`
  })

  const mastercardRequestorID = computed(() => {
    return `ACI77858_${MID.value}`
  })

  const mastercardRequestorName = computed(() => {
    return `ACI Worldwide_${merchantName.value}`
  })

  const discoverRequestorID = computed(() => {
    return `ACI_${MID.value}`
  })

  const jcbRequestorID = computed(() => {
    return `${jcbAcquirerBIN.value}MCT${MID.value}`
  })
</script>

<template>
  <div v-if="currentUser">
    <PageTitle title="Format Thy MID">
      Enter thy MID information beneath and I shall format thee!
    </PageTitle>

    <div class="flex flex-col space-y-3">
      <Input label="Merchant ID" place-holder="e.g. 69420" v-model="MID" />
      <Input
        label="Merchant Name"
        place-holder="e.g. Cognito Inc."
        v-model="merchantName" />
      <Input
        label="Acquirer BIN (required for JCB)"
        place-holder="e.g. 35000"
        v-model="jcbAcquirerBIN" />

      <div class="grid grid-cols-2 gap-6">
        <!-- VISA Content -->
        <Transition>
          <div class="card bg-base-200 shadow-xl" v-if="MID || merchantName">
            <div class="card-body">
              <div class="prose">
                <h2 class="text-sky-300">VISA</h2>
              </div>

              <InputReadOnly
                label="Requestor ID"
                v-model="visaRequestorID"
                :character-count="visaRequestorID.length"
                :character-count-max="35"
                @copy-content="copyString(visaRequestorID)"
                v-if="MID" />

              <InputReadOnly
                label="Requestor Name"
                v-model="merchantName"
                :character-count="merchantName.length"
                :character-count-max="40"
                @copy-content="copyString(merchantName)"
                v-if="merchantName" />
            </div>
          </div>
        </Transition>

        <!-- Mastercard -->
        <Transition>
          <div class="card bg-base-200 shadow-xl" v-if="MID || merchantName">
            <div class="card-body">
              <div class="prose">
                <h2 class="text-sky-300">MASTERCARD</h2>
              </div>

              <InputReadOnly
                label="Requestor ID"
                v-model="mastercardRequestorID"
                :character-count="mastercardRequestorID.length"
                :character-count-max="35"
                @copy-content="copyString(mastercardRequestorID)"
                v-if="MID" />

              <InputReadOnly
                label="Requestor Name"
                v-model="mastercardRequestorName"
                :character-count="mastercardRequestorName.length"
                :character-count-max="40"
                @copy-content="copyString(mastercardRequestorName)"
                v-if="merchantName" />
            </div>
          </div>
        </Transition>

        <!-- Discover -->
        <Transition>
          <div class="card bg-base-200 shadow-xl" v-if="MID">
            <div class="card-body">
              <div class="prose">
                <h2 class="text-sky-300">Discover</h2>
              </div>

              <InputReadOnly
                label="Requestor ID"
                v-model="discoverRequestorID"
                :character-count="discoverRequestorID.length"
                :character-count-max="35"
                @copy-content="copyString(discoverRequestorID)"
                v-if="MID" />
            </div>
          </div>
        </Transition>

        <!-- JCB -->
        <Transition>
          <div
            class="card bg-base-200 shadow-xl"
            v-if="(MID && jcbAcquirerBIN) || merchantName">
            <div class="card-body">
              <div class="prose">
                <h2 class="text-sky-300">JCB</h2>
              </div>

              <InputReadOnly
                label="Requestor ID"
                v-model="jcbRequestorID"
                :character-count="jcbRequestorID.length"
                :character-count-max="35"
                @copy-content="copyString(jcbRequestorID)"
                v-if="MID && jcbAcquirerBIN" />

              <InputReadOnly
                label="Requestor Name"
                v-model="merchantName"
                :character-count="merchantName.length"
                :character-count-max="40"
                @copy-content="copyString(merchantName)"
                v-if="merchantName" />
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>
