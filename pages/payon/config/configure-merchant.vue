<template>
  <div>
    <Alert title="Info" color-style="bg-base-300">
      Input your BIP credentials. Set up the widget behaviour.
    </Alert>

    <Input label="Access Token" type="password" v-model="accessToken" />
    <Input label="Entity ID" type="text" v-model="entityId" />
    <Input
      label="Shopper Result URL"
      type="text"
      v-model="shopperResultURLPayon" />

    <!-- select environment -->
    <div class="form-control mt-3">
      <label class="label mb-1">
        <span class="label-text text-sky-400 font-bold">Environment</span>
      </label>
      <select class="select max-w-sm" v-model="mode">
        <option v-for="option in modeOptions" :value="option.value">
          {{ option.text }}
        </option>
      </select>
      <label class="label">
        <span class="label-text-alt italic">{{ modeText }}</span>
      </label>
    </div>

    <!-- select brands -->
    <div>
      <label class="label mb-1">
        <span class="label-text text-sky-400 font-bold">Brands</span>
      </label>
      <!-- select brands -->
      <select class="select w-96" size="7" v-model="selectedBrands" multiple>
        <option v-for="brand in brandList">{{ brand }}</option>
      </select>

      <!-- selected brands display via badges -->
      <div class="card mt-3 bg-base-100">
        <div class="card-body">
          <h2 class="card-title text-sky-400">Selected Brands</h2>
          <div class="card-actions">
            <TransitionGroup>
              <div class="badge" v-for="brand in selectedBrands" :key="brand">
                {{ brand }}
              </div>
            </TransitionGroup>
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
  const shopperResultURLPayon = useState('shopperResultUrlPayon')
</script>
