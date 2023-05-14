<script setup lang="ts">
  defineProps({
    title: {
      type: String,
      required: true
    },

    navTo: {
      type: String,
      required: true
    }
  })
</script>

<template>
  <div class="bg-base-200 p-5 rounded-lg w-56 h-40 shadow transition hover:scale-105">
    <NuxtLink :to="navTo">
      <h1 class="text-xl font-bold text-sky-400 mb-1">{{ title }}</h1>
      <p class="text-xs">
        <slot></slot>
      </p>
    </NuxtLink>
  </div>
</template>