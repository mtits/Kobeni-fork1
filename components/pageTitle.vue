<script setup>
  defineProps({
    title: {
      type: String,
      required: true,
    },
  })
</script>

<template>
  <div class="mb-6">
    <span class="text-4xl font-bold text-sky-400">{{ title }}</span>
    <p class="mt-2 text-sm">
      <slot></slot>
    </p>
  </div>
</template>
