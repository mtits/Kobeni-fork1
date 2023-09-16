<script setup lang="ts">
  import { Howl, Howler } from 'howler'

  usePageHead('Soundboard')

  const currentUser = useState('currentUser')

  const tomorrow = new Howl({
    src: ['/audio/tomorrow.mp3'],
  })

  const today = new Howl({
    src: ['/audio/today.mp3'],
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

  const wePanic = new Howl({
    src: ['/audio/we_panic.m4a']
  })

  const letThemCome = new Howl({
    src: ['/audio/let-them-come.mp3']
  })

  const optimumPride = new Howl({
    src: ['/audio/optimum-pride.mp3']
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
          <IconPlay />
          Tomorrow!
        </button>

        <button class="btn gap-2 w-72" @click="today.play()">
          <IconPlay />
          Today!
        </button>

        <button class="btn gap-2 w-72" @click="omae.play()">
          <IconPlay />
          Omae wa mou shindeiru
        </button>

        <button class="btn gap-2 w-72" @click="nani.play()">
          <IconPlay />
          Nani???
        </button>

        <button class="btn gap-2 w-72" @click="pekoLaugh.play()">
          <IconPlay />
          AH↗️HA↘️HA↗️HA↘️HA↗️
        </button>

        <button class="btn gap-2 w-72" @click="wow.play()">
          <IconPlay />
          &lt;:3) ~Wow
        </button>

        <button class="btn gap-2 w-72" @click="ehe.play()">
          <IconPlay />
          'Ehe' Te Nandayo!?!?!?!1
        </button>

        <button class="btn gap-2 w-72" @click="quaso.play()">
          <IconPlay />
          Elira's Quaso
        </button>

        <button class="btn gap-2 w-72" @click="wePanic.play()">
          <IconPlay />
          I chimed in with a...
        </button>

        <button class="btn gap-2 w-72" @click="letThemCome.play()">
          <IconPlay />
          Optimus Prime
        </button>

        <button class="btn gap-2 w-72" @click="optimumPride.play()">
          <IconPlay />
          Optimum Pride
        </button>
      </div>
    </div>

    <div>
      <PageTitle title="Ult Who? - Overwatch Edition">Guess which agent ult. based on the label</PageTitle>
      <div class="flex flex-wrap gap-3">
        <button class="btn gap-2 w-72" @click="bap.play()">
          <IconPlay />
          "Hinde baso yun!"
        </button>

        <button class="btn gap-2 w-72" @click="widow.play()">
          <IconPlay />
          "Penshoppe ni Shopee Lóreal"
        </button>
      </div>
    </div>

    <div>
      <PageTitle title="Ult Who? - Valorant Edition">Guess which agent ult. based on the label</PageTitle>
      <div class="flex flex-wrap gap-3">
        <button class="btn gap-2 w-72" @click="omen.play()">
          <IconPlay />
          "Squatter!"
        </button>
      </div>
    </div>
  </div>

  <LoadingDisplay v-else />
</template>
