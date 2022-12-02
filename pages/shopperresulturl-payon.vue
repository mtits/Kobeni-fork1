<template>
  <div>
    <PageTitle title="Transaction Request Results"> </PageTitle>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'

  definePageMeta({
    pageTitle: 'Kobeni | Result Page',
    middleware: 'update-title',
  })

  const route = useRoute()
  const id = ref('')
  const resourcePath = ref('')
  const entityId = useState('entityId')
  const accessToken = useState('accessToken')

  onMounted(() => {
    // todo: check if id and resourcePath is in the query
    id.value = route.query.id
    resourcePath.value = route.query.resourcePath
  })
</script>
