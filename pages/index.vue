<script setup>
  definePageMeta({
    pageTitle: 'Kobeni | Pull Yoself Togedah!',
  })

  const currentUser = useState('currentUser')
</script>

<template>
  <div v-if="currentUser">
    <div class="hero min-h-screen" id="index">
      <div class="hero-overlay bg-opacity-60"></div>
      <div class="hero-content text-center text-neutral-content">
        <PageTitle title="Kobeni"> nothing to see here, go away </PageTitle>
      </div>
    </div>
    ur mom gay
  </div>

  <div class="flex" v-else>
    <button class="btn btn-ghost btn-block loading"></button>
  </div>
</template>

<style>
  #index {
    background-image: url('/kobeni.png');
  }
</style>
