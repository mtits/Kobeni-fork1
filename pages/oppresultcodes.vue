<template>
  <div>
    <PageTitle title="OPP Result Codes">
      The result codes are part of the response body's JSON (field result)
      containing a code and a description explaining the code.
    </PageTitle>

    <Transition>
      <div class="pb-8" v-if="result.data">
        <button class="btn btn-primary" @click="exportCSV">
          Export to CSV
        </button>
      </div>
    </Transition>

    <Transition>
      <div class="overflow-x-auto" v-if="result.data">
        <table class="table table-zebra w-full">
          <!-- head -->
          <thead>
            <tr>
              <th class="text-sky-400 text-lg">Code</th>
              <th class="text-sky-400 text-lg">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="result in result.data.resultCodes" class="hover">
              <td class="font-mono">{{ result.code }}</td>
              <td>{{ result.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Transition>

    <Loading :showLoading="showLoading" />
  </div>
</template>

<script setup>
  import { reactive, onMounted } from 'vue'
  import csvDownload from 'json-to-csv-export'
  import axios from 'axios'

  useHead({
    title: 'Kobeni | Result Codes',
  })

  // the one variable to rule them all
  const result = reactive({
    url: 'https://eu-test.oppwa.com/v1/resultcodes',
    data: '',
    error: false,
  })

  let showLoading = ref(false)
  // fetch the list from oppwa's API
  async function fetchList() {
    // reset state
    result.error = false
    try {
      showLoading.value = true
      const response = await axios.get(result.url)
      result.data = response.data
    } catch (error) {
      // update state to display error notif, also display to console
      result.error = true
      console.error('Uh oh, stinky...', error)
    } finally {
      showLoading.value = false
    }
  }
  // on app component mounted, run the function
  onMounted(() => {
    fetchList()
  })
  /**
   * parse JSON into CSV and download to client
   */
  function exportCSV() {
    try {
      const dataToConvert = {
        data: result.data.resultCodes,
        filename: 'result_codes',
        delimiter: ',',
        headers: ['Code', 'Description'],
      }
      // dl!
      csvDownload(dataToConvert)
    } catch (error) {
      console.error(error)
    }
  }
</script>
