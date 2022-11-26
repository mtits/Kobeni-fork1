<template>
  <div>
    <PageTitle title="Tomorrow">
      Today I don't feel like doing anything. I just wanna lay in my bed. Don't
      feel like picking up my phone, so leave a message at the tone. 'Cause
      today I swear I'm not doing anything. Nothing at all.
    </PageTitle>

    <!-- hero -->
    <div class="hero min-h-screen" id="ina-hero">
      <div class="hero-overlay bg-opacity-60"></div>
      <div class="hero-content text-center">
        <div class="max-w-md">
          <button class="btn btn-primary" @click="sayTomorrow">
            Tomorrow!
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

  useHead({
    title: 'Kobeni | Tomorrow, Ina said calmly...',
  })

  const sound = new Howl({
    src: ['/tomorrow.mp3'],
  })

  function sayTomorrow() {
    sound.play()
  }
</script>
