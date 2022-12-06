<template>
  <div>
    <div class="tabs">
      <NuxtLink
        class="tab tab-bordered tab-lg"
        to="/payon/config/configure-merchant"
        >Configure Merchant</NuxtLink
      >
      <NuxtLink
        class="tab tab-bordered tab-lg"
        to="/payon/config/widget-behaviour"
        >Widget Behaviour</NuxtLink
      >
    </div>
    <!-- displays the selected child page -->
    <div class="py-6">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
  definePageMeta({
    pageTitle: 'Kobeni | Config Page',
  })
</script>
