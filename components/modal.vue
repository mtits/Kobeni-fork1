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
          <label class="btn btn-block" @click="cnpModal = false">Close</label>
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
</script>
