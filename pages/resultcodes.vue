<template>
  <div>
    <PageTitle title="Result Codes">
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
  </div>
</template>

<script setup>
  import { reactive } from 'vue'
  import csvDownload from 'json-to-csv-export'

  useHead({
    title: 'Kobeni | Result Codes',
  })

  // the one variable to rule them all
  const result = reactive({
    url: 'https://eu-test.oppwa.com/v1/resultcodes',
    data: '',
  })

  // fetch from ACI docs
  const { data } = await useFetch(result.url)
  result.data = data.value
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
