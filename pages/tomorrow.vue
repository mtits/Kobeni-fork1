<script setup lang="ts">
  import { Howl, Howler } from 'howler'

  usePageHead('Soundboard')

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

  const bap = new Howl({
    src: ['/audio/bap-ult.ogg']
  })

  const widow = new Howl({
    src: ['/audio/widow-ult.oga']
  })

  const omen = new Howl({
    src: ['/audio/omen-ult.mp3']
  })

  const quaso = new Howl({
    src: ['/audio/quaso.mp3']
  })


  // global object
  Howler.volume(0.5)
</script>

<template>
  <div class="flex flex-col gap-10" v-if="currentUser">
    <div>
      <PageTitle title="Soundboard">Things to fill your ears. </PageTitle>
      <div class="flex flex-wrap gap-3">
        <button class="btn gap-2 w-72" @click="tomorrow.play()">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
          </svg>
          Tomorrow!
        </button>

        <button class="btn gap-2 w-72" @click="omae.play()">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
          </svg>
          Omae wa mou shindeiru
        </button>

        <button class="btn gap-2 w-72" @click="nani.play()">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
          </svg>
          Nani???
        </button>

        <button class="btn gap-2 w-72" @click="pekoLaugh.play()">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
          </svg>
          AH↗️HA↘️HA↗️HA↘️HA↗️
        </button>

        <button class="btn gap-2 w-72" @click="wow.play()">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
          </svg>
          &lt;:3) ~Wow
        </button>

        <button class="btn gap-2 w-72" @click="ehe.play()">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
          </svg>
          'Ehe' Te Nandayo!?!?!?!1
        </button>

        <button class="btn gap-2 w-72" @click="quaso.play()">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
          </svg>
          Elira's Quaso
        </button>
      </div>
    </div>

    <div>
      <PageTitle title="Ult Who? - Overwatch Edition">Guess which agent ult. based on the label</PageTitle>
      <div class="flex flex-wrap gap-3">
        <button class="btn gap-2 w-72" @click="bap.play()">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
          </svg>
          "Hinde baso yun!"
        </button>

        <button class="btn gap-2 w-72" @click="widow.play()">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
          </svg>
          "Penshoppe ni Shopee Lóreal"
        </button>
      </div>
    </div>

    <div>
      <PageTitle title="Ult Who? - Valorant Edition">Guess which agent ult. based on the label</PageTitle>
      <div class="flex flex-wrap gap-3">
        <button class="btn gap-2 w-72" @click="omen.play()">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
          </svg>
          "Squatter!"
        </button>
      </div>
    </div>
  </div>

  <LoadingDisplay v-else />
</template>
