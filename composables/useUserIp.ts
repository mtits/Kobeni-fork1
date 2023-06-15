export const useUserIp = async (): Promise<string> => {
  interface seeipResult {
    ip: string
  }

  const style =
    'background-color: rgb(120 53 15); padding: 3px; border-radius: 0.5rem; color: white;'

  const errorMsg =
    'unable to fetch IP from service "api.seeip.org/jsonip"'.toUpperCase()

  try {
    console.log(
      "%cProceeding to invade the user's privacy by fetching their IP, this will be sent to the NSA",
      style
    )

    const { data } = await useFetch<seeipResult>('https://api.seeip.org/jsonip')

    if (data.value) {
      console.info(`${data.value.ip} - ( ͡° ᴥ ͡°) i c u`)
      return data.value.ip

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
