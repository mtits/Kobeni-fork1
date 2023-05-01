<script setup lang="ts">
  useHead({
    title: 'Kobeni | BIP URL Generator',
  })

  // vars
  const currentUser = useState('currentUser')
  const envOptions = ref([
    { text: 'Test', value: 'test' },
    { text: 'Live', value: '' }
  ])
  const selectedEnvOption = ref('test')

  const domain = ref('prtpe.com')

  const entityTypeOptions = ref([
    { text: 'Division', value: 'division_name' },
    { text: 'Merchant', value: 'merchant_name' },
    { text: 'Channel', value: 'channel_name' }
  ])
  const selectedType = ref('division_name')

  const entityName = ref('EntityName')

  const result = computed(() => {
    const subDomain = selectedEnvOption.value ? `${selectedEnvOption.value}.` : selectedEnvOption.value

    return `https://${subDomain}${domain.value}/bip/login?${selectedType.value}=${entityName.value}`
  })
</script>

<template>
  <div v-if="currentUser">
    <PageTitle title="BIP URL Generator">
      For when they have their own login page
    </PageTitle>

    <div class="flex flex-col gap-3">
      <!-- select for env -->
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text text-sky-400 font-bold">Select Environment</span>
        </label>
        <select class="select select-bordered" v-model="selectedEnvOption">
          <option v-for="option in envOptions" :value="option.value">{{ option.text }}</option>
        </select>
      </div>

      <!-- domain -->
      <Input label="Domain" place-holder="prtpe.com" v-model="domain" />

      <!-- select for entity type -->
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text text-sky-400 font-bold">Select Entity Type</span>
        </label>
        <select class="select select-bordered" v-model="selectedType">
          <option v-for="option in entityTypeOptions" :value="option.value">{{ option.text }}</option>
        </select>
      </div>

      <!-- name -->
      <Input label="Entity Name" place-holder="Merchant / Division / Channel name Inc. Ltd. Corp." v-model="entityName" />

      <!-- result -->
      <div>
        <label class="label">
          <span class="label-text text-sky-400 font-bold">Generated URL</span>
        </label>

        <div class="alert alert-info shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
              <path fill-rule="evenodd"
                d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
                clip-rule="evenodd" />
              <path fill-rule="evenodd"
                d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
                clip-rule="evenodd" />
            </svg>
            <a class="link" :href="result" target="_blank">{{ result }}</a>
          </div>
        </div>
      </div>
    </div>

  </div>

  <div class="flex" v-else>
    <button class="btn btn-ghost btn-block loading"></button>
  </div>
</template>