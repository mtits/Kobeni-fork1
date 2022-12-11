<template>
  <div class="form-control w-full mt-3">
    <label class="label mb-1">
      <span class="label-text text-sky-400 font-bold">{{ label }}</span>
    </label>
    <div class="input-group">
      <input
        type="text"
        class="input font-mono w-full"
        :class="{
          'input-error': characterCount > characterCountMax,
          'input-warning': !isTestMode,
        }"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        spellcheck="false"
        readonly />

      <button class="btn" @click="$emit('copyContent')">Copy</button>
    </div>
    <label class="label mb-1" v-if="displayCharacterCount">
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
  const props = defineProps({
    label: {
      type: String,
      required: true,
    },

    characterCount: {
      type: Number,
      required: false,
    },

    characterCountMax: {
      type: Number,
      required: false,
    },

    displayCharacterCount: {
      type: Boolean,
      required: false,
      default: true,
    },

    mode: {
      type: String,
      required: false,
      default: 'Test',
    },

    modelValue: {
      type: String,
      default: '',
    },
  })

  defineEmits(['update:modelValue', 'copyContent'])

  const isTestMode = computed(() => {
    return props.mode == 'Test' ? true : false
  })
</script>
