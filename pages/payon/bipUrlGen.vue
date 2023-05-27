<script setup lang="ts">
  usePageHead('BIP URL Generator')

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
            <IconExternalLink />
            <a class="link" :href="result" target="_blank">{{ result }}</a>
          </div>
        </div>
      </div>
    </div>

  </div>

  <LoadingDisplay v-else />
</template>