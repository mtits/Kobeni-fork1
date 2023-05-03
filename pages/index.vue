<script setup lang="ts">
  useHead({
    title: 'Kobeni | Pull Yoself Togedah!'
  })

  const currentUser = useState('currentUser')
</script>

<template>
  <div v-if="currentUser">
    <div class="hero min-h-screen" style="background-image: url('/kobeni.png');">
      <div class="hero-overlay bg-opacity-90 backdrop-blur-lg"></div>

      <div class="hero-content text-center text-neutral-content">

        <div class="flex flex-col items-center gap-3">
          <div>
            <img src="/kobeni.png" class="w-36 h-36 rounded-full object-cover transition hover:scale-105" />
          </div>

          <PageTitle title="Kobeni">
            <span class="text-sm">
              Nothing to see here, go away...
            </span>
          </PageTitle>
        </div>

      </div>
    </div>

    <span class="text-xs">
      ur mom gay
    </span>
  </div>

  <LoadingDisplay v-else />
</template>
