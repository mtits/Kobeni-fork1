<template>
  <div>
    <PageTitle title="Transaction Results"> </PageTitle>

    <Alert class="my-6" title="Info" color-style=" alert-info">
      The checkout ID used for getting this transaction's result is one-time
      only. If you refresh this page, you will not be able to get the results
      anymore.
    </Alert>

    <Transition>
      <div>
        <Textareadisplayonly
          label="Response Data"
          :data="responseData"
          :is-json="true"
          v-if="responseData"></Textareadisplayonly>

        <button class="btn btn-ghost loading" v-else>Am Loading...</button>

        <div class="btn-group mt-3 place-items-center">
          <button
            class="btn"
            @click="copyEntireResponse(responseData)"
            v-if="responseData">
            Copy Response
          </button>

          <button
            class="btn"
            @click="copyString(responseData.id)"
            v-if="responseData.id">
            Copy Transaction ID
          </button>

          <button
            class="btn"
            @click="copyString(responseData.registrationId)"
            v-if="responseData.registrationId">
            Copy Registration ID
          </button>
        </div>
      </div>
    </Transition>

    <div class="card mt-6 bg-base-300 text-neutral-content shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Misc. Data</h2>

        <Transition>
          <InputReadOnly
            label="Entity ID"
            v-model="entityId"
            :display-character-count="false"
            @copy-content="copyString(entityId)"
            v-if="entityId" />
        </Transition>

        <Transition>
          <InputReadOnly
            label="Checkout ID"
            v-model="id"
            :display-character-count="false"
            @copy-content="copyString(id)"
            v-if="id" />
        </Transition>

        <Transition>
          <InputReadOnly
            label="Resource Path"
            v-model="resourcePath"
            :display-character-count="false"
            @copy-content="copyString(resourcePath)"
            v-if="resourcePath" />
        </Transition>

        <Transition>
          <div>
            <Textareadisplayonly
              label="Request Data Sent"
              :data="dataParameters"
              :is-json="false"
              v-if="dataParameters"></Textareadisplayonly>

            <button
              class="btn mt-3"
              @click="copyString(dataParameters)"
              v-if="dataParameters">
              Copy Previous Data
            </button>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'

  definePageMeta({
    pageTitle: 'Kobeni | Result Page',
    middleware: 'update-title',
  })

  //
  const route = useRoute()
  const id = ref('')
  const resourcePath = ref('')

  //
  const mode = ref('')
  const dataParameters = ref('')
  const entityId = ref('')
  const accessToken = ref('')
  const referenceTransaction = useState('referenceTransaction')

  //
  const responseData = ref('')

  /**
   * gets the session data before doing anything else
   */
  async function getSessionData() {
    const { session, refresh } = await useSession()

    await refresh()

    // console.log(session.value)
    mode.value = session.value.mode
    entityId.value = session.value.entityId
    accessToken.value = session.value.accessToken
    dataParameters.value = session.value.dataParameters
  }

  /**
   * fetches the transaction results
   */
  async function fetchTransactionResults() {
    try {
      const { data } = await useFetch('/api/getTransactionResults', {
        method: 'post',
        body: {
          mode: mode.value,
          accessToken: accessToken.value,
          entityId: entityId.value,
          checkoutID: id.value,
        },
      })

      responseData.value = data.value
      referenceTransaction.value = responseData.value.id
    } catch (error) {
      console.error(error)
    }
  }

  /**
   *
   */
  onMounted(async () => {
    id.value = route.query.id
    resourcePath.value = route.query.resourcePath

    await getSessionData()
    await fetchTransactionResults()
  })
</script>
