<template>
  <div class="form-control w-96">
    <label class="label cursor-pointer">
      <span class="label-text">
        <slot></slot>
      </span>
      <input
        type="checkbox"
        class="toggle"
        :checked="modelValue"
        @input="$emit('update:modelValue', $event.target.checked)" />
    </label>
  </div>
</template>

<script setup>
  /**
   * this component will on work with true/false as values, for custom values, refer here: https://vuejs.org/guide/essentials/forms.html#checkbox-1
   */
  defineProps({
    modelValue: {
      type: Boolean,
      required: true,
    },
  })

  defineEmits(['update:modelValue'])
</script>
