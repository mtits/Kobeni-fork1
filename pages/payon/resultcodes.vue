<script setup>
  import csvDownload from 'json-to-csv-export'

  definePageMeta({
    pageTitle: 'Kobeni | Result Codes',
  })

  const currentUser = useState('currentUser')

  // the one variable to rule them all
  const result = reactive({
    url: 'https://eu-test.oppwa.com/v1/resultcodes',
    data: '',
  })

  // fetch from ACI docs
  const { data, pending, refresh } = await useFetch(result.url)
  result.data = data.value

  /**
   * parse JSON into CSV and download to client
   */
  const exportCSV = () => {
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

<template>
  <div v-if="currentUser">
    <PageTitle title="Result Codes">
      The result codes are part of the response body's JSON (field result)
      containing a code and a description explaining the code. This data is
      collected real-time on page load from ACI's API.
    </PageTitle>

    <Transition>
      <div>
        <div class="pb-3 space-x-2" v-if="result.data">
          <button class="btn btn-primary" @click="exportCSV">
            Export to CSV
          </button>

          <button class="btn" :class="{ loading: pending }" @click="refresh">
            Refresh
          </button>
        </div>

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
      </div>
    </Transition>
  </div>
</template>
