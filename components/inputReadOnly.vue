<template>
  <div class="form-control w-full mt-3">
    <label class="label mb-1">
      <span class="label-text text-sky-400 font-bold">{{ label }}</span>
    </label>
    <div class="input-group">
      <input
        :type="type"
        class="input font-mono input-bordered w-full"
        :class="{ 'input-error': characterCount > characterCountMax }"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        spellcheck="false"
        readonly />

      <button class="btn" @click="$emit('copyContent')">Copy</button>
    </div>
    <label class="label mb-1">
      <span class="label-text"
        >Character Count:
        <kbd
          class="text-sky-400 font-semibold"
          :class="{ 'text-red-500': characterCount > characterCountMax }"
          >{{ characterCount }}</kbd
        >
      </span>
    </label>
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

    characterCount: {
      type: Number,
      required: true,
    },

    characterCountMax: {
      type: Number,
      required: true,
    },

    modelValue: {
      type: String,
      default: '',
    },
  })

  defineEmits(['update:modelValue', 'copyContent'])
</script>
