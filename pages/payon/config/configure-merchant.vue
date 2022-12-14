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

<template>
  <div class="flex flex-col space-y-3">
    <Alert class="mt-3" title="Info" color-style="bg-base-300">
      Input your BIP credentials. Set up the widget behaviour.
    </Alert>

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
      <label class="label">
        <span class="label-text-alt italic">{{ modeText }}</span>
      </label>
    </div>

    <Input label="Access Token" type="password" v-model="accessToken" />

    <Input label="Entity ID" type="text" v-model="entityId" />

    <div></div>

    <!-- select brands -->
    <div class="flex space-x-6">
      <!-- left side -->
      <div class="grid space-y-6 w-1/2">
        <!-- cards -->
        <div class="card bg-base-100">
          <div class="card-body">
            <h2 class="card-title text-sky-400">Card Brands</h2>
            <!-- select brands -->
            <select
              class="select select-bordered"
              size="10"
              v-model="selectedCardBrands"
              multiple>
              <option v-for="brand in cardBrandList">{{ brand }}</option>
            </select>

            <!-- display currently selected for this section -->
            <div class="card-actions justify-start mt-3">
              <TransitionGroup>
                <div
                  class="badge badge-info badge-lg"
                  v-for="brand in selectedCardBrands"
                  :key="brand">
                  {{ brand }}
                </div>
              </TransitionGroup>
            </div>
          </div>
        </div>

        <!-- virtual -->
        <div class="card bg-base-100">
          <div class="card-body">
            <h2 class="card-title text-sky-400">Virtual Accounts</h2>
            <select
              class="select select-bordered"
              size="10"
              v-model="selectedVirtualBrands"
              multiple>
              <option v-for="brand in virtualBrandList">{{ brand }}</option>
            </select>

            <!-- display currently selected for this section -->
            <div class="card-actions justify-start mt-3">
              <TransitionGroup>
                <div
                  class="badge badge-info badge-lg"
                  v-for="brand in selectedVirtualBrands"
                  :key="brand">
                  {{ brand }}
                </div>
              </TransitionGroup>
            </div>
          </div>
        </div>

        <!-- banks -->
        <div class="card bg-base-100">
          <div class="card-body">
            <h2 class="card-title text-sky-400">Bank Accounts</h2>
            <select
              class="select select-bordered"
              size="10"
              v-model="selectedBankBrands"
              multiple>
              <option v-for="brand in bankBrandList">{{ brand }}</option>
            </select>

            <!-- display currently selected for this section -->
            <div class="card-actions justify-start mt-3">
              <TransitionGroup>
                <div
                  class="badge badge-info badge-lg"
                  v-for="brand in selectedBankBrands"
                  :key="brand">
                  {{ brand }}
                </div>
              </TransitionGroup>
            </div>
          </div>
        </div>
      </div>

      <!-- right side -->
      <div class="grid w-1/2">
        <!-- active selected brands -->
        <div class="card bg-neutral">
          <div class="card-body">
            <h2 class="card-title text-sky-400">ACTIVE Selected Brands</h2>

            <div class="space-y-3">
              <p>
                Select the brands on the left that is associated with the MID
                that you set above. This controls the set of brands that will be
                used inside the widget form "data-brands" attribute.
              </p>

              <button
                class="btn btn-accent w-full"
                @click="selectedBrands = combinedSelectedBrands">
                Set Active Brands
              </button>

              <div class="justify-start space-x-3 space-y-3">
                <!-- selected brands display via badges -->
                <TransitionGroup>
                  <div
                    class="badge badge-warning badge-lg"
                    v-for="brand in selectedBrands"
                    :key="brand">
                    {{ brand }}
                  </div>
                </TransitionGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
