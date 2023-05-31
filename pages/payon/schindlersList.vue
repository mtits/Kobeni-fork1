<script setup lang="ts">
  usePageHead("Schindler's list")

  const currentUser = useState('currentUser')
  const mode = useState('mode')
  const accessToken = useState('accessToken')
  const entityId = useState('entityId')

  const dateFrom = ref('')
  const dateTo = ref('')
  const today = new Date()

  dateFrom.value = `${today.getFullYear()}-${expectoPrefixTheZeroNum(today.getMonth() + 1)}-01`
  dateTo.value = `${today.getFullYear()}-${expectoPrefixTheZeroNum(today.getMonth() + 1)}-${expectoPrefixTheZeroNum(today.getDate())}`

  /**
   * 
   */
  const getDates = async () => {

    try {
      const { data } = await useFetch('/api/payon/schindlerslist', {
        method: 'post',
        body: {
          mode: mode.value,
          entityId: entityId.value,
          accessToken: accessToken.value,
          dateFrom: dateFrom.value,
          dateTo: dateTo.value
        },
      })

      console.info(data.value)

      //
    } catch (error) {
      console.error(error)
    }

  }
</script>

<template>
  <div v-if="currentUser">
    <PageTitle title="Burn 'em"></PageTitle>

    <div class="flex flex-col gap-2">

      <!-- row 1 -->
      <div class="flex gap-2">
        <!-- date from -->
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text">From (defaults to the 1st day of the month)</span>
          </label>
          <input type="date" placeholder="Type here" class="input input-bordered w-full max-w-xs" v-model="dateFrom" />
        </div>

        <!-- date to -->
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text">To (defaults to today)</span>
          </label>
          <input type="date" placeholder="Type here" class="input input-bordered w-full max-w-xs" v-model="dateTo" />
        </div>
      </div>

      <!-- row 2 -->
      <div class="flex gap-2">
        <!-- let em rip -->
        <button class="btn" @click="getDates">Fetch List</button>
      </div>
    </div>







  </div>

  <LoadingDisplay v-else />
</template>