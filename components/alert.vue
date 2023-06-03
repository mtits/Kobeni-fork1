<script setup>
  defineProps({
    title: {
      type: String,
      required: false,
    },
    colorStyle: {
      type: String,
      required: false,
      default: '',
    },
  })
</script>

<template>
  <div class="alert shadow" :class="colorStyle">
    <div>
      <IconAlert />
      <div>
        <h3 class="font-bold" v-if="title">{{ title }}</h3>
        <div class="text-sm">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
