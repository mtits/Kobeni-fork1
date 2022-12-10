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
    <label class="label mt-3">
      <span class="label-text text-sky-400 font-bold">Brands</span>
    </label>
    <div class="flex w-full space-x-6">
      <!-- left side -->
      <div class="grid flex-grow w-1/2">
        <div class="card bg-base-100">
          <div class="card-body">
            <!-- select brands -->
            <select class="select" size="15" v-model="selectedBrands" multiple>
              <option v-for="brand in brandList">{{ brand }}</option>
            </select>
          </div>
        </div>
      </div>

      <!-- right side -->
      <div class="grid flex-grow w-1/2">
        <div class="card bg-base-100">
          <div class="card-body">
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

  const selectedBrands = useState('selectedBrands')
  const brandList = getBrandsList()

  // get app states
  const accessToken = useState('accessToken')
  const entityId = useState('entityId')
</script>
