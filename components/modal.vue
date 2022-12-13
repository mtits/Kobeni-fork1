<script setup>
  const cnpModal = useState('cnpModal')
  const checkoutId = useState('checkoutId')

  defineProps({
    title: {
      type: String,
    },
  })

  /**
   * todo: yeet the widget
   */
  const yeetTheWidget = () => {
    cnpModal.value = false

    // nuf said
    removeScriptFromHead()
    yeetTheWidgy()

    // clear checkout ID so that the form unrenders because of v-if
    console.info(
      'The "checkoutID" and his entire family has been terminated. There were no survivors.'
    )
    checkoutId.value = ''
  }
</script>

<template>
  <div>
    <input type="checkbox" class="modal-toggle" />
    <div class="modal" :class="{ 'modal-open': cnpModal }">
      <div class="modal-box">
        <h3 class="font-bold text-sky-400 text-lg mb-8" v-if="title">
          {{ title }}
        </h3>
        <p class="py-3">
          <slot></slot>
        </p>

        <!-- button to close -->
        <div class="modal-action">
          <label class="btn btn-block btn-warning" @click="yeetTheWidget"
            >Cancel</label
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .wpwl-label {
    color: rgb(56 189 248);
    font-weight: 500;
  }

  .wpwl-wrapper {
    color: black;
  }

  .wpwl-control {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
      'Liberation Mono', 'Courier New', monospace;
    font-size: 1rem;
    height: 3rem;
    padding-left: 1rem;
    padding-right: 1rem;
    border-color: hsl(220, 18%, 20%);
    border-radius: 0.5rem;

    background-color: rgb(229 231 235);
  }

  .wpwl-control::placeholder {
    color: rgb(107 114 128);
  }

  .wpwl-control-brand {
    width: fit-content;
  }

  .wpwl-brand-card {
    margin-left: 1px;
  }

  .wpwl-button-pay {
    background-color: hsl(262 80% 50%);
    font-family: inherit;
    border: inherit;
    border-radius: 0.5rem;
    font-weight: 600;

    height: 3rem;
    padding-left: 1rem;
    padding-right: 1rem;

    transition-property: all;
    transition-duration: 200ms;
  }

  .wpwl-button-pay:hover {
    background-color: hsl(262 80% 40%);
  }
</style>
