<script setup lang="ts">
  import { Howl, Howler } from 'howler'

  definePageMeta({
    pageTitle: 'Kobeni | Tomorrow, Ina said calmly...',
  })

  const currentUser = useState('currentUser')

  const tomorrow = new Howl({
    src: ['/audio/tomorrow.mp3'],
  })

  const wow = new Howl({
    src: ['/audio/wow.mp3'],
  })

  const omae = new Howl({
    src: ['/audio/omae wa.mp3'],
  })

  const nani = new Howl({
    src: ['/audio/nani.mp3'],
  })

  const pekoLaugh = new Howl({
    src: ['/audio/peko_laugh.mp3'],
  })

  const ehe = new Howl({
    src: ['/audio/ehe.mp3'],
  })

  // global object
  Howler.volume(0.5)
</script>

<template>
  <div v-if="currentUser">
    <PageTitle title="Tomorrow">
      Today I don't feel like doing anything. I just wanna lay in my bed. Don't
      feel like picking up my phone, so leave a message at the tone. 'Cause
      today I swear I'm not doing anything. Nothing at all.
    </PageTitle>

    <!-- hero -->
    <div class="hero min-h-screen mb-4" id="ina-hero">
      <div class="hero-overlay bg-opacity-60"></div>
      <div class="hero-content text-center">
        <div class="max-w-md">
          <button class="btn btn-primary gap-2" @click="tomorrow.play()">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
            </svg>
            Tomorrow!
          </button>
        </div>
      </div>
    </div>

    <PageTitle title="Soundboard"> Other things to fill your ears. </PageTitle>

    <div class="space-y-3">
      <!-- row 1 -->
      <div class="flex space-x-3 place-items-center justify-center">
        <!-- col 1 -->
        <div class="grid flex-grow w-1/3">
          <button class="btn gap-2" @click="tomorrow.play()">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
            </svg>
            Tomorrow!
          </button>
        </div>

        <!-- col 2 -->
        <div class="grid flex-grow w-1/3">
          <button class="btn gap-2" @click="omae.play()">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
            </svg>
            Omae wa mou shindeiru
          </button>
        </div>

        <!-- col 3 -->
        <div class="grid flex-grow w-1/3">
          <button class="btn gap-2" @click="pekoLaugh.play()">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
            </svg>
            AH↗️HA↘️HA↗️HA↘️HA↗️
          </button>
        </div>
      </div>

      <!-- row 2 -->
      <div class="flex space-x-3 place-items-center justify-center">
        <!-- col 1 -->
        <div class="grid flex-grow w-1/3">
          <button class="btn gap-2" @click="wow.play()">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
            </svg>
            &lt;:3) ~Wow
          </button>
        </div>

        <!-- col 2 -->
        <div class="grid flex-grow w-1/3">
          <button class="btn gap-2" @click="nani.play()">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
            </svg>
            Nani???
          </button>
        </div>

        <!-- col 3 -->
        <div class="grid flex-grow w-1/3">
          <button class="btn gap-2" @click="ehe.play()">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
            </svg>
            "'Ehe' Te Nandayo!?!?!?!1"
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="flex" v-else>
    <button class="btn btn-ghost btn-block loading"></button>
  </div>
</template>

<style>
#ina-hero {
  background-image: url('/tomorrow-compressed.gif');
}
</style>
