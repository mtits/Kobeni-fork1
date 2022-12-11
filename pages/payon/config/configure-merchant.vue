<template>
  <div>
    <Alert title="Info" color-style="bg-base-300">
      Input your BIP credentials. Set up the widget behaviour.
    </Alert>

    <!-- select environment -->
    <div class="form-control mt-3">
      <label class="label mb-1">
        <span class="label-text text-sky-400 font-bold">Environment</span>
      </label>
      <select class="select" v-model="mode">
        <option v-for="option in modeOptions" :value="option.value">
          {{ option.text }}
        </option>
      </select>
      <label class="label">
        <span class="label-text-alt italic">{{ modeText }}</span>
      </label>
    </div>

    <Input label="Access Token" type="password" v-model="accessToken" />
    <Input label="Entity ID" type="text" v-model="entityId" />

    <!-- select brands -->
    <div class="flex w-full mt-6 space-x-6">
      <!-- left side -->
      <div class="grid flex-grow space-y-6 w-1/2">
        <!-- cards -->
        <div class="card bg-base-100">
          <div class="card-body">
            <label class="label">
              <span class="label-text text-sky-400 font-bold">Card Brands</span>
            </label>
            <!-- select brands -->
            <select
              class="select"
              size="10"
              v-model="selectedCardBrands"
              multiple>
              <option v-for="brand in cardBrandList">{{ brand }}</option>
            </select>
          </div>
        </div>

        <!-- virtual -->
        <div class="card bg-base-100">
          <div class="card-body">
            <label class="label">
              <span class="label-text text-sky-400 font-bold"
                >Virtual Accounts</span
              >
            </label>
            <select
              class="select"
              size="10"
              v-model="selectedVirtualBrands"
              multiple>
              <option v-for="brand in virtualBrandList">{{ brand }}</option>
            </select>
          </div>
        </div>

        <!-- banks -->
        <div class="card bg-base-100">
          <div class="card-body">
            <label class="label">
              <span class="label-text text-sky-400 font-bold"
                >Bank Accounts</span
              >
            </label>
            <select
              class="select"
              size="10"
              v-model="selectedBankBrands"
              multiple>
              <option v-for="brand in bankBrandList">{{ brand }}</option>
            </select>
          </div>
        </div>
      </div>

      <!-- right side -->
      <div class="grid flex-grow space-y-6 w-1/2">
        <div class="card bg-base-100">
          <div class="card-body">
            <label class="label">
              <span class="label-text text-sky-400 font-bold"
                >Selected Brands</span
              >
            </label>
            <div class="card-actions justify-start">
              <!-- selected brands display via badges -->
              <TransitionGroup>
                <div
                  class="badge badge-lg"
                  v-for="brand in combinedSelectedBrands"
                  :key="brand">
                  {{ brand }}
                </div>
              </TransitionGroup>
            </div>
          </div>
        </div>

        <!-- active selected brands -->
        <div class="card bg-base-100">
          <div class="card-body">
            <label class="label">
              <span class="label-text text-sky-400 font-bold"
                >ACTIVE Selected Brands</span
              >
            </label>
            <div class="card-actions justify-start">
              <!-- selected brands display via badges -->
              <TransitionGroup>
                <div
                  class="badge badge-lg"
                  v-for="brand in selectedBrands"
                  :key="brand">
                  {{ brand }}
                </div>
              </TransitionGroup>
            </div>
          </div>
        </div>

        <div>
          <button
            class="btn w-full"
            @click="selectedBrands = combinedSelectedBrands">
            Set Active Brands
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  definePageMeta({
    pageTitle: 'Kobeni | Configure Merchant',
  })

  //
  const mode = useState('mode')
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
  const modeText = computed(() => {
    if (mode.value == 'Test') {
      return '"https://eu-test.oppwa.com/v1/..."'
    } else {
      return '"https://eu-prod.oppwa.com/v1/..."'
    }
  })

  const selectedCardBrands = useState('selectedCardBrands')
  const cardBrandList = getBrandsList().cards

  const selectedVirtualBrands = useState('selectedVirtualBrands')
  const virtualBrandList = getBrandsList().virtual

  const selectedBankBrands = useState('selectedBankBrands')
  const bankBrandList = getBrandsList().bank

  const combinedSelectedBrands = computed(() => {
    return [
      ...selectedCardBrands.value,
      ...selectedVirtualBrands.value,
      ...selectedBankBrands.value,
    ]
  })

  const selectedBrands = useState('selectedBrands')
  // get app states
  const accessToken = useState('accessToken')
  const entityId = useState('entityId')
</script>
