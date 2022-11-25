<template>
  <div>
    <form
      :action="shopperResultUrl"
      class="paymentWidgets"
      data-brands="VISA MASTER"></form>
  </div>
</template>

<script setup>
  defineProps({
    shopperResultUrl: {
      type: String,
      required: true,
    },
  })
</script>
