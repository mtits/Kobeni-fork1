<script setup>
  /**
   * this component will on work with true/false as values, for custom values, refer here: https://vuejs.org/guide/essentials/forms.html#checkbox-1
   */
  defineProps({
    modelValue: {
      type: Boolean,
      required: true,
    },

    isExclusive: {
      type: Boolean,
      required: false,
      default: false
    },

    title: {
      type: String,
      required: false,
    },
  })

  defineEmits(['update:modelValue'])
</script>

<template>
  <div class="form-control transition hover:bg-slate-800 w-auto p-3 rounded-lg">
    <label class="label cursor-pointer">
      <span class="label-text">
        <span class="text-sky-400 font-bold" v-if="title">
          <kbd>{{ title }}</kbd> <span class="badge badge-warning badge-sm" v-if="isExclusive">Internal</span>
        </span>
        <br />
        <slot></slot>
      </span>
      <input type="checkbox" class="toggle" :checked="modelValue"
        @input="$emit('update:modelValue', $event.target.checked)" />
    </label>
  </div>
</template>
