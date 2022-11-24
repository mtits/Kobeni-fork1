<template>
  <div class="form-control mt-3">
    <label class="label mb-1">
      <span class="label-text text-sky-400 font-bold">{{ label }}</span>
    </label>
    <textarea
      class="textarea font-mono textarea-bordered h-80"
      spellcheck="false"
      :value="JSON.stringify(data, null, 1)"
      readonly></textarea>
  </div>
</template>

<script setup>
  defineProps({
    label: {
      type: String,
      default: 'Response Data',
    },
    data: {
      type: Object,
    },
  })
</script>
