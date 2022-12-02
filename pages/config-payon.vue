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

    <!-- ALL TOGGLES HERE -->
    <PageTitle title="Widget Behaviour" class="mt-10"> </PageTitle>
    <Alert title="Disclaimer" color-style="bg-base-300">
      Some of the items here have been changed from the default setting to
      better suit the app's look and flow. Additionally, the items labeled as
      <span class="font-medium">Exclusive</span> are features custom-made only
      for this app.
    </Alert>
    <div class="flex w-full">
      <!-- left -->
      <div class="grid flex-grow p-5">
        <!-- auto-launch -->
        <Toggle v-model="autoLaunchWidget" title="Auto-launch (Exclusive)"
          >Launch the widget if a checkout ID is detected.</Toggle
        >

        <!-- plain vs card -->
        <div class="form-control w-96">
          <label class="label cursor-pointer">
            <span class="label-text">
              <span class="text-sky-400 font-bold"><kbd>Card Style</kbd></span
              ><br />
              Set Widget's style to <span class="text-sky-400">card</span> (May
              cause visibility issues because of this app's theme). Current
              default: <span class="text-sky-400">plain</span>.</span
            >
            <input
              type="checkbox"
              class="toggle"
              v-model="widgetStyle"
              true-value="card"
              false-value="plain" />
          </label>
        </div>

        <Toggle
          v-model="disableCardExpiryDateValidation"
          title="disableCardExpiryDateValidation"
          >Determines whether the card expiry date field should be validated. By
          default it is validated (false).</Toggle
        >
      </div>

      <!-- middle -->
      <div class="grid flex-grow p-5">
        <!-- of CVVs and others -->
        <Toggle v-model="maskCvv" title="maskCvv">Masks the CVV.</Toggle>

        <Toggle v-model="requireCvv" title="requireCvv"
          >Determines whether the CVV field is presented on the payment
          form.</Toggle
        >

        <Toggle v-model="showCVVHint" title="showCVVHint"
          >If set to true, then the credit card form will display a hint on
          where the CVV is located when the mouse is hovering over the CVV
          field.</Toggle
        >

        <Toggle v-model="allowEmptyCvv" title="allowEmptyCvv"
          >Determines whether the CVV field can be empty. By default it is
          false.</Toggle
        >
      </div>

      <!-- right -->
      <div class="grid flex-grow p-5">
        <Toggle v-model="validation" title="validation"
          >If false, disables validation and the functions
          <kbd class="font-semibold">validate</kbd> and
          <kbd class="font-semibold">onSubmit</kbd> will not be called.</Toggle
        >

        <Toggle v-model="showLabels" title="showLabels"
          >Shows or hides input labels. Default is true.</Toggle
        >

        <Toggle v-model="showPlaceholders" title="showPlaceholders"
          >Shows or hides input placeholders. Default is true.</Toggle
        >
      </div>
    </div>
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
  const allowEmptyCvv = useState('allowEmptyCvv')
  const validation = useState('validation')
  const showLabels = useState('showLabels')
  const showPlaceholders = useState('showPlaceholders')
  const disableCardExpiryDateValidation = useState(
    'disableCardExpiryDateValidation'
  )
</script>
