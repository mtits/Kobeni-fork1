<template>
  <div>
    <div class="tabs">
      <NuxtLink
        class="tab tab-bordered tab-lg"
        to="/payon/config/widget-behaviour"
        >Widget Behaviour</NuxtLink
      >

      <NuxtLink
        class="tab tab-bordered tab-lg"
        to="/payon/config/configure-merchant"
        >Configure Merchant</NuxtLink
      >
    </div>
    <!-- displays the selected child page -->
    <div class="py-6">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'

  definePageMeta({
    pageTitle: 'Kobeni | Config Page',
  })

  /**
   *
   */
  onMounted(() => {
    useGetCurrentUser()
  })
</script>
