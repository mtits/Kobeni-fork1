<template>
  <div class="p-7 content-center" id="progress" v-if="showLoading">
    <div>
      <p>Loading...</p>
    </div>
    <div>
      <progress class="progress"></progress>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    showLoading: {
      type: Boolean,
      required: true,
    },
  })
</script>
