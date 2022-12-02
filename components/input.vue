<template>
  <div class="form-control w-full mt-3">
    <label class="label mb-1">
      <span class="label-text text-sky-400 font-bold">{{ label }}</span>
    </label>
    <input
      :type="type"
      class="input font-mono w-full"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      spellcheck="false" />
  </div>
</template>

<script setup>
  defineProps({
    label: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: false,
      default: 'text',
    },

    modelValue: {
      type: String,
      default: '',
    },
  })

  defineEmits(['update:modelValue'])
</script>
