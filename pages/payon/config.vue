<script setup>
  definePageMeta({
    pageTitle: 'Kobeni | Config Page',
  })

  const currentUser = useState('currentUser')
</script>

<template>
  <div v-if="currentUser">
    <PageTitle title="Setup"></PageTitle>

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
</template>
