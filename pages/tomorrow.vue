<template>
  <div>
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
          <button class="btn btn-primary" @click="tomorrow.play()">
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
          <button class="btn" @click="tomorrow.play()">Tomorrow!</button>
        </div>

        <!-- col 2 -->
        <div class="grid flex-grow w-1/3">
          <button class="btn" @click="omae.play()">
            Omae wa mou shindeiru
          </button>
        </div>

        <!-- col 3 -->
        <div class="grid flex-grow w-1/3">
          <button class="btn" @click="pekoLaugh.play()">
            AH↗️HA↘️HA↗️HA↘️HA↗️
          </button>
        </div>
      </div>

      <!-- row 2 -->
      <div class="flex space-x-3 place-items-center justify-center">
        <!-- col 1 -->
        <div class="grid flex-grow w-1/3">
          <button class="btn" @click="wow.play()">&lt;:3) ~Wow</button>
        </div>

        <!-- col 2 -->
        <div class="grid flex-grow w-1/3">
          <button class="btn" @click="nani.play()">Nani???</button>
        </div>

        <!-- col 3 -->
        <div class="grid flex-grow w-1/3">
          <button class="btn" @click="ehe.play()">
            "'Ehe' Te Nandayo!?!?!?!1"
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  #ina-hero {
    background-image: url('/tomorrow-compressed.gif');
  }
</style>

<script setup>
  import { Howl } from 'howler'

  definePageMeta({
    pageTitle: 'Kobeni | Tomorrow, Ina said calmly...',
  })

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
</script>
