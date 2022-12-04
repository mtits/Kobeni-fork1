<template>
  <div>
    <form
      :action="shopperResultUrl"
      class="paymentWidgets"
      :data-brands="brands"></form>
  </div>
</template>

<script setup>
  defineProps({
    shopperResultUrl: {
      type: String,
      required: true,
    },

    brands: {
      type: String,
      required: true,
    },
  })
</script>
