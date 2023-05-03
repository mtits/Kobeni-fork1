<script setup lang="ts">
  useHead({
    title: 'Kobeni | Pull Yoself Togedah!'
  })

  const currentUser = useState('currentUser')
</script>

<template>
  <div v-if="currentUser">
    <div class="hero min-h-screen" style="background-image: url('/kobeni.png');">
      <div class="hero-overlay bg-opacity-60"></div>
      <div class="hero-content text-center text-neutral-content">
        <PageTitle title="Kobeni"> nothing to see here, go away </PageTitle>
      </div>
    </div>
    ur mom gay
  </div>

  <LoadingDisplay v-else />
</template>
