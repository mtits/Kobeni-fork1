<script setup>
  defineProps({
    label: {
      type: String,
      required: true,
    },

    placeHolder: {
      type: String,
      required: false,
      default: '',
    },

    helperText: {
      type: String,
      required: false,
      default: '',
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

<template>
  <div class="form-control w-full">
    <label class="label mb-1">
      <span class="label-text text-sky-400 font-bold">{{ label }}</span>
    </label>
    <input :type="type" class="input input-bordered font-mono w-full placeholder-slate-600" :placeholder="placeHolder"
      :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" spellcheck="false" />

    <label class="label" v-if="helperText">
      <span class="label-text-alt">{{ helperText }}</span>
    </label>
  </div>
</template>
