<template>
  <div>
    <input type="checkbox" :id="modalId" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-sky-400 text-lg" v-if="title">{{ title }}</h3>
        <p class="py-3">
          <slot></slot>
        </p>

        <!-- button to close -->
        <div class="modal-action">
          <label :for="modalId" class="btn">Close</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    modalId: {
      type: String,
      required: true,
    },

    title: {
      type: String,
    },
  })
</script>
