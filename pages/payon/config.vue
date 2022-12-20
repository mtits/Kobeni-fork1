<script setup>
  definePageMeta({
    pageTitle: 'Kobeni | Config Page',
  })

  const currentUser = useState('currentUser')
</script>

<template>
  <div v-if="currentUser">
    <div class="tabs">
      <NuxtLink
        class="tab tab-lg tab-bordered"
        to="/payon/config/configure-merchant">
        Configure Merchant
      </NuxtLink>

      <NuxtLink
        class="tab tab-lg tab-bordered"
        to="/payon/config/widget-behaviour">
        Widget Behaviour
      </NuxtLink>
    </div>
    <!-- displays the selected child page -->
    <div class="">
      <NuxtPage />
    </div>
  </div>

  <div class="flex" v-else>
    <button class="btn btn-ghost btn-block loading"></button>
  </div>
</template>
