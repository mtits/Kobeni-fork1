<script setup lang="ts">
  usePageHead('Beshify')
  const currentUser = useState('currentUser')

  const emojis = ref(['🤸‍♂️', '🤸', '❤', '🛒', '👌', '😀', '⭐', '😍', '⚡', '👍', '🙌', '✌', '🤣'])
  const selectedEmoji = ref('🤸‍♂️')

  const sentence = ref('Bakit malungkot ang beshy ko?')
  const beshified = computed(() => {
    return sentence.value.replaceAll(' ', ` ${selectedEmoji.value} `)
  })
</script>

<template>
  <div class="flex flex-col" v-if="currentUser">
    <PageTitle title="Beshify">Dagdagan natin ng emoji yung post mo...</PageTitle>

    <div class="flex flex-col gap-3">

      <div class="flex gap-3">
        <div class="form-control w-full">
          <label class="label mb-1">
            <span class="label-text text-sky-400 font-bold">Text</span>
          </label>
          <input type="text" class="input input-bordered font-mono placeholder-slate-600" v-model="sentence">
        </div>

        <div class="form-control w-1/6">
          <label class="label mb-1">
            <span class="label-text text-sky-400 font-bold">Emoji</span>
          </label>
          <select class="select select-bordered" v-model="selectedEmoji">
            <option v-for="emoji in emojis" :value="emoji">
              {{ emoji }}
            </option>
          </select>
        </div>
      </div>


      <Textareadisplayonly label="Beshified" :data="beshified"></Textareadisplayonly>

      <button class="btn" @click="copyString(beshified)">Copy</button>
    </div>
  </div>

  <LoadingDisplay v-else />
</template>
