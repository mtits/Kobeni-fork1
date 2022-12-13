<template>
  <div>
    <Alert title="Disclaimer" color-style="bg-base-300">
      Some of the items here have been changed from the default setting to
      better suit the app's look and flow. Additionally, the items labeled as
      <span class="font-medium">Exclusive</span> are features custom-made only
      for this app.
    </Alert>

    <!-- display toggles as columns -->
    <div class="grid grid-cols-2 gap-4 mt-3 px-14">
      <!-- left -->
      <div>
        <!-- auto-launch -->
        <Toggle v-model="autoLaunchWidget" title="Auto-launch (Exclusive)"
          >Launch the widget if a checkout ID is detected.</Toggle
        >

        <!-- plain vs card -->
        <div class="form-control w-auto">
          <label class="label cursor-pointer">
            <span class="label-text">
              <span class="text-sky-400 font-bold"><kbd>Card Style</kbd></span
              ><br />
              Set the widget's style to
              <span class="text-sky-400">card</span> (This will some cause
              visibility issues because of this app's theme). Current default:
              <span class="text-sky-400">'plain'</span>.</span
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
        <Toggle v-model="requireCvv" title="requireCvv"
          >Determines whether the CVV field is presented on the payment
          form.</Toggle
        >

        <Toggle v-model="maskCvv" title="maskCvv">Masks the CVV.</Toggle>
      </div>

      <!-- right -->
      <div>
        <Toggle v-model="showCVVHint" title="showCVVHint"
          >If set to true, then the credit card form will display a hint on
          where the CVV is located when the mouse is hovering over the CVV
          field.</Toggle
        >

        <Toggle v-model="allowEmptyCvv" title="allowEmptyCvv"
          >Determines whether the CVV field can be empty. By default it is
          false.</Toggle
        >

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

    <Input
      label="Shopper Result URL"
      type="text"
      helper-text="The customer/user is redirected here after the transaction."
      v-model="shopperResultURLPayon" />

    <Input
      label="Card Submit Label (The 'PAY NOW' button)"
      helper-text="This permanently overrides 'Locale' regardless of language."
      v-model="payNowLabel" />

    <!-- select locale -->
    <div class="mt-3">
      <label class="label">
        <span class="label-text text-sky-400 font-bold"
          >Locale (Widget Language)</span
        >
      </label>
      <select class="select select-bordered w-full" v-model="locale">
        <option v-for="local in localeList" :value="local.value">
          {{ local.text }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
  definePageMeta({
    pageTitle: 'Kobeni | Widget Behaviour',
  })

  // all widget states
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

  const payNowLabel = useState('payNowLabel')
  const locale = useState('locale')
  const localeList = getLocaleList()
  const shopperResultURLPayon = useState('shopperResultUrlPayon')
</script>
