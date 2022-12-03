<template>
  <div>
    <PageTitle title="Transaction Request Results"> </PageTitle>

    <Transition>
      <InputReadOnly
        label="Entity ID"
        v-model="entityId"
        :display-character-count="false"
        @copy-content="copyString(entityId)"
        v-if="entityId" />
    </Transition>

    <Transition>
      <Textareadisplayonly
        label="Request Data Sent"
        :data="dataParameters"
        :is-json="false"
        v-if="dataParameters"></Textareadisplayonly>
    </Transition>
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
  const dataParameters = ref('')
  const entityId = ref('')
  const accessToken = useState('accessToken')

  /**
   * gets the session data before doing anything else
   */
  async function getSessionData() {
    const { session, refresh } = await useSession()

    await refresh()

    // console.log(session.value)
    entityId.value = session.value.entityId
    dataParameters.value = session.value.dataParameters
  }

  onMounted(async () => {
    // todo: check if id and resourcePath is in the query
    id.value = route.query.id
    resourcePath.value = route.query.resourcePath

    await getSessionData()
  })
</script>
