<script setup>
  defineProps({
    title: {
      type: String,
      required: true,
    },
  })
</script>

<template>
  <div class="prose mb-6 mt-4">
    <h1 class="text-sky-400">{{ title }}</h1>
    <p>
      <slot></slot>
    </p>
  </div>
</template>
