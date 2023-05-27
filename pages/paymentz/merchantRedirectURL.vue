<script setup>
  usePageHead('Merchant Redirect Page')

  const currentUser = useState('currentUser')
  const route = useRoute()

  const queryParams = route.query
</script>

<template>
  <div v-if="currentUser">
    <PageTitle title="Transaction Results"> </PageTitle>

    <div class="flex flex-col gap-6">
      <!-- alert -->
      <div class="alert shadow-lg">
        <div>
          <IconInfo />
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
