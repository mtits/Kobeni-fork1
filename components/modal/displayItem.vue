<script setup lang="ts">
  defineProps({
    fieldTitle: {
      type: String,
      required: true
    }
  })
</script>

<template>
  <div>
    <span class="block uppercase font-mono text-xs opacity-50">{{ fieldTitle }}</span>
    <p class="block font-mono text-sm w-72 truncate">
      <slot></slot>
    </p>
  </div>
</template>