<template>
  <div>
    <PageTitle title="Configure a Merchant">
      Input your BIP credentials. Set up the widget behaviour.
    </PageTitle>

    <Input label="Access Token" type="password" v-model="accessToken" />
    <Input label="Entiry ID" type="text" v-model="entityId" />
    <Input
      label="Shopper Result URL"
      type="text"
      v-model="shopperResultURLPayon" />

    <PageTitle title="Widget Behaviour" class="mt-10"></PageTitle>

    <!-- auto-launch -->
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

    <!-- plain vs card -->
    <div class="form-control w-96">
      <label class="label cursor-pointer">
        <span class="label-text"
          >Set Widget to "card" style (This might cause visibility issues due to
          this app's theme).</span
        >
        <input
          type="checkbox"
          class="toggle"
          v-model="widgetStyle"
          true-value="card"
          false-value="plain" />
      </label>
    </div>
  </div>
</template>

<script setup>
  useHead({
    title: 'Kobeni | Config for PAY.ON',
  })

  const widgetStyle = useState('widgetStyle')

  // the data below are all initialized @ app.vue
  const accessToken = useState('accessToken')
  const entityId = useState('entityId')
  const autoLaunchWidget = useState('autoLaunchWidget')

  const shopperResultURLPayon = useState('shopperResultUrlPayon')
</script>
