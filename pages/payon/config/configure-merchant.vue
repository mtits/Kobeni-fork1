<script setup lang="ts">
  usePageHead('Configure Merchant')

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

  /**
   * combine all 3 arrays of selected brands
   */
  const combinedSelectedBrands = computed(() => {
    return [
      ...(selectedCardBrands.value as string[]),
      ...(selectedVirtualBrands.value as string[]),
      ...(selectedBankBrands.value as string[]),
    ]
  })

  const selectedBrands = useState('selectedBrands')

  // get app states
  const accessToken = useState<string>('accessToken')
  const entityId = useState<string>('entityId')
  const trxId = useState<string>('payonTrxId')
</script>

<template>
  <div class="flex flex-col space-y-16">
    <div></div>
    <!-- env row -->
    <div class="flex gap-10">
      <!-- left -->
      <div class="flex-none w-96 space-y-2">
        <div class="prose">
          <h3 class="text-sky-400 font-bold">Environment</h3>
        </div>

        <p class="text-sm">
          This determines which subdomain to use throughout the request process
          (including the widget form submit URL).
        </p>
      </div>

      <div class="flex-1">
        <!-- select environment -->
        <div class="form-control mt-3">
          <select class="select select-bordered" v-model="mode">
            <option v-for="option in modeOptions" :value="option.value">
              {{ option.text }}
            </option>
          </select>
          <label class="label">
            <span class="label-text-alt italic">{{ modeText }}</span>
          </label>
        </div>
      </div>
    </div>

    <div class="divider"></div>

    <!-- BIP credentials row -->
    <div class="flex gap-10">
      <!-- left -->
      <div class="flex-none w-96 space-y-2">
        <div class="prose">
          <h3 class="text-sky-400 font-bold">BIP Credentials</h3>
        </div>

        <p class="text-sm">
          These are found in BIP depending on which entity you want to test.
        </p>
      </div>

      <div class="flex-1">
        <Input label="Access Token"
          helper-text="Access token can be taken from the backend UI under Administration > Account data > Merchant / Channel Info only if you have specific administration rights."
          type="password" v-model="accessToken" />

        <Input label="Entity ID"
          helper-text="The entity required to authorize the request. This should be the channel entity identifier. In case channel dispatching is activated then it should be the merchant entity identifier."
          type="text" v-model="entityId" />
      </div>
    </div>

    <div class="divider"></div>

    <!-- Merchant transction ID -->
    <div class="flex gap-10">
      <!-- left -->
      <div class="flex-none w-96 space-y-2">
        <div class="prose">
          <h3 class="text-sky-400 font-bold">Others</h3>
        </div>

        <p class="text-sm">
          Optional data.
        </p>
      </div>

      <div class="flex-1">
        <Input label="Merchant Transaction ID" helper-text="This changes for every submit." type="text" v-model="trxId" />
      </div>
    </div>


    <div class="divider"></div>


    <!-- brands row -->
    <div class="flex gap-10">
      <!-- left -->
      <div class="flex-none w-96 space-y-2">
        <div class="prose">
          <h3 class="text-sky-400 font-bold">Brands</h3>
        </div>

        <p class="text-sm">
          Select which brands on the right are associated with the MID that you
          set above, then click the button below to set the brands that will be
          used inside the widget form
          <kbd class="kbd kbd-sm text-sky-400">data-brands</kbd> attribute.
        </p>

        <button class="btn btn-accent w-full" @click="selectedBrands = combinedSelectedBrands">
          Set Active Brands
        </button>

        <div class="justify-start space-x-3 space-y-3">
          <!-- selected brands display via badges -->
          <TransitionGroup>
            <div class="badge badge-warning badge-lg" v-for="brand in selectedBrands" :key="brand">
              {{ brand }}
            </div>
          </TransitionGroup>
        </div>
      </div>

      <div class="flex-1 space-y-4">
        <!-- cards -->
        <div class="card bg-base-100">
          <div class="card-body">
            <h2 class="card-title text-sky-400">Cards</h2>
            <!-- select brands -->
            <select class="select select-bordered" size="10" v-model="selectedCardBrands" multiple>
              <option v-for="brand in cardBrandList">{{ brand }}</option>
            </select>

            <!-- display currently selected for this section -->
            <div class="card-actions justify-start mt-3">
              <TransitionGroup>
                <div class="badge badge-info badge-lg" v-for="brand in selectedCardBrands" :key="brand">
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
            <select class="select select-bordered" size="10" v-model="selectedVirtualBrands" multiple>
              <option v-for="brand in virtualBrandList">{{ brand }}</option>
            </select>

            <!-- display currently selected for this section -->
            <div class="card-actions justify-start mt-3">
              <TransitionGroup>
                <div class="badge badge-info badge-lg" v-for="brand in selectedVirtualBrands" :key="brand">
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
            <select class="select select-bordered" size="10" v-model="selectedBankBrands" multiple>
              <option v-for="brand in bankBrandList">{{ brand }}</option>
            </select>

            <!-- display currently selected for this section -->
            <div class="card-actions justify-start mt-3">
              <TransitionGroup>
                <div class="badge badge-info badge-lg" v-for="brand in selectedBankBrands" :key="brand">
                  {{ brand }}
                </div>
              </TransitionGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
