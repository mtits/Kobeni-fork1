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
          <label class="btn btn-block" @click="yeetTheWidget">Close</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const cnpModal = useState('cnpModal')

  defineProps({
    title: {
      type: String,
    },
  })

  /**
   * todo: yeet the widget
   */
  function yeetTheWidget() {
    cnpModal.value = false

    // nuf said
    removeScriptFromHead()

    // i can't believe you've done this
    if (window.wpwl !== undefined && window.wpwl.unload !== undefined) {
      window.wpwl.unload()
      $('script').each(function () {
        if (this.src.indexOf('static.min.js') !== -1) {
          $(this).remove()
        }
      })
    }
  }
</script>
