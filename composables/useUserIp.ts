export const useUserIp = async (): Promise<string> => {
  const { data } = await useFetch('https://api.ipify.org', {
    method: 'get',
    query: {
      format: 'json',
    },
  })

  console.info(`Current user IP: ${(data as any).value.ip} - ( ͡° ᴥ ͡°) i c u...`)

  return (data as any).value.ip
}
