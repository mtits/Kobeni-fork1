import axios from 'axios'

export const fetchUserIp = async (): Promise<string> => {
  try {
    const { data } = await axios({ url: 'https://freeipapi.com/api/json' })
    return data.ipAddress

    //
  } catch (error) {
    //
    console.error(error)
    return 'unable to fetch IP from service "freeipapi.com"'.toUpperCase()
  }
}
