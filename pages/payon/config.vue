<script setup>
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

<template>
  <div>
    <PageTitle title="Setup"></PageTitle>

    <div class="tabs">
      <NuxtLink
        class="tab tab-lifted tab-lg"
        to="/payon/config/widget-behaviour"
        >Widget Behaviour</NuxtLink
      >

      <NuxtLink
        class="tab tab-lifted tab-lg"
        to="/payon/config/configure-merchant"
        >Configure Merchant</NuxtLink
      >
    </div>
    <!-- displays the selected child page -->
    <div class="">
      <NuxtPage />
    </div>
  </div>
</template>
