<script setup>
  useHead({
    title: 'Kobeni | Merchant Redirect Page',
  })

  const currentUser = useState('currentUser')
  const route = useRoute()

  const queryParams = route.query

      // console.log(queryParams)
</script>

<template>
  <div v-if="currentUser">
    <PageTitle title="Transaction Results"> </PageTitle>

    <div class="flex flex-col gap-6">
      <!-- alert -->
      <div class="alert shadow-lg">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            class="stroke-info flex-shrink-0 w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>
            You can close this tab and go back to the initial page and resubmit
            a transaction from there.
          </span>
        </div>
      </div>

      <!-- table -->
      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <!-- head -->
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr class="hover" v-for="(value, key) in queryParams">
              <td>{{ key }}</td>
              <td class="font-mono">{{ value }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <LoadingDisplay v-else />
</template>
