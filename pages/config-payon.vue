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

    <Toggle v-model="autoLaunchWidget"
      >Automatically launch the widget if a checkout ID is detected.</Toggle
    >

    <!-- plain vs card -->
    <div class="form-control w-96">
      <label class="label cursor-pointer">
        <span class="label-text"
          >Set Widget's style to "card" (May cause visibility issues because of
          this app's theme). Current default: "plain".</span
        >
        <input
          type="checkbox"
          class="toggle"
          v-model="widgetStyle"
          true-value="card"
          false-value="plain" />
      </label>
    </div>

    <!-- of CVVs and others -->
    <Toggle v-model="maskCvv"
      ><span class="font-bold">maskCvv</span> - Masks the CVV (duh...).</Toggle
    >
    <Toggle v-model="requireCvv"
      ><span class="font-bold">requireCvv</span> - Determines whether the CVV
      field is presented on the payment form.</Toggle
    >
    <Toggle v-model="showCVVHint"
      ><span class="font-bold">showCVVHint</span> - If set to true then the
      credit card form will display a hint on where the CVV is located when the
      mouse is hovering over the CVV field.</Toggle
    >
  </div>
</template>

<script setup>
  useHead({
    title: 'Kobeni | Config for PAY.ON',
  })

  // get app states
  const accessToken = useState('accessToken')
  const entityId = useState('entityId')
  const shopperResultURLPayon = useState('shopperResultUrlPayon')
  const autoLaunchWidget = useState('autoLaunchWidget')
  const widgetStyle = useState('widgetStyle')
  const maskCvv = useState('maskCvv')
  const requireCvv = useState('requireCvv')
  const showCVVHint = useState('showCVVHint')
</script>
