<template>
  <div class="form-control mt-3">
    <label class="label mb-1">
      <span class="label-text text-sky-400 font-bold">{{ label }}</span>
    </label>
    <textarea
      class="textarea textarea-bordered font-mono h-80"
      spellcheck="false"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"></textarea>
  </div>
</template>

<script setup>
  defineProps({
    label: {
      type: String,
      required: true,
    },

    modelValue: {
      type: String,
      default: '',
    },
  })

  defineEmits(['update:modelValue'])
</script>
