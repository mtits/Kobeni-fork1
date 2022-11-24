export default defineEventHandler(async (event) => {
  // const body = await readBody(event)

  const dummyResponse = {
    result: {
      code: '000.200.100',
      description: 'successfully created checkout',
    },
    buildNumber:
      '524cb3560caf98363fcaf22e7838ab03ec69c746@2022-11-24 00:42:39 +0000',
    timestamp: '2022-11-24 16:00:50+0000',
    ndc: '091F7AFCE474C7941EC56160BAC1D913.uat01-vm-tx03',
    id: '091F7AFCE474C7941EC56160BAC1D913.uat01-vm-tx03',
  }

  return dummyResponse
})
