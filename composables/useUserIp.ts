export const useUserIp = async (): Promise<string> => {
  interface ipifyResult {
    ip: string
  }

  const style =
    'background-color: rgb(120 53 15); padding: 3px; border-radius: 0.5rem; color: white;'

  const errorMsg = 'Unable to fetch IP from service "api.ipify.org"'

  try {
    console.log(
      "%cProceeding to invade the user's privacy by fetching their IP, this will be sent to the NSA",
      style
    )

    const { data } = await useFetch<ipifyResult>('https://api.ipify.org', {
      method: 'get',
      query: {
        format: 'json',
      },
    })

    if (data.value) {
      console.info(`${data.value.ip} - ( ͡° ᴥ ͡°) i c u`)
      return data.value!.ip

      //
    } else {
      console.error(errorMsg)
      return errorMsg
    }

    //
  } catch (error) {
    //
    console.error(error)
    return errorMsg
  }
}
