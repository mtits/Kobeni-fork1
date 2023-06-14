export const useUserIp = async (): Promise<string> => {
  interface ipifyResult {
    ip: string
  }

  try {
    const { data } = await useFetch<ipifyResult>('https://api.ipify.org', {
      method: 'get',
      query: {
        format: 'json',
      },
    })

    console.info(`Current user IP: ${data.value!.ip} - ( ͡° ᴥ ͡°) i c u...`)
    return data.value!.ip

    //
  } catch (error) {
    //
    console.error(error)
    return 'Unable to fetch IP from service "api.ipify.org"'
  }
}
