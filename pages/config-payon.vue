<template>
  <div>
    <PageTitle title="Configure a Merchant"></PageTitle>
    <p>Input your BIP credentials here.</p>
    <div class="divider"></div>

    <Input label="Access Token" type="password" v-model="accessToken" />
    <Input label="Entiry ID" type="text" v-model="entityId" />

    <PageTitle title="Widget Behaviour"></PageTitle>
    <div class="divider"></div>

    <div class="form-control w-96">
      <label class="label cursor-pointer">
        <span class="label-text"
          >Automatically launch the widget if a checkout ID is detected.</span
        >
        <input
          type="checkbox"
          class="toggle"
          v-model="autoLaunchWidget"
          :true-value="true"
          :false-value="false" />
      </label>
    </div>
  </div>
</template>

<script setup>
  // the data below are all initialized @ app.vue
  const accessToken = useState('accessToken')
  const entityId = useState('entityId')
  const autoLaunchWidget = useState('autoLaunchWidget')
</script>
