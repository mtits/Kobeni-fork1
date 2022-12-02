<template>
  <div class="form-control mt-3">
    <label class="label mb-1">
      <span class="label-text text-sky-400 font-bold">{{ label }}</span>
    </label>
    <textarea
      class="textarea font-mono h-80"
      :value="stringyfiedJSON"
      spellcheck="false"
      readonly></textarea>
  </div>
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    label: {
      type: String,
      default: 'Response Data',
    },

    data: [String, Object],

    isJson: {
      type: Boolean,
      default: true,
    },
  })

  const stringyfiedJSON = computed(() => {
    if (props.isJson) {
      return JSON.stringify(props.data, null, 1)
    } else {
      return props.data
    }
  })
</script>
