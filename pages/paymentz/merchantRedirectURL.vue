<script setup>
  definePageMeta({
    pageTitle: 'Kobeni | Merchant Redirect Page',
  })

  const currentUser = useState('currentUser')
  const route = useRoute()

  const queryParams = route.query

  // console.log(queryParams)
</script>

<template>
  <div v-if="currentUser">
    <PageTitle title="Transaction Results"></PageTitle>

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

  <div class="flex" v-else>
    <button class="btn btn-ghost btn-block loading"></button>
  </div>
</template>
