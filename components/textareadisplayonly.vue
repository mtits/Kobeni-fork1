<script setup>
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

  /**
   *
   */
  const stringyfiedJSON = computed(() => {
    if (props.isJson) {
      return JSON.stringify(props.data, null, 2)
    } else {
      return props.data
    }
  })
</script>

<template>
  <div class="form-control">
    <label class="label mb-1">
      <span class="label-text text-sky-400 font-bold">{{ label }}</span>
    </label>
    <textarea class="textarea font-mono h-96" :value="stringyfiedJSON" spellcheck="false" readonly></textarea>
  </div>
</template>
